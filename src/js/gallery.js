GENRES_LIST = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

import axios from 'axios';
import { fetchGenres } from './tmdb-api';

// const POSTERS_URL = 'https://image.tmdb.org/t/p/w500/'; png
const POSTERS_URL = 'https://image.tmdb.org/t/p/original/'; // jpg

function getGenres(list, ids) {
  const matchGenres = [];
  ids.forEach(elIds => {
    matchGenres.push(list.find(elList => elList.id === elIds).name);
  });
  return matchGenres.join(', ');
  // const matchGenres = list.filter(listEl => ids.includes(listEl.id));
  // if (matchGenres.length > 1) matchGenres = matchGenres.join(', ');
  // return matchGenres;
}

export async function showGallery(list, gallery) {
  console.log('showGallery starts...');
  console.log('list: ', list);
  // const allGenres = await fetchGenres();
  const allGenres = GENRES_LIST;
  const galleryItems = list.map(
    ({
      title,
      original_title,
      vote_average,
      poster_path,
      release_date,
      genre_ids,
      overview,
    }) => {
      const poster = `${POSTERS_URL}${poster_path}`;
      console.log('poster: ', poster);
      const genres = getGenres(allGenres, genre_ids);
      console.log('genres: ', genres);
      return `
  <li class="movie-card">
    <img src=${poster} width="120px">
    <p>Adres plakatu: ${poster_path}</p>
    <p>Tytuł: ${title}</p>
    <p>Tytuł oryginalny: ${original_title}</p>
    <p>Rodzaj: ${genres}</p>
    <p>Data premiery: ${release_date}</p>
    <p>Średnia ocena: ${vote_average}</p>
    <p>Opis: ${overview}</p>
  </li>`;
    }
  );
  console.log('galleryItems: ', galleryItems);
  const galleryAll = galleryItems.join('');
  gallery.insertAdjacentHTML('beforeend', galleryAll);
}
