import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export function getUsers() {
  return apiClient.get('/users');
}

export function addUser(userData) {
  return apiClient.post('/users', userData);
}

export function updateUser(userId, userData) {
  return apiClient.put(`/users/${userId}`, userData);
}

export function deleteUser(userId) {
  return apiClient.delete(`/users/${userId}`);
}
