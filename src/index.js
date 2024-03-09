import './js/api-tmdb';

import {
  fetchGenres,
  fetchTrendingMovies,
  fetchMoviesByKeywords,
  fetchMovieDetails,
  fetchMovieTrailers
} from './js/api-tmdb';

const form = document.querySelector('#search-form');
const search = form.querySelector('#search-input');
const moviesGallery = document.querySelector('#movies-gallery');
console.log('moviesGallery: ', moviesGallery);

let searchWords;
let keywords;
let page;
let pages;

// send new words for new searching
// form.addEventListener('submit', showMoviesGallery);

showMovies();
// showGenres();

async function showMovies() {
  try {
    const page = 1;
    const keywords = 'marvel';
    const movieId = 693134;
    // const moviesList = await fetchTrendingMovies(page);
    // const moviesList = await fetchSearchMovies(keywords, page);
    // const moviesList = await fetchMovieDetails(movieId);
    const moviesList = await fetchMovieTrailers(movieId);
    console.log('results: ', moviesList.results);
    // showGallery(moviesList.results, moviesGallery);
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
