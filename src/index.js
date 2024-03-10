// import './js/api-tmdb';
import './js/modals';

import {
  fetchGenres,
  fetchTrendingMovies,
  fetchMoviesByKeywords,
  fetchMovieDetails,
  fetchMovieTrailers,
} from './js/api-tmdb';
import { showGallery } from './js/movies';

const form = document.querySelector('#formSearch');
const search = form.querySelector('#formInput');
const moviesGallery = document.querySelector('#moviesGallery');
console.log('moviesGallery: ', moviesGallery);

let searchWords;
let keywords;
let page;
let pages;

// send new words for new searching
// form.addEventListener('submit', showMoviesGallery);

showTrendingMovies();
// showGenres();

async function showTrendingMovies() {
  try {
    const page = 1;
    // const keywords = 'marvel';
    // const movieId = 693134;
    const moviesList = await fetchTrendingMovies(page);
    // const moviesList = await fetchSearchMovies(keywords, page);
    // const moviesList = await fetchMovieDetails(movieId);
    // const moviesList = await fetchMovieTrailers(movieId);
    console.log('results: ', moviesList.results);
    showGallery(moviesList.results, moviesGallery);
  } catch (error) {
    console.log(error);
  }
}

// async function showGenres() {
//   try {
//     const genresList = await getGenres();
//   } catch {
//     console.log(error);
//   }
// }
