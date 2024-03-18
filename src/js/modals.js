const openModDetails = (modal, movie) => {
  modal.classList.remove('is-hidden');
};

const closeModDetails = (movie) => {
  modDetails.classList.add('is-hidden');
}

// const showModDetails = event => {
//   console.log('event.currentTarget: ', event.currentTarget);
// };

export function handleMovieClick() {
  const movies = document.querySelectorAll('.mov-gallery-card');
  // const modDetails = document.querySelector('[mod-details]');
  // const closeModDetailsBtn = document.querySelector('[mod-details-close]');

  movies.forEach(movie =>
    movie.addEventListener('click', () => {
      const id = movie.dataset.id;
      const movDetails = movie.children[0].firstElementChild.dataset;
      openModDetails(modDetails, movDetails);
    })
  );
  // openModDetailsEl.addEventListener('click', openModDetails);
  // closeModDetailsBtn.addEventListener('click', closeModDetails);
}
