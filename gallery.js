let mCurrentIndex = 0; // Tracks the current image index
let mImages = []; // Array to hold images from JSON
const mUrl = 'images.json'; // Local JSON file
const mWaitTime = 1000; // Slideshow interval in ms
let slideshowTimer;

// Array of cat sounds
const catSounds = [
    'sounds/meow1.wav',
    'sounds/meow2.wav',
    'sounds/meow3.wav',
    'sounds/meow4.wav',
    'sounds/meow5.wav'
];

$(document).ready(() => {
  $('.details').hide(); // Hide details initially

  // More indicator toggle
  $('.moreIndicator').click(() => {
    $('.details').slideToggle();             
    $('.moreIndicator').toggleClass('rotRight rotDown'); // rotate arrow
  });

  // Navigation buttons
  $('#nextPhoto').click(showNextPhoto);
  $('#prevPhoto').click(showPrevPhoto);

  // Sound button click: play random meow
  $('#soundBtn').click(() => {
    const randomSound = catSounds[Math.floor(Math.random() * catSounds.length)];
    const catSound = document.getElementById('catSound');
    catSound.src = randomSound;
    catSound.currentTime = 0; // restart if already playing
    catSound.play();
  });

  // Load JSON data
  fetchJSON();
});

// Fetch JSON and populate mImages
function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images; // Store images
      swapPhoto(); // Show first image
      startTimer(); // Start automatic slideshow
    },
    error: function (err) {
      console.error('Failed to load JSON:', err);
    }
  });
}

// Display current photo and metadata
function swapPhoto() {
  let img = mImages[mCurrentIndex];
  $('#photo').attr('src', img.imgCat); // updated key
  $('.breed').text('Breed: ' + img.breed); // updated key
  $('.description').text('Description: ' + img.description);
  $('.date').text('Date: ' + img.date);
}

// Show next photo
function showNextPhoto() {
  mCurrentIndex++;
  if (mCurrentIndex >= mImages.length) mCurrentIndex = 0; // Loop back
  swapPhoto();
}

// Show previous photo
function showPrevPhoto() {
  mCurrentIndex--;
  if (mCurrentIndex < 0) mCurrentIndex = mImages.length - 1; // Loop to end
  swapPhoto();
}

// Automatic slideshow timer
function startTimer() {
  if (slideshowTimer) clearInterval(slideshowTimer); // Avoid duplicates
  slideshowTimer = setInterval(showNextPhoto, mWaitTime);
}


