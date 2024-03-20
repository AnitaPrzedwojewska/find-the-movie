import { getFromLocalStorage } from './local-storage';

// pobieranie id filmu z klikniętego elementu listy w galerii
const getMovieId = event => {
  return event.target.closest('li').dataset.id;
  event.stopPropagation();
};

const showDetails = movieId => {
  const modDetails = document.querySelector('#modDetails');
  const moviesOnScreen = getFromLocalStorage('moviesOnScreen');
  const movie = moviesOnScreen.find(movie => movie.id == movieId);
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
          <p class="mod-det-item-value">${movie.vote_average} / ${movie.vote_count}</p>
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
          <p class="mod-det-item-value">${movie.genre_ids}</p>
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
  modDetails.insertAdjacentHTML('beforeend', detailsCode);
  modDetails.classList.remove('hidden');
};

// obsługa zdarzenie kliknięcia na kartę w galerii filmów
export const handleMovieClick = () => {
  const moviesGallery = document.querySelector('#moviesGallery');
  moviesGallery.addEventListener('click', event => {
    const id = getMovieId(event);
    showDetails(id);
  });
};
