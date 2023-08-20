import React,{useState} from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DeleteConfirmation = ({ selectedReunions, OnDeleteReunion, onReunionDeleted, onDeleteSuccess }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    console.log('sel',selectedReunions.length);
    if (selectedReunions.length > 0) {
      setShow(true);
    } else {
      toast.error('Aucun élément sélectionné !');
    }
  };

  const handleDeleteConfirmation = async () => {
    try {
      // Parcourir les IDs des réunions sélectionnées et les supprimer
      for (const nReunion of selectedReunions) {
        const response = await axios.delete(`https://localhost:5001/api/Reunion/DeleteReunion?nReunion=${nReunion}`);
        
        if (response.status === 200) {
          console.log("Data deleted successfully!");
          OnDeleteReunion(nReunion);
          onReunionDeleted();
          onDeleteSuccess();
          toast.success('Suppression effectuée avec succès');
        } else {
          toast.error("Error while deleting data.");
        }
      }
      setShow(false);
  
      
    } catch (error) {
      toast.error("Error while deleting data:", error);
    }
  };

  return (
    <>
    <button style={{ borderRadius: '5px',color : 'red', marginBottom : '10px' }} onClick={handleShow}>
          <span className="icon">
            <FontAwesomeIcon icon={faTrash} />
          </span>{" "}
          Supprimer
      </button>
    <Modal show={show} onHide={handleClose} backdrop="static">
<Modal.Header closeButton>
<Modal.Title>Êtes-vous sûr de vouloir supprimer cette réunion ?</Modal.Title>
</Modal.Header>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Annuler
</Button>
<Button variant="primary" onClick={handleDeleteConfirmation}>
Oui, supprimer
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
};

export default DeleteConfirmation;
