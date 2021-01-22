import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const getData = () => axios.get(url);

export const postData = (newData: any) => axios.post(url, newData);

export const patchData = (id: string, updatedData: any) => axios.patch(`${url}/${id}`, updatedData);

export const deleteData = (id: string) => axios.delete(`${url}/${id}`);