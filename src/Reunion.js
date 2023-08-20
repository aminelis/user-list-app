import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './reunion.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Reunion = ({ listOfReun, setListOfReun }) => {
  const { nReunion } = useParams();
  
  

  const Reun = listOfReun.find(reunion => reunion.nReunion === parseInt(nReunion));
  console.log("Reun:", Reun);


  const [editedReun, setEditedReun] = useState({
    nReunion: Reun.nReunion || '', 
    typeReunion: Reun.typeReunion || '',
    datePrev: Reun.datePrev || '',
    dateReal: Reun.dateReal || '',
    lieu: Reun.lieu || '',
    site: Reun.site || '',
  });

  const handleInputChange = (field, value) => {
    setEditedReun(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  
  

  const handleSave = async (editedReun) => {
    //const formattedDatePrev = editedReun.datePrev.split('T')[0]; // Extract just the date
//const formattedDateReal = editedReun.dateReal.split('T')[0]; // Extract just the date


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
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '250px' }}>Reunion Details</h1>

      <div className="row mt-3">
      <div className="col-md-2">
      <button onClick={() => handleSave(editedReun)}>
  Enregistrer
</button>
  </div>
      </div>

      {/* N° Reunion */}
      <div className="row mt-3">
      
  <div className="col-md-2" style={{ marginLeft: '25px', marginTop : '10px' }}>
    <label htmlFor="nReunionTextBox">
      N° Reunion:
    </label>
  </div>
  <div className="col-md-6">
  <input
  type="text"
  id="nReunionTextBox"
  defaultValue={editedReun.nReunion.toString()}
  readOnly={true}
  className="input-style read-only"
/>

</div>

</div>

      {/* Type Reunion */}
      <div className="row mt-3">
      <div className="col-md-2" style={{ marginLeft: '25px', marginTop : '10px' }}>
        <label  htmlFor="typeReunionTextBox"  >
          Type Reunion:
        </label>
        </div>
  <div className="col-md-6">
          <input
            type="text"
            id="typeReunionTextBox"
            value={editedReun.typeReunion}
            onChange={e => handleInputChange('typeReunion', e.target.value)}
            className={'input-style'}
          />
        </div>
        </div>

      {/* Date Preview */}
      <div className="row mt-3">
      <div className="col-md-2" style={{ marginLeft: '25px', marginTop : '10px' }}>
        <label  htmlFor="datePrevTextBox"  >
          Date Preview:
        </label>
        </div>
  <div className="col-md-6">
          <input
            type="date"
            id="datePrevTextBox"
            value={editedReun.datePrev}
            onChange={e => handleInputChange('datePrev', e.target.value)}
            className={'input-style'}
          />
        </div>
        </div>
      
      {/* Date Realisation */}
      <div className="row mt-3">
      <div className="col-md-2" style={{ marginLeft: '25px', marginTop : '10px' }}>
        <label  htmlFor="dateRealTextBox"  >
          Date Realisation:
        </label>
        </div>
  <div className="col-md-6">
          <input
            type="date"
            id="dateRealTextBox"
            value={editedReun.dateReal}
            onChange={e => handleInputChange('dateReal', e.target.value)}
            className={'input-style'}
          />
        </div>
        </div>
      
      {/* Lieu */}
      <div className="row mt-3">
      <div className="col-md-2" style={{ marginLeft: '25px', marginTop : '10px' }}>
        <label  htmlFor="lieuTextBox"  >
          Lieu:
        </label>
        </div>
  <div className="col-md-6">
          <input
            type="text"
            id="lieuTextBox"
            value={editedReun.lieu}
            onChange={e => handleInputChange('lieu', e.target.value)}
            className={'input-style'}
          />
      </div>
      </div>
      {/* Site */}
      <div className="row mt-3">
      <div className="col-md-2" style={{ marginLeft: '25px', marginTop : '10px' }}>
        <label  htmlFor="siteBox"  >
          Site:
        </label>
        </div>
  <div className="col-md-6">
          <input
            type="text"
            id="siteBox"
            value={editedReun.site}
            onChange={e => handleInputChange('site', e.target.value)} 
            className={'input-style'}
          />
        </div>
        </div>
      {/* You can also use listOfUsers here if needed */}
    </div>
  );
};

export default Reunion;
