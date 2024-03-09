const WATCHED = 'watched';
const QUEUE = 'queue';

function setToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
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
  
}