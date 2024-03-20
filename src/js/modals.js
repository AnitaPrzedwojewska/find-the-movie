// otwiera okno modalne
const openModDetails = (modal, movie) => {
  modal.classList.remove('hidden');
};

// zamyka okno modalne
const closeModDetails = movie => {
  modDetails.classList.add('hidden');
};

// const showModDetails = event => {
//   console.log('event.currentTarget: ', event.currentTarget);
// };

// pobieranie id filmu z klikniętego elementu listy w galerii
const getMovieId = event => {
  return event.target.closest('li').dataset.id;
  event.stopPropagation();
};

const showDetails = (id) => {
  console.log('showDetails starts...');
  
}

// obsługa zdarzenie kliknięcia na kartę w galerii filmów
export const handleMovieClick = () => {
  const moviesGallery = document.querySelector('#moviesGallery');
  moviesGallery.addEventListener('click', event => {
    const id = getMovieId(event));
    showDetails(id);
  });

  // const modDetails = document.querySelector('[mod-details]');
  // const closeModDetailsBtn = document.querySelector('[mod-details-close]');

  // movies.forEach(movie =>
  //   movie.addEventListener('click', () => {
  //     const id = movie.dataset.id;
  //     const movDetails = movie.children[0].firstElementChild.dataset;
  //     openModDetails(modDetails, movDetails);
  //   })
  // );
  // openModDetailsEl.addEventListener('click', openModDetails);
  // closeModDetailsBtn.addEventListener('click', closeModDetails);
};
