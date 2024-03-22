import { galleryEl } from './refs';

const pagingStart = '<div class="pagination">';
const pagingEnd = '</div>';

const showPaginator = (paging, page, pages) => {
  const arrowPrev =
    paging[0] < page
      ? `
  <a class="pag-item arrow prev link" href=""><div class=""><-</div></a>`
      : '';
  const arrowNext =
    paging[paging.length - 1] < pages
      ? `
  <a class="pag-item arrow prev link" href=""><div class="">-></div></a>`
      : '';
  const pagingItems = paging.map(element => {
    let cur = element === page ? ' current' : '';
    return `
    <a class="pag-item${cur} link" data-page="${element}">${element}</a>
    `;
  });
  pagingItems.unshift(arrowPrev);
  pagingItems.unshift(pagingStart);
  pagingItems.push(arrowNext);
  pagingItems.push(pagingEnd);
  console.log('pagingItems: ', pagingItems);
  const pagingCode = pagingItems.join('');
  galleryEl.insertAdjacentHTML('afterend', pagingCode);
};

export const showPagination = (page, pages) => {
  console.log('showPagination starts...');
  console.log('page: ', page, ', from pages: ', pages);
  // jeśli page < pages, wyświetl strzałkę =>
  let paging = [];
  paging.push(page);
  // jeśli page > 1, wyświetl strzałkę <=
  if (page > 1) {
    for (let i = page - 1; i >= 1 && i >= page - 2; i--) {
      paging.unshift(i);
    }
  }
  if (page < pages) {
    for (i = page + 1; i <= pages && i <= page + 2; i++) {
      paging.push(i);
    }
    // console.log('paging: ', paging);
  }
  showPaginator(paging, page, pages);
};
