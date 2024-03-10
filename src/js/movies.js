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
  console.log('gallery: ', gallery);
  // const allGenres = await fetchGenres();
  const allGenres = GENRES_LIST;
  console.log('allGenres: ', allGenres);

  const galleryItems = list.map(
    ({
      id,
      poster_path,
      title,
      release_date,
      genre_ids,
      original_title,
      vote_average,
      popularity,
      vote_count,
      overview,
    }) => {
      const poster = `${POSTERS_URL}${poster_path}`;
      const genres = getGenres(allGenres, genre_ids);
      const year = release_date.substring(0, 4);
      return `
  <li class="mov-gallery-card" data-id="${id}">
    <div href="" class='movie_list_link link' id=${id}>
      <div class="movie__cover--darkened"
        data-id="${id}"
        data-poster_path="${poster}"
        data-title="${title}"
        data-genre_ids="${genres}"
        data-original_title="${original_title}"
        data-vote_average="${vote_average}"
        data-popularity="${popularity}"
        data-vote_count="${vote_count}"
        data-overview="${overview}"
        data-release_date="${release_date}">
      </div>
      <div class="mov-gallery-poster">
        <img src=${poster} alt="Poster of film: ${title}">
      </div>
      <div class="mov-gallery-info">
        <p class="mov-gallery-title">${title}</p>
        <p class="mov-gallery-txt">${genres} | ${year}</p>
      </div>
    </div>
  </li>`;
    }
  );
  // console.log('galleryItems: ', galleryItems);
  const galleryAll = galleryItems.join('');
  gallery.insertAdjacentHTML('beforeend', galleryAll);
}
