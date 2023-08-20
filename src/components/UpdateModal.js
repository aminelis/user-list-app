
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function UpdateModal({ nReunion, filteredReunions, OnUpdateDataReunion, OnReunionUpdated }) {

    console.log('okkkk',nReunion);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
      };
    

    const Reun = filteredReunions.find(reunion => reunion.nReunion === parseInt(nReunion));
    console.log("Reun:", Reun);


    
    const [editedReun, setEditedReun] = useState({
        nReunion: Reun.nReunion || '', 
        typeReunion: Reun.typeReunion || '',
        datePrev: Reun.datePrev,
        dateReal: Reun.dateReal,
        lieu: Reun.lieu || '',
        site: Reun.site || '',
      });

      const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  const handleDate1Change = (selectedDate) => {
    setDate1(selectedDate);
    handleInputChange('datePrev', selectedDate); // Update the editedReun state
  };

  const handleDate2Change = (selectedDate) => {
    setDate2(selectedDate);
    handleInputChange('dateReal', selectedDate); // Update the editedReun state
  };

    
      const handleInputChange = (field, value) => {
        setEditedReun(prevState => ({
          ...prevState,
          [field]: value
        }));
      };
      
      
    
      const handleSave = async (editedReun) => {
        //const formattedDatePrev = editedReun.datePrev.split('T')[0]; // Extract just the date
    //const formattedDateReal = editedReun.dateReal.split('T')[0]; // Extract just the date
    if (!Reun) {
      return <div className="div">Reunion not found</div>;
    }
    
     
        const requestData = {
      nReunion: parseInt(editedReun.nReunion),
      typeReunion: editedReun.typeReunion,
      datePrev: editedReun.datePrev, // Make sure it's in the expected date format
      dateReal: editedReun.dateReal, // Make sure it's in the expected date format
      lieu: editedReun.lieu,
      site: editedReun.site,
    };
    console.log('aammm',requestData)
        try {
          // Utilisez la décomposition pour créer une copie sans références cycliques
      
          const response = await axios.put('https://localhost:5001/api/Reunion/updateReunion', requestData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            toast.success('Mise à jour effectuée avec succès');
            OnUpdateDataReunion(requestData)
            OnReunionUpdated();
            handleClose();
            
          } else {
            toast.error('Error while updating reunion.');
          }
        } catch (error) {
          toast.error('Error while updating reunion:', error);
        }
      };
    
      if (!Reun) {
        return <div className="div">Reunion not found</div>;
      }
    


  return (
    <>
    <a
href={"#"}
style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
onClick={handleShow}
> {Reun.nReunion}

</a>

      <Modal show={show} onHide={handleClose} backdrop="static">
<Modal.Header closeButton>
<Modal.Title>Modifier un réunion</Modal.Title>
</Modal.Header>
<Modal.Body>
<Form.Group controlId="formItem">
<div className="row mt-3">
<div className="col-md-4">
<Form.Label>N° Reunion:</Form.Label>
</div>
<div className="col-md-8">
<Form.Control
type="text"
defaultValue={editedReun.nReunion.toString()}
  readOnly={true}
/>
</div>
</div>
</Form.Group>
<Form.Group controlId="formItem">
<div className="row mt-3">
<div className="col-md-4">
<Form.Label>Type Reunion:</Form.Label>
</div>
<div className="col-md-8">
<Form.Control
type="text"
value={editedReun.typeReunion}
onChange={e => handleInputChange('typeReunion', e.target.value)}
/>
</div>
</div>
</Form.Group>
<Form.Group controlId="formItem">
<div className="row mt-3">
<div className="col-md-4">
<Form.Label>Date Prévue:</Form.Label>
</div>
<div className="col-md-8">
<DatePicker
              selected={new Date(editedReun.datePrev)} // Convert the ISO string back to Date object
              onChange={handleDate1Change}
              dateFormat="dd/MM/yyyy"
            />
</div>
</div>
</Form.Group>
<Form.Group controlId="formItem">
<div className="row mt-3">
<div className="col-md-4">
<Form.Label>Date Réalisation:</Form.Label>
</div>
<div className="col-md-8">
<DatePicker
              selected={new Date(editedReun.dateReal)} // Convert the ISO string back to Date object
              onChange={handleDate2Change}
              dateFormat="dd/MM/yyyy"
            />
</div>
</div>
</Form.Group>
<Form.Group controlId="formItem">
<div className="row mt-3">
<div className="col-md-4">
<Form.Label>Lieu:</Form.Label>
</div>
<div className="col-md-8">
<Form.Control
type="text"
value={editedReun.lieu}
onChange={e => handleInputChange('lieu', e.target.value)}
/>
</div>
</div>
</Form.Group>
<Form.Group controlId="formItem">
<div className="row mt-3">
<div className="col-md-4">
<Form.Label>Site:</Form.Label>
</div>
<div className="col-md-8">
<Form.Control
type="text"
value={editedReun.site}
onChange={e => handleInputChange('site', e.target.value)}
/>
</div>
</div>
</Form.Group>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Annuler
</Button>
<Button variant="primary" onClick={() => handleSave(editedReun)}>
Enregistrer
</Button>
</Modal.Footer>
</Modal>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default UpdateModal;