/***** SCROLL & HOVER EFFECTS *****/
const spacer = document.querySelector('.scroll-spacer');
spacer.style.height = window.innerHeight * 2 + "px";

const externalLinks = document.querySelectorAll('.external-link');
window.addEventListener('scroll', () => {
  const progress = Math.min(window.scrollY / window.innerHeight, 1);
  externalLinks.forEach(link => {
    if (progress >= 0.5) {
      link.style.display = 'none';
    } else {
      link.style.display = 'block';
      link.style.opacity = 1 - (progress * 2);
    }
  });
});

/***** CUSTOM CURSOR CODE *****/
const customCursor = document.getElementById('custom-cursor');
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
    if (!customCursor.classList.contains('blue-cursor') && !customCursor.classList.contains('circle-cursor')) {
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

/***** CAPTION TOGGLE BASED ON MOUSE POSITION *****/
const leftImages = document.querySelectorAll('.left-column .hover-dim');
const captionContainer = document.getElementById('project-caption');
leftImages.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (captionContainer) captionContainer.classList.add('hover-active');
  });
  el.addEventListener('mouseleave', () => {
    if (captionContainer) captionContainer.classList.remove('hover-active');
  });
});

/***** PROJECT GRID TOGGLE (No Click Zoom) *****/
const projectMain = document.getElementById('project-main');
const projectGrid = document.getElementById('project-grid');
if (projectMain) {
  projectMain.addEventListener('click', (e) => {
    projectGrid.classList.toggle('active');
    e.stopPropagation();
  });
}
document.addEventListener('click', (e) => {
  if (projectGrid && projectGrid.classList.contains('active') &&
      !e.target.closest('#project-main') &&
      !e.target.closest('#project-grid')) {
    projectGrid.classList.remove('active');
  }
});