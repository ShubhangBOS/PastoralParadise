import axios from "axios";

// const apiUrl = "https://api.thepastoralparadise.com";
const apiUrl = "http://192.168.1.35:81";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUrl = (endpoint) => new URL(endpoint, apiUrl).href;
export const get = api.get;
export const post = (url, body) => {
  return axios.post(url, body);
};
export const patch = api.patch;
