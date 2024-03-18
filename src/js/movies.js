import {
  GENRES_LIST,
  getPoster,
  fetchTrendingMovies,
  fetchSearchedMovies,
  fetchMovieDetails,
  fetchMovieTrailers,
} from './api-tmdb';

import { form, search, gallery, galleryTitle } from './refs';

import { handleMovieClick } from './modals';

console.log('search: ', search);

// const POSTERS_URL = 'https://image.tmdb.org/t/p/w500/'; png
const POSTERS_URL = 'https://image.tmdb.org/t/p/original/'; // jpg

function getGenres(genres, ids) {
  const matchGenres = [];
  ids.forEach(id => {
    matchGenres.push(genres.find(genre => genre.id === id).name);
  });
  // matchGenres = (matchGenres.length > 0) ? matchGenres : '';
  console.log('getGenres: ', matchGenres);
  return matchGenres.join(', ');
  // const matchGenres = list.filter(listEl => ids.includes(listEl.id));
  // if (matchGenres.length > 1) matchGenres = matchGenres.join(', ');
  // return matchGenres;
}

function newGallery() {
  moviesGallery.innerHTML = '';
}

async function showGallery(movies, gallery) {
  // const allGenres = await fetchGenres();
  const allGenres = GENRES_LIST;

  const galleryItems = movies.map(
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
      const genres = getGenres(allGenres, genre_ids);
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
  gallery.insertAdjacentHTML('beforeend', galleryAll);
}

// ================================================== showTrendingMovies
export async function showTrendingMovies() {
  try {
    newGallery();
    const page = 1;
    const moviesList = await fetchTrendingMovies(page);
    const pages = moviesList.total_pages;
    const results = moviesList.total_results;
    const movies = moviesList.results;
    galleryTitle.innerHTML = 'Trending movies';
    showGallery(movies, moviesGallery);

    handleMovieClick();
    //addEventListener for get more movies
  } catch (error) {
    console.log(error);
  }
}

// ================================================== showSearchedMovies
export async function showSearchedMovies() {
  try {
    console.log('showSearchedMovies starts...');
    newGallery();
    searchedWords = search.value;
    console.log('searchedWords: ', searchedWords);
    form.reset();
    const keywords = searchedWords.toLowerCase().split(' ').join('+');
    page = 1;
    const moviesList = await fetchSearchedMovies(keywords, page);
    const pages = moviesList.total_pages;
    const results = moviesList.total_results;
    const movies = moviesList.results;
    galleryTitle.innerHTML = `Searched movies - we found ${movies} movies with "${searchedWords}"`;
    // const moviesList = await fetchMovieDetails(movieId);
    // const moviesList = await fetchMovieTrailers(movieId);
    showGallery(moviesList.results, moviesGallery);

    // addEventListener for get more movies
  } catch (error) {
    console.log(error);
  }
}

// ================================================== showWatched
export function showWatched() {
  console.log('showWatched starts...');
}

// ================================================== showQueue
export function showQueue() {
  console.log('showQueue starts...');
}
