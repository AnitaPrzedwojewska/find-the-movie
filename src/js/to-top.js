import { toTopEl } from "./refs";

const isScrollNeeded = window.innerHeight * 1.5;

export function hideShowScrollToTop() {
  if (window.scrollY > isScrollNeeded) {
    toTopEl.classList.remove('is-hidden');
    toTopBtn.addEventListener('click', scrollToTop);
  } else {
    toTopEl.classList.add('is-hidden');
    toTopBtn.removeEventListener('click', scrollToTop);
  }
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
