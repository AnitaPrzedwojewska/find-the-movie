const WATCHED = 'watched';
const QUEUE = 'queue';

export function setToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function deleteFromLocalStorage(key) {
  localStorage.removeItem(key);
}

function clearLocalStorage() {
  localStorage.clear();
}

function AddToWatched(movie, list) {
  if (list.include(movie)) {
    console.log('allready is');
    return;
  }
  list.append(movie);
  setToLocalStorage(WATCHED, list);
}

function RemoveFromWatched(movie, list) {
  if (!list.include(movie)) {
    return;
  }
  list.remove(movie);
  setToLocalStorage(WATCHED, list);
}
