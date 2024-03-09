import { GENRES_LIST } from "./api-tmdb";

// const POSTERS_URL = 'https://image.tmdb.org/t/p/w500/'; png
const POSTERS_URL = 'https://image.tmdb.org/t/p/original/'; // jpg

function getGenres(genres, ids) {
  const matchGenres = [];
  ids.forEach(id => {
    matchGenres.push(genres.find(genre => genre.id === id).name);
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
