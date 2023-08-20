
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddModal({ onCreateReunion, onReunionCreated }) {

  const [typeReunion, setTypeReunion] = useState('');
  const [datePrev, setDatePrev] = useState('');
  const [dateReal, setDateReal] = useState('');
  const [lieu, setLieu] = useState('');
  const [site, setSite] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setTypeReunion('');
    setDatePrev('');
    setDateReal('');
    setLieu('');
    setSite('');
    setShow(true);
  };

  const handleCreateReunion = async () => {
    try {
      const response = await axios.post('https://localhost:5001/api/Reunion/add_reunion11', null, {
        params: {
          typeR: typeReunion,
          date_prev: datePrev,
          date_Real: dateReal,
          lieu: lieu,
          site: site
        }
      });
      console.log('Creating reunion...');

      if (response.status === 200) {
        const newReunion = {
          typeReunion: typeReunion,
          datePrev: datePrev,
          dateReal: dateReal,
          lieu: lieu,
          site: site,
        };
  
        onCreateReunion(newReunion);
        onReunionCreated(); 

        toast.success('Ajout effectué avec succès');
        // Reset the form after successful creation
        setTypeReunion('');
        setDatePrev('');
        setDateReal('');
        setLieu('');
        setSite('');
        handleClose(); // Close the modal
        console.log('Response:', response);
      } else {
        console.error('Error while creating reunion.');
        toast.error('Error while creating reunion.');
      }
    } catch (error) {
      console.error('Error while creating reunion:', error);
      toast.error('Error while creating reunion.');
    }
  };

  return (
    <>
      <button style={{ borderRadius: '5px', color: 'green', marginRight: '100px', marginBottom: '10px' }} onClick={handleShow}>
        <span className="icon">
          <FontAwesomeIcon icon={faPlus} />
        </span>{" "}
        Ajouter
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static">
<Modal.Header closeButton>
<Modal.Title>Ajouter un réunion</Modal.Title>
</Modal.Header>
<Modal.Body>
<Form.Group controlId="formItem">
<div className="row mt-3">
<div className="col-md-4">
<Form.Label>Type Réunion:</Form.Label>
</div>
<div className="col-md-8">
<Form.Control
type="text"
placeholder="Type"
value={typeReunion} 
onChange={(e) => setTypeReunion(e.target.value)}
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
<Form.Control
type="date"
placeholder="Date Prévue"
value={datePrev} onChange={(e) => setDatePrev(e.target.value)}
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
<Form.Control
type="date"
placeholder="Date Réalisation"
value={dateReal} onChange={(e) => setDateReal(e.target.value)}
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
placeholder="Lieu"
value={lieu} onChange={(e) => setLieu(e.target.value)}
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
placeholder="Site"
value={site} onChange={(e) => setSite(e.target.value)}
/>
</div>
</div>
</Form.Group>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Annuler
</Button>
<Button variant="primary" onClick={handleCreateReunion}>
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

export default AddModal;