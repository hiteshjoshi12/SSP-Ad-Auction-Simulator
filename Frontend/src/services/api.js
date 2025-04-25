import axios from 'axios';

const BASE = axios.create({
  baseURL: 'http://localhost:3000/', 
});

export default BASE;

// DSPs
export const fetchDSPs = () => BASE.get('/admin/dsps');
export const createDSP = (data) => BASE.post('/admin/dsps', data);
export const updateDSP = (id, data) => BASE.put(`/admin/dsps/${id}`, data);

// Logs
export const fetchLogs = () => BASE.get('/logs');