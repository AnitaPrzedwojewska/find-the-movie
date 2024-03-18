// import './js/api-tmdb';
import './js/modals';
import './js/header.js';

import { form, search, galleryTitle, moviesGallery } from './js/refs';

import { showTrendingMovies, showSearchedMovies } from './js/movies';

import { hideShowScrollToTop, scrollToTop } from './js/to-top';

import { toTopBtn } from './js/refs';

import { searchWord, keywords, page, pages, results } from './js/refs';

// send new words for new searching
// form.addEventListener('submit', showMoviesGallery);

showTrendingMovies();

window.addEventListener('scroll', hideShowScrollToTop);
form.addEventListener('submit', event => {
  event.preventDefault();
  showSearchedMovies();
});


