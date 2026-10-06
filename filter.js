/**
 * blogT - Curated Stories Category Filter
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterChips = document.querySelectorAll('.filter-chip');
  const storyCards = document.querySelectorAll('.story-card');

  if (!filterChips.length || !storyCards.length) return;

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Toggle active chip
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const selectedCategory = chip.getAttribute('data-filter');

      storyCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
});
