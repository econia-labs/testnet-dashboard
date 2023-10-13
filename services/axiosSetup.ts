import axios from "axios";

const API_ENDPOINT = process.env.NEXT_PUBLIC_REST_API_URL;

const axiosClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Prefer: 'count=estimated',
  },
  timeout: 4000,
  withCredentials: true,
});

export const getRequest = async (url: string, headers?: Record<string, string>) => {
  return axiosClient
  .get(`/${url}`, { headers })
  .then((response) => response);
};

export const postRequest = async (url: string, payload: unknown) => {
  return axiosClient.post(`/${url}`, payload).then((response) => response);
};

export const patchRequest = async (url: string, payload: unknown) => {
  return axiosClient.patch(`/${url}`, payload).then((response) => response);
};

export const deleteRequest = async (url: string) => {
  return axiosClient.delete(`/${url}`).then((response) => response);
};
