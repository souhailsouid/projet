/* eslint-disable no-return-assign */

import axios from 'axios';

export const onShowRecapCreationGame = (updateState) => {
  updateState({ showRecap: true, show: false });
};
export const handleCloseRecapModal = (updateState) => {
  updateState({ showRecap: false });
};

export const onCreationGame = (state, updateState) => {
  const elements = {
    name: state.title,

  };
  axios.post('http://localhost:5000/api/games', elements)
    .then((data) => {
      updateState({ games: data, gameId: data.data.id, showAlertSuccess: true });
      const IdGame = data.data.id;
      updateState({ gameId: IdGame });
      return window.location = 'http://localhost:9000/dashboard';
    }).catch((err) => updateState({ slackValidation: err.response.data.error }));
};

export const onCreationGameIa = (state, updateState) => {
  const elements = {
    name: state.title,

  };
  axios.post('http://localhost:5000/api/games/ia', elements)
    .then((data) => {
      updateState({ gamesIa: data, gameIdIA: data.data.id, showAlertSuccess: true });
      const IdGame = data.data.id;
      updateState({ gameId: IdGame });
      return window.location = 'http://localhost:9000/dashboard';
    }).catch((err) => updateState({ slackValidation: err.response.data.error }));
};

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
