import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export const getAllGamesOnline = () => axios.get(`${baseUrl}/api/games`);
export const getAllGamesIA = () => axios.get('http://localhost:5000/api/games/gameia');
export const getGameIAByID = (id) => axios.get(`http://localhost:5000/api/games/ia/${id}`);
export const PostPositionIA = (id) => axios.put(`http://localhost:5000/api/games/ia/${id}`);
