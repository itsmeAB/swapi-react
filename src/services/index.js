import { BASE_URL } from "../config";
import axios from "axios";

export const getUser = async username => {
  const url = `${BASE_URL}people/?search=${username}`;
  const response = await axios.get(url);
  if (response.status === 200 && response.data.count === 1) {
    return response.data.results[0];
  }
  return false;
};

export const getPlanets = async name => {
  const url = `${BASE_URL}planets/?search=${name}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response.data.results;
  }
  return false;
};
