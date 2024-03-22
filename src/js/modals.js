import { getFromSessionStorage } from './storage';
import { GENRES_LIST } from './api-tmdb';
import { getGenres } from './movies';

// pobieranie id filmu z klikniętego elementu listy w galerii
const getMovieId = event => {
  return event.target.closest('li').dataset.id;
  event.stopPropagation();
};

// zamknięcie okna i wyczyszczenie jego kodu
const closeDetails = event => {
  const modDetails = document.querySelector('#modDetails');
  modDetails.innerHTML = '';
  modDetails.classList.add('hidden');
};

// obsługa zdarzeń zamykających okno
const handleCloseDetails = () => {
  // kliknięcie w przycisk zamykania okna
  const closeBtnEl = document.querySelector('[mod-details-close]');
  closeBtnEl.addEventListener('click', closeDetails);
  // kliknięcie poza oknem
  const modDetails = document.querySelector('#modDetails');
  modDetails.addEventListener('click', event => {
    if (event.target == modDetails) closeDetails();
  });
  // naciśnięcie klawsza Esc
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeDetails()
  });
};

const showDetails = movieId => {
  const modDetails = document.querySelector('#modDetails');
  // pobranie z pamięci listy filmów wyświatlanych na ekranie
  const moviesOnScreen = getFromSessionStorage('moviesOnScreen');
  // wybranie z tej listy filmu o podanym id
  const movie = moviesOnScreen.find(movie => movie.id == movieId);
  // wygenerowanie listy gatunków dla tego filmu
  const genres = getGenres(movie.genre_ids, GENRES_LIST);
  // wygenerowanie kodu okna modalnego z iformacjami o filmie
  const detailsCode = `
  <div class="mod-details">
    <button type="button" class="btn mod-close animate" mod-details-close>
      <svg class="svg-close">
        <use href="./images/icons.svg#icon-x-close"></use>
      </svg>
    </button>
    <div class="mod-det-poster">plakat
    </div>
    <div class="mod-det-info">
      <h2 class="mod-det-title">${movie.title}</h2>
      <ul class="list mod-det-list">
        <li class="mod-det-item">
          <p class="mod-det-item-name">Vote / Votes</p>
          <p class="mod-det-item-value">${movie.vote_average.toFixed(1)} / ${
    movie.vote_count
  }</p>
        </li>
        <li class="mod-det-item">
          <p class="mod-det-item-name">Popularity</p>
          <p class="mod-det-item-value">${movie.popularity}</p>
        </li>
        <li class="mod-det-item">
          <p class="mod-det-item-name">Original title</p>
          <p class="mod-det-item-value">${movie.original_title}</p>
        </li>
        <li class="mod-det-item">
          <p class="mod-det-item-name">Genre</p>
          <p class="mod-det-item-value">${genres}</p>
        </li>
      </ul>
      <div class="mod-det-about">
        <h3>About</h3>
        <p>${movie.overview}</p>
      </div>
      <div class="mod-det-btns">
        <button class="btn mod-det-btn watched animate">Add to watched</button>
        <button class="btn mod-det-btn queue animate">Add to queue</button>
      </div>
    </div>
  </div>`;
  // wstawienie kodu do znacznika okna
  modDetails.insertAdjacentHTML('beforeend', detailsCode);
  // wyświetlenie okna
  modDetails.classList.remove('hidden');
  // włączenie obsługi zdarzeń zamkykających okno
  handleCloseDetails();
};

// obsługa zdarzenie kliknięcia na kartę w galerii filmów
export const handleMovieClick = () => {
  const moviesGallery = document.querySelector('#moviesGallery');
  moviesGallery.addEventListener('click', event => {
    const id = getMovieId(event);
    showDetails(id);
  });
};
