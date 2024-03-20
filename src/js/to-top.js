import { toTopEl } from "./refs";

const isScrollNeeded = window.innerHeight * 1.5;

// pokaż lub ukryj przycisk scrollowania do góry
export function toggleScrollToTop() {
  if (window.scrollY > isScrollNeeded) {
    toTopEl.classList.remove('hidden');
    toTopBtn.addEventListener('click', scrollToTop);
  } else {
    toTopEl.classList.add('hidden');
    toTopBtn.removeEventListener('click', scrollToTop);
  }
}

// scrolluj do góry
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
