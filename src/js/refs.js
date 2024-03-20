export let searchedWords = '';
export let keywords = '';
export let moviesOnScreen = [];
export let page = 1;
export let pages = 0;
export let results = 0;

export const formEl = document.querySelector('#formSearch');
export const searchEl = formEl.querySelector('#searchInput');

export const galleryTitleEl = document.querySelector('.mov-title');
export const galleryEl = document.querySelector('#moviesGallery');

export const toTopEl = document.querySelector('.to-top');
export const toTopBtn = document.querySelector('#toTopBtn');

// export const modTrailer = document.querySelector('[mod-trailer]');
// export const openModTrailerBtn = document.querySelector('[mod-trailer-open]');
// export const closeModTrailerBtn = document.querySelector('[mod-trailer-close]');
