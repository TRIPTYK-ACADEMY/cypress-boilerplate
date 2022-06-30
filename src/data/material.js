import axios from 'axios';

export const get = async () => {
  const { data } = await axios.get('http://localhost:8080/materials');
  return data;
};

export const getOne = async (id) => {
  const { data } = await axios.get(`http://localhost:8080/materials/${id}`);
  return data;
};

export const add = async (material) => {
  const { data } = await axios.post('http://localhost:8080/materials', material);
  return data;
};

export const update = async (material) => {
  const { data } = await axios.put(
    `http://localhost:8080/materials/${material.id}`,
    material,
  );
  return data;
};

export const remove = async (material) => {
  const { data } = await axios.delete(`http://localhost:8080/materials/${material.id}`);
  return data;
};
