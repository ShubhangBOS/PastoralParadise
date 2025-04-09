import axios from "axios";

const apiUrl = "http://192.168.0.124:81/";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUrl = (endpoint) => new URL(endpoint, apiUrl).href;
export const get = api.get;
export const post = api.post;
export const patch = api.patch;
