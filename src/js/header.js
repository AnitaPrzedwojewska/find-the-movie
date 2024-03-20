// import { showWatched, showQueue } from "./movies";

const headerEl = document.querySelector('.header');

const homeLink = document.querySelector('#homeLink');
const libLink = document.querySelector('#libraryLink');

const searchEl = document.querySelector('.head-search-form-container');
const libEl = document.querySelector('.head-lib-btns-container');

function toggleHideShowElements(hideEl, showEl) {
  hideEl.classList.add('is-hidden');
  showEl.classList.remove('is-hidden');
}

const homeLinkClick = event => {
  event.preventDefault();
  headerEl.classList.add('home');
  headerEl.classList.remove('lib');
  toggleHideShowElements(libEl, searchEl);
};

const libLinkClick = event => {
  event.preventDefault();
  headerEl.classList.add('lib');
  headerEl.classList.remove('home');
  toggleHideShowElements(searchEl, libEl);

  const watchedEl = document.querySelector('#watchedBtn');
  const queueEl = document.querySelector('#queueBtn');

  function toggleViewBtns(hideBtn, showBtn) {
    hideBtn.classList.remove('active');
    showBtn.classList.add('active');
  }

  watchedEl.addEventListener('click', event => {
    toggleViewBtns(queueEl, watchedEl);
    showWatched();
  });
  queueEl.addEventListener('click', event => {
    toggleViewBtns(watchedEl, queueEl);
    showQueue();
  });

};

homeLink.addEventListener('click', homeLinkClick);
libLink.addEventListener('click', libLinkClick);



