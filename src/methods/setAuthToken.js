/* eslint-disable indent */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};
