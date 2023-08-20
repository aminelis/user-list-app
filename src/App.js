import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './components/home';
import { Provider } from 'react-redux';
import store from './store/store';
import { fetchReunions } from './Actions/reunionActions';
import axios from 'axios';
import './App.css';

const App = () => {
  const [listOfReuns, setListOfReun] = useState([]);

  useEffect(() => {
    // Mettre à jour la liste des réunions localement
    axios.get('https://localhost:5001/api/Reunion/getListeReunion11')
      .then(response => {
        setListOfReun(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Charger les réunions en utilisant l'action fetchReunions()
    store.dispatch(fetchReunions());
  }, []);

  return (
    <Provider store={store}>
      <div className="App background-image">
        <nav>
          <ul>
            <li>
              <Link to="/" style={{ color: 'blue', textDecoration: 'underline', marginBottom: '10px' }}>
                
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home listOfReun={listOfReuns} setListOfReun={setListOfReun} />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
