import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_bibxAUJAz8ZnVN7nBo99DahMQ8LIldB1UtE4SMgluyM8fcqQ7jRbU71bWwMiMMPO';

export { fetchBreeds, fetchCatByBreed };

function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => {
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({ breed_ids: breedId });
  return axios.get(`${BASE_URL}/images/search?${params}`).then(response => {
    return response.data;
  });
}
