import {
  fetchImages,
  incrementPage,
  resetPage,
  getCurrentQuery,
  getCurrentPage,
  perPage,
} from './js/pixabay-api.js';
import {
  renderGallery,
  showLoader,
  hideLoader,
  showError,
} from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('search-form');
  const gallery = document.querySelector('.gallery');
  const loadMoreBtn = document.querySelector('.load-more');

  let totalPages = 0;

  function smoothScrollByCardHeights(multiplier = 2) {
    const firstCard = document.querySelector('.gallery .photo-card');
    if (!firstCard) return;
    const { height } = firstCard.getBoundingClientRect();
    window.scrollBy({
      top: height * multiplier,
      behavior: 'smooth',
    });
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = form.querySelector('input[name="searchQuery"]').value.trim();

    if (query === '') {
      showError('Please enter a search query.');
      return;
    }

    showLoader();
    resetPage();
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';

    try {
      const data = await fetchImages(query);
      hideLoader();

      if (data.totalHits > 0) {
        renderGallery(data.hits);

        totalPages = Math.ceil(data.totalHits / perPage);

        if (data.totalHits % perPage === 0) {
          totalPages -= 1;
        }

        if (totalPages > 1) {
          loadMoreBtn.style.display = 'block';
        }
      } else {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
    } catch (error) {
      hideLoader();
      showError('An error occurred while fetching images.');
    } finally {
      form.reset();
    }
  });

  loadMoreBtn.addEventListener('click', async function () {
    const currentPage = getCurrentPage();

    if (currentPage >= totalPages) {
      loadMoreBtn.style.display = 'none';
      showError("We're sorry, but you've reached the end of search results.");
      return;
    }

    incrementPage();
    showLoader();
    loadMoreBtn.style.display = 'none';

    try {
      const data = await fetchImages(getCurrentQuery(), currentPage + 1);
      hideLoader();
      renderGallery(data.hits);

      smoothScrollByCardHeights();

      if (currentPage + 1 >= totalPages) {
        loadMoreBtn.style.display = 'none';
        showError("We're sorry, but you've reached the end of search results.");
      } else {
        loadMoreBtn.style.display = 'block';
      }
    } catch (error) {
      hideLoader();
      loadMoreBtn.style.display = 'block';
      showError('An error occurred while fetching more images.');
    }
  });
});
