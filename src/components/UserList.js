import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddModal from './AddModal';
import UpdateModal from './UpdateModal';
import DeleteConfirmation from './deleteconfirmation';
import { addReunion,deleteReunion,fetchReunions, updateReunion } from '../Actions/reunionActions';
import { format } from 'date-fns';


const UserList = ({ obj, setListOfReun })  => {
  const reunions = useSelector(state => state.reunions.reunions);
  const dispatch = useDispatch();
  // Fetch reunions when the component mounts
  useEffect(() => {
    dispatch(fetchReunions());
  }, [dispatch]);

  

  console.log('reunions',reunions)

  const handleCreateReunion = (newReunion) => {
    dispatch(addReunion(newReunion));
  };

  const handleDeleteReunion = (nReunion) => {
    dispatch(deleteReunion(nReunion));
  };

  const handleReunionUpdated = () => {
    // Update the list of reunions by fetching again
    dispatch(fetchReunions());
  };

  const handleReunionDataUpdated = (reunion) => {
    // Update the list of reunions by fetching again
    dispatch(updateReunion(reunion));
  };
  

  

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [selectedReunions, setSelectedReunions] = useState([]);

  const filteredReunions = reunions.filter((reunion) =>
    reunion.typeReunion.toLowerCase().includes(searchValue.toLowerCase()) ||
    reunion.lieu.toLowerCase().includes(searchValue.toLowerCase()) ||
    reunion.site.toLowerCase().includes(searchValue.toLowerCase()) ||
    reunion.datePrev.toLowerCase().includes(searchValue.toLowerCase()) ||
    reunion.dateReal.toLowerCase().includes(searchValue.toLowerCase()) ||
    String(reunion.nReunion).toLowerCase().includes(searchValue.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredReunions.slice(indexOfFirstUser, indexOfLastUser);
  const totalUsers = filteredReunions.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handleCheckboxChange = (nReunion) => {
    if (selectedReunions.includes(nReunion)) {
      setSelectedReunions(selectedReunions.filter(reunion => reunion !== nReunion));
    } else {
      setSelectedReunions([...selectedReunions, nReunion]);
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '150px' }}>Liste des réunions</h1>
      <div className="row mt-3">
        <div className="col-md-4">
          <AddModal onCreateReunion={handleCreateReunion} onReunionCreated={handleReunionUpdated} />
        </div>
        <div className="col-md-5">
          <DeleteConfirmation
            selectedReunions={selectedReunions}
            OnDeleteReunion={handleDeleteReunion} // Make sure setListOfReun is defined in your parent component
            onReunionDeleted={handleReunionUpdated}
            onDeleteSuccess={() => {
              setSelectedReunions([]);}}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Rechercher"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="table-user">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ backgroundColor: 'lightblue' }}></th>
              <th style={{ backgroundColor: 'lightblue' }}>N° Reunion</th>
              <th style={{ backgroundColor: 'lightblue' }}>Type reunion</th>
              <th style={{ backgroundColor: 'lightblue' }}>Date preview</th>
              <th style={{ backgroundColor: 'lightblue' }}>Date de real</th>
              <th style={{ backgroundColor: 'lightblue' }}>Lieu</th>
              <th style={{ backgroundColor: 'lightblue' }}>Site</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.nReunion}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedReunions.includes(user.nReunion)}
                    onChange={() => handleCheckboxChange(user.nReunion)}
                  />
                </td>
                <td>
                  <UpdateModal
                    nReunion={user.nReunion}
                    filteredReunions={filteredReunions}
                    OnUpdateDataReunion={handleReunionDataUpdated}
                    OnReunionUpdated={handleReunionUpdated}
                  />
                </td>
                <td>{user.typeReunion}</td>
                <td>{format(new Date(user.datePrev), 'dd/MM/yyyy')}</td>
                <td>{format(new Date(user.dateReal), 'dd/MM/yyyy')}</td>
                <td>{user.lieu}</td>
                <td>{user.site}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>

      <div className="pagination" style={{ marginTop: '20px' }}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ backgroundColor: 'lightblue' }}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastUser >= totalUsers}
          style={{ backgroundColor: 'lightblue' }}
        >
          Next
        </button>
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
        containerId="success-container"
      />
    </div>
  );
};

export default UserList;
