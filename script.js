/***** SCROLL & HOVER EFFECTS *****/
// Set spacer height for extra scroll space
const spacer = document.querySelector('.scroll-spacer');
spacer.style.height = window.innerHeight * 2 + "px";

// Get element references for scroll/hover effects
const coverWrapper = document.getElementById('cover-wrapper');
const textSection = document.getElementById('text-section');
const externalLinks = document.querySelectorAll('.external-link');
const mainTitle = document.getElementById('main-title');
const subTitle = document.getElementById('sub-title');
const bgImage = document.getElementById('bg-image');
const coverImage = document.getElementById('cover-image');

window.addEventListener('scroll', () => {
  // Calculate progress: 0 at top, 1 after one viewport height
  const progress = Math.min(window.scrollY / window.innerHeight, 1);

  // Slide the cover wrapper upward (from translateY(100%) to 0%)
  coverWrapper.style.transform = `translateY(${(1 - progress) * 100}%)`;

  // Fade in text inside cover wrapper starting at progress 0.3
  let textOpacity = 0;
  if (progress > 0.3) {
    textOpacity = Math.min((progress - 0.3) / (1 - 0.3), 1);
  }
  textSection.style.opacity = textOpacity;

  // Hide external links completely after 50% scroll; show with fade when scrolling back up
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

  // Change overlay title color: white until scrolled past half viewport, then red
  if (window.scrollY > window.innerHeight / 2) {
    mainTitle.style.color = '#F42424';
    subTitle.style.color = '#F42424';
  } else {
    mainTitle.style.color = 'white';
    subTitle.style.color = 'white';
  }
});

// Add hover listeners to all elements with the "hover-dim" class to dim images
const hoverElements = document.querySelectorAll('.hover-dim');
hoverElements.forEach(el => {
  el.addEventListener('mouseover', () => {
    bgImage.style.opacity = '0.8';
    coverImage.style.opacity = '0.8';
  });
  el.addEventListener('mouseout', () => {
    bgImage.style.opacity = '1';
    coverImage.style.opacity = '1';
  });
});

/***** CUSTOM CURSOR CODE *****/
const customCursor = document.getElementById('custom-cursor');
// Array of 7 words for the custom cursor
const words = ["When", "I", "Had", "A", "Flash", "Of", "Inspiration"];
let currentIndex = 0;

// Define threshold for hiding custom cursor near bottom (e.g., bottom 100px)
const hideThreshold = window.innerHeight - 100;
// Flag to prevent rapid switching during transition
let transitioning = false;

window.addEventListener('mousemove', (e) => {
  // Position custom cursor offset from pointer
  customCursor.style.left = (e.clientX + 15) + "px";
  customCursor.style.top = (e.clientY + 15) + "px";

  // Hide custom cursor when near bottom
  if (e.clientY > hideThreshold) {
    customCursor.style.opacity = 0;
  } else {
    if (!customCursor.classList.contains('blue-cursor') &&
        !customCursor.classList.contains('circle-cursor')) {
      customCursor.style.opacity = 1;
    }
  }

  // Determine vertical segment (0 to 6) based on x-coordinate
  const segmentWidth = window.innerWidth / 7;
  const newIndex = Math.floor(e.clientX / segmentWidth);

  // If segment changes and not already transitioning (and not in blue/circle mode), fade text change
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

// For clickable elements (anchor tags), override custom cursor to blue dot (using original blue #A1E1F1)
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

// For non-clickable text hover (.hover-dim elements), change custom cursor to white circle
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