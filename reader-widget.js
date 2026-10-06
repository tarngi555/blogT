/**
 * blogT - Interactive Reading Canvas & Typography Studio Widget
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('reading-canvas');
  if (!canvas) return;

  const fontButtons = document.querySelectorAll('[data-font]');
  const themeButtons = document.querySelectorAll('[data-theme]');
  const sizeSlider = document.getElementById('font-size-slider');
  const sizeValue = document.getElementById('font-size-val');
  const lineHeightSlider = document.getElementById('line-height-slider');
  const lineHeightValue = document.getElementById('line-height-val');

  // Font Switcher
  fontButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      fontButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const font = btn.getAttribute('data-font');

      if (font === 'serif') {
        canvas.style.fontFamily = "var(--font-serif)";
      } else if (font === 'sans') {
        canvas.style.fontFamily = "var(--font-sans)";
      } else if (font === 'mono') {
        canvas.style.fontFamily = "var(--font-mono)";
      }
    });
  });

  // Theme / Background Switcher
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const theme = btn.getAttribute('data-theme');

      canvas.classList.remove('theme-cream', 'theme-ivory', 'theme-forest');
      canvas.classList.add(`theme-${theme}`);
    });
  });

  // Font Size Slider
  if (sizeSlider && sizeValue) {
    sizeSlider.addEventListener('input', (e) => {
      const size = e.target.value;
      sizeValue.textContent = `${size}px`;
      const paragraphs = canvas.querySelectorAll('.canvas-paragraph');
      paragraphs.forEach(p => {
        p.style.fontSize = `${size}px`;
      });
    });
  }

  // Line Height Slider
  if (lineHeightSlider && lineHeightValue) {
    lineHeightSlider.addEventListener('input', (e) => {
      const lh = (e.target.value / 10).toFixed(1);
      lineHeightValue.textContent = lh;
      const paragraphs = canvas.querySelectorAll('.canvas-paragraph');
      paragraphs.forEach(p => {
        p.style.lineHeight = lh;
      });
    });
  }
});
