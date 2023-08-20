/*import React, { useState } from 'react';
import './reunion.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';

const NewReunion = () => {
   const [typeReunion, setTypeReunion] = useState('');
   const [datePrev, setDatePrev] = useState('');
   const [dateReal, setDateReal] = useState('');
   const [lieu, setLieu] = useState('');
   const [site, setSite] = useState('');
   
 
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
       
       if (response.status === 200) {
         toast.success('Ajout effectué avec succès');
         // Reset the form after successful creation
         setTypeReunion('');
         setDatePrev('');
         setDateReal('');
         setLieu('');
         setSite('');
       } else {
         console.error('Error while creating reunion.');
       }
     } catch (error) {
       console.error('Error while creating reunion:', error);
     }
   };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '150px' }}>Ajouter une nouvelle réunion</h1>
      
      <div className="row mt-3">
      <div className="col-md-4">

     <div className="row mt-3">
     <div className="col-md-4" style={{  marginTop : '10px' }}>

        <label>Type Réunion</label>
        </div>
     <div className="col-md-6">
        <input className={'input-style'} type="text" value={typeReunion} onChange={(e) => setTypeReunion(e.target.value)} />

        </div>
        </div>
     <div className="row mt-3">
     <div className="col-md-4" style={{  marginTop : '10px' }}>

        <label>Date Prévue</label>
        </div>
     <div className="col-md-6">
        <input className={'input-style'} type="date" value={datePrev} onChange={(e) => setDatePrev(e.target.value)} />

        </div>
        </div>
     <div className="row mt-3">
     <div className="col-md-4" style={{  marginTop : '10px' }}>

        <label>Date Réalisation</label>
     </div>
     <div className="col-md-6">
        <input className={'input-style'} type="date" value={dateReal} onChange={(e) => setDateReal(e.target.value)} />

        </div>
        </div>
     <div className="row mt-3">
     <div className="col-md-4" style={{  marginTop : '10px' }}>

        <label>Lieu</label>
     </div>
     <div className="col-md-6">
        <input className={'input-style'} type="text" value={lieu} onChange={(e) => setLieu(e.target.value)} />

        </div>
        </div>
     <div className="row mt-3">
     <div className="col-md-4" style={{  marginTop : '10px' }}>

        <label>Site</label>
        </div>
     <div className="col-md-6">
        <input className={'input-style'} type="text" value={site} onChange={(e) => setSite(e.target.value)} />

        </div>
        </div>

        </div>

        <div className="col-md-8">
        <div className="row mt-3">
        <div className="col-md-8">
        <button style={{backgroundColor : 'green', color : 'white'}} type="button" onClick={handleCreateReunion}>
          Créer Réunion
        </button>
        </div>
        </div>
        </div>
        
        </div>

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

        </div>
    
  );
};

export default NewReunion;*/
