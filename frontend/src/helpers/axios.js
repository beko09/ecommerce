import axios from "../utils/axios-instance";

export async function postData(route = "", data = {}) {
  const response = await axios.post(`/api/v1/${route}`, data);
  if (response.data) return response.data;
  return response;
}

export async function getData(route = "") {
  const response = await axios.get(`/api/v1/${route}`);
  if (response.data) return response.data;
  return response;
}

export async function updateData(route = "", data = {}) {
  const response = await axios.put(`/api/v1/${route}`, data);
  if (response.data) return response.data;
  return response;
}

export async function deleteData(route = "") {
  const response = await axios.delete(`/api/v1/${route}`);
  if (response.data) return response.data;
  return response;
}
