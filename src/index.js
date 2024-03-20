// import './js/api-tmdb';
import './js/modals';
import './js/header.js';

import { formEl, searchEl, galleryTitle, galleryEl } from './js/refs';

import { showTrendingMovies, showSearchedMovies } from './js/movies';

import { toggleScrollToTop, scrollToTop } from './js/to-top';

import { toTopBtn } from './js/refs';

import { searchWord, keywords, page, pages, results } from './js/refs';

// send new words for new searching
// formEl.addEventListener('submit', showMoviesGallery);

showTrendingMovies();

window.addEventListener('scroll', toggleScrollToTop);

// formEl.addEventListener('submit', event => {
//   event.preventDefault();
//   showSearchedMovies();
// });


