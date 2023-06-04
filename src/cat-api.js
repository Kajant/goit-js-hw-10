'use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const myApiKey = 'live_Uq2ORORAawzGaxlhb5rOlwqbhClxSgGqqU5Ipq15OW3Tc3jyFlpIQEQIpJFCfLp6';

export async function fetchBreeds() {
    const response = await fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
            'x-api-key': myApiKey
        }
    });
    if (!response.ok) {
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
    }
    return await response.json();
}

export async function fetchCatByBreed(catId) {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${catId}`, {
        headers: {
            'x-api-key': myApiKey
        }
    });
    if (!response.ok) {
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
    }
    return await response.json();
}