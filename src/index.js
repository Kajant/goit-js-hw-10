'use strict';
import './css/styles.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader')
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

error.classList.add('invisible');
breedSelect.classList.add('invisible');

fetchBreeds()
    .then(breeds => {
        breedSelect.classList.remove('invisible');
        loader.classList.add('invisible');
        const breedIdCard = breeds.map((breed) => {
            return `<option value="${breed.id}">${breed.name}</option>`
        }).join('');
        breedSelect.innerHTML = breedIdCard;
        new SlimSelect({
            select: document.querySelector('.breed-select')
        });
    });

function setCatInfo(catsColletion) {
    if (catsColletion.length == 0) {
        catInfo.classList.add('invisible');
        return Notify.warning(`No cats in here. Choose another breed.`)
    };
    const presentetion = catsColletion.map(({url, breeds }) => {
        const { name, description, temperament } = breeds[0];
         return `
        <img class="cat-img" src="${url}" alt="${name}"/>
        <div class="presentation">
        <h2 class="name">${name}</h2>
        <p class="description">${description}</p>
        <p class="temperament"><b>Temperament: </b>${temperament}</p>
        </div>`
    }).join('');
    catInfo.innerHTML = presentetion;
}
function onSelectCat(event) {
    const catId = event.currentTarget.value;
    loader.classList.remove('invisible');
    catInfo.classList.add('invisible');
    
    fetchCatByBreed(catId)
        .then(data => {
            catInfo.classList.remove('invisible');
            setTimeout(() => {
                loader.classList.add('invisible');
                setCatInfo(data)
            }, 0);
        })
        .catch(() => {
            loader.classList.add('invisible');
            Notify.failure(error.textContent);
    });  
}
breedSelect.addEventListener('change', onSelectCat);