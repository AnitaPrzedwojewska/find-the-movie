import {
  GENRES_LIST,
  fetchTrendingMovies,
  fetchSearchedMovies,
} from './api-tmdb';

import { galleryEl, galleryTitleEl, formEl, searchEl } from './refs';

import { setToSessionStorage } from './storage';

import { handleMovieClick } from './modals';

import { showPagination } from './pagination';

// console.log('search: ', search);

// const POSTERS_URL = 'https://image.tmdb.org/t/p/w500/'; png
const POSTERS_URL = 'https://image.tmdb.org/t/p/original/'; // jpg

// tworzy listę odpowiadających gatunków filmowych
export function getGenres(ids, genres) {
  let matchGenres = [];
  ids.forEach(id => {
    matchGenres.push(genres.find(genre => genre.id === id).name);
  });
  return matchGenres.length === 0
    ? '[genres-not-found]'
    : matchGenres.join(`, `);
}

// czyści galerię
function clearGallery() {
  moviesGallery.innerHTML = '';
}

// const buildGallery = (moviesArray, galleryElement) => {};

// generuje kod HTML galerii z podanymi filmami
async function showGallery(moviesArray, galleryElement) {
  // get genres from API TMDB
  // const allGenres = await fetchGenres();
  // const allGenres = GENRES_LIST;

  const galleryItems = moviesArray.map(
    ({
      id,
      poster_path,
      title,
      release_date,
      genre_ids,
      original_title,
      vote_average,
      popularity,
      vote_count,
      overview,
    }) => {
      const poster = `${POSTERS_URL}${poster_path}`;
      const genres = getGenres(genre_ids, GENRES_LIST);
      const year = release_date.substring(0, 4);
      return `
  <li class="mov-gallery-card" data-id="${id}" mod-details-open>
    <div href="" class="mov-gallery-movie-link link" id=${id}>
      <div class="movie-details"
        data-id="${id}"
        data-poster_path="${poster}"
        data-title="${title}"
        data-genre_ids="${genres}"
        data-original_title="${original_title}"
        data-vote_average="${vote_average}"
        data-popularity="${popularity}"
        data-vote_count="${vote_count}"
        data-overview="${overview}"
        data-release_date="${release_date}">
      </div>
      <div class="mov-gallery-poster">
        <img src=${poster} alt="Poster of film: ${title}">
      </div>
      <div class="mov-gallery-info">
        <p class="mov-gallery-title">${title}</p>
        <p class="mov-gallery-txt">${genres} | ${year}</p>
      </div>
    </div>
  </li>`;
    }
  );
  const galleryAll = galleryItems.join('');
  galleryElement.insertAdjacentHTML('beforeend', galleryAll);
}

const getMoviesData = moviesArray => {
  const result = moviesArray.map(
    ({
      id,
      poster_path,
      title,
      release_date,
      genre_ids,
      original_title,
      vote_average,
      popularity,
      vote_count,
      overview,
    }) => ({
      id,
      poster_path,
      title,
      release_date,
      genre_ids,
      original_title,
      vote_average,
      popularity,
      vote_count,
      overview,
    })
  );
  return result;
};

// ================================================== showTrendingMovies
// wyświetla galerię popularnych filmów
export async function showTrendingMovies() {
  try {
    // czyści kod galerii
    clearGallery();
    let pageNo = 1;
    // pobiera z bazy porcję filmów wg nr strony
    const moviesList = await fetchTrendingMovies(pageNo);
    // odczytuje i granicza wyniki do 1000 i liczbę stron do 500
    const pages = moviesList.total_pages > 500 ? 500 : moviesList.total_pages;
    const results =
      moviesList.total_results > 1000 ? 1000 : moviesList.total_results;
    // tworzy okrojoną listę filmów wyświetlanych na ekranie i zapisuje ją w sesji
    let moviesOnScreen = getMoviesData(moviesList.results);
    setToSessionStorage('moviesOnScreen', moviesOnScreen);
    // nadaje tytuł galerii
    galleryTitleEl.innerHTML = 'Trending movies';
    // wyświetla galerię
    showGallery(moviesOnScreen, galleryEl);
    // dodaje obsługę kliknięcia w elementy galerii
    handleMovieClick();
    // wyświetla paginację
    // showPagination(pageNo, pages);
    showPagination(7, pages);
    // addEventListener for get more movies
  } catch (error) {
    console.log(error);
  }
}

// ================================================== showSearchedMovies
// wyświetla galerię wyszukiwanych filmów
export async function showSearchedMovies() {
  try {
    // czyści kod galerii
    clearGallery();
    // pobiera z formularza wpisane słowa i resetuje formularz
    searchedWords = searchEl.value;
    formEl.reset();
    // zamienia słowa na ciąg keywords, np. green+book
    const keywords = searchedWords.toLowerCase().split(' ').join('+');
    pageNo = 1;
    // pobiera z bazy porcję filmów wg słów kluczowych i nr strony
    const moviesList = await fetchSearchedMovies(keywords, pageNo);
    // odczytuje liczbę wyników i stron
    const pages = moviesList.total_pages;
    const results = moviesList.total_results;
    // tworzy okrojoną listę filmów wyświetlanych na ekranie i zapisuje ją w sesji
    let moviesOnScreen = getMoviesData(moviesList.results);
    setToSessionStorage('moviesOnScreen', moviesOnScreen);
    // nadaje tytuł galerii
    galleryTitleEl.innerHTML = `Searched movies - we found ${results} movies with "${searchedWords}"`;
    // wyświetla galerię
    showGallery(moviesOnScreen, galleryEl);
    // dodaje obsługę kliknięcia w elementy galerii
    handleMovieClick();
    // wyświetla paginację
    showPagination(pageNo, pages);
    // addEventListener for get more movies
  } catch (error) {
    console.log(error);
  }
}

// ================================================== showWatched
// export function showWatched() {
//   console.log('showWatched starts...');
// }

// ================================================== showQueue
// export function showQueue() {
//   console.log('showQueue starts...');
// }
