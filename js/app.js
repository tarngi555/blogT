/**
 * blogT - Main Application Controller
 * Short-minute blog for Thai products, lifestyle & tips for expats/tourists
 */

// Toast notification helper
function showToast(message, icon = '✦') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${message}</span>
  `;
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Shadow
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
      mobileMenuBtn.innerHTML = isExpanded 
        ? `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    });

    // Close menu when clicking links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Search & Quick Reader Modal
  const searchTriggers = document.querySelectorAll('[data-action="open-search"]');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('modal-search-input');
  const searchResults = document.getElementById('modal-search-results');

  function openSearch() {
    searchModal?.classList.add('active');
    searchInput?.focus();
  }

  function closeSearch() {
    searchModal?.classList.remove('active');
    if (searchInput) searchInput.value = '';
    filterSearchResults('');
  }

  searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));
  searchClose?.addEventListener('click', closeSearch);

  searchModal?.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  // Keyboard shortcut ⌘K or Ctrl+K / Escape
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && searchModal?.classList.contains('active')) {
      closeSearch();
    }
  });

  // Modal Search Filter
  function filterSearchResults(query) {
    if (!searchResults) return;
    const items = searchResults.querySelectorAll('.modal-result-item');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query.toLowerCase())) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  searchInput?.addEventListener('input', (e) => {
    filterSearchResults(e.target.value);
  });

  // Clicking a search result navigates to article
  searchResults?.querySelectorAll('.modal-result-item').forEach(item => {
    item.addEventListener('click', () => {
      const link = item.getAttribute('data-href') || 'wooden-palm-massager.html';
      closeSearch();
      window.location.href = link;
    });
  });

  // 4. Story Cards Navigation
  document.querySelectorAll('.story-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // If clicked an explicit link or button inside, allow default
      const link = card.getAttribute('data-href') || 'wooden-palm-massager.html';
      window.location.href = link;
    });
  });

  // 5. Newsletter Form Handling
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`Subscribed! You'll receive our weekly 2-minute Thai lifestyle dispatches at ${input.value}`, '🇹🇭');
        input.value = '';
      }
    });
  }

  // 6. Sharing & Bookmark Actions
  document.querySelectorAll('[data-action="copy-link"], [data-action="share-article"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      showToast('Article link copied to clipboard!', '🔗');
    });
  });

  document.querySelectorAll('[data-action="bookmark"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Saved to your reading list!', '🔖');
    });
  });
});
