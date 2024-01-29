import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import iziToast from 'izitoast';
import SlimSelect from 'slim-select';
import 'izitoast/dist/css/iziToast.min.css';
import 'slim-select/styles';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(data => {
    createOptions(data);
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(error => {
    setLoader('none');
    getError();
  });

function createOptions(breeds) {
  try {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    setCatInfo('flex');
    setLoader('none');
  } catch (error) {
    setLoader('none');
    getError();
  }
}

breedSelect.addEventListener('change', addInfo);

function addInfo(event) {
  setCatInfo('none');
  setLoader('block');
  const selectedBreedId = event.target.value;
  fetchCatByBreed(selectedBreedId)
    .then(data => {
      if (data == undefined) {
        throw new Error();
      }
      const arr = data[0].breeds[0];

      catInfo.innerHTML = `
      <img class="cat-image" src="${data[0].url}" alt="Cat Image">
      <div class="cat-content">
      <h1><strong> ${arr.alt_names}</strong> </h1>
      <p>  ${arr.description} </p>
      <p><strong>Temperament:</strong> ${arr.temperament}</p></div>
    `;

      setLoader('none');
      setCatInfo('flex');
    })
    .catch(error => {
      setLoader('none');
      getError();
    });
}

function getError() {
  iziToast.error({
    title: 'Error',
    message: 'Oops! Something went wrong! Try reloading the page!',
  });
}

function setLoader(atr) {
  loader.style.display = atr;
}

function setCatInfo(atr) {
  catInfo.style.display = atr;
}
