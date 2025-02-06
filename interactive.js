/***** SCROLL & HOVER EFFECTS *****/
// Set spacer height for extra scroll space
const spacer = document.querySelector('.scroll-spacer');
spacer.style.height = window.innerHeight * 2 + "px";

// External links behavior on scroll
const externalLinks = document.querySelectorAll('.external-link');
window.addEventListener('scroll', () => {
  const progress = Math.min(window.scrollY / window.innerHeight, 1);
  if (progress >= 0.5) {
    externalLinks.forEach(link => {
      link.style.display = 'none';
    });
  } else {
    externalLinks.forEach(link => {
      link.style.display = 'block';
      link.style.opacity = 1 - (progress * 2);
    });
  }
});

/***** CUSTOM CURSOR CODE *****/
const customCursor = document.getElementById('custom-cursor');
// Array of 7 words for the custom cursor
const words = ["When", "I", "Had", "A", "Flash", "Of", "Inspiration"];
let currentIndex = 0;
const hideThreshold = window.innerHeight - 100;
let transitioning = false;

window.addEventListener('mousemove', (e) => {
  customCursor.style.left = (e.clientX + 15) + "px";
  customCursor.style.top = (e.clientY + 15) + "px";
  
  if (e.clientY > hideThreshold) {
    customCursor.style.opacity = 0;
  } else {
    if (!customCursor.classList.contains('blue-cursor') &&
        !customCursor.classList.contains('circle-cursor')) {
      customCursor.style.opacity = 1;
    }
  }
  
  const segmentWidth = window.innerWidth / 7;
  const newIndex = Math.floor(e.clientX / segmentWidth);
  
  if (newIndex !== currentIndex && !transitioning &&
      !customCursor.classList.contains('blue-cursor') &&
      !customCursor.classList.contains('circle-cursor')) {
    transitioning = true;
    customCursor.style.transition = "opacity 0.5s ease, transform 0.3s ease";
    customCursor.style.opacity = 0;
    setTimeout(() => {
      currentIndex = newIndex;
      customCursor.textContent = words[newIndex] || "";
      customCursor.style.opacity = 1;
      transitioning = false;
    }, 500);
  }
});

const clickableElements = document.querySelectorAll('a');
clickableElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    customCursor.classList.remove('circle-cursor');
    customCursor.classList.add('blue-cursor');
  });
  el.addEventListener('mouseleave', () => {
    customCursor.classList.remove('blue-cursor');
  });
});

const hoverElements = document.querySelectorAll('.hover-dim');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (!customCursor.classList.contains('blue-cursor')) {
      customCursor.classList.add('circle-cursor');
    }
  });
  el.addEventListener('mouseleave', () => {
    customCursor.classList.remove('circle-cursor');
    customCursor.textContent = words[currentIndex] || "";
  });
});