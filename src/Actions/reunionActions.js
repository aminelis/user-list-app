// reunionActions.js
import { ADD_REUNION, FETCH_REUNIONS, DELETE_REUNIONS, UPDATE_REUNIONS } from '../constants/constants';
import axios from 'axios';

// Action creator pour ajouter une réunion
export const addReunion = (reunion) => {
  return {
    type: ADD_REUNION,
    payload: reunion,
  };
};

// Action creator pour récupérer les réunions depuis l'API
export const fetchReunions = () => {
  return async (dispatch) => {
    try {
      // Effectuez votre appel à l'API ici
      const response = await axios.get('https://localhost:5001/api/Reunion/getListeReunion11');
      
      // Dispatchez l'action FETCH_REUNIONS avec les données récupérées
      dispatch({
        type: FETCH_REUNIONS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching reunions:', error);
    }
  };
};

export const deleteReunion = (reunion) => {
    return {
      type: DELETE_REUNIONS,
      payload: reunion,
    };
  };
  export const updateReunion = (reunion) => {
    return {
      type: UPDATE_REUNIONS,
      payload: reunion,
    };
  };
