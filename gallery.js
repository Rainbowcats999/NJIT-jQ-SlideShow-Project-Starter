let mCurrentIndex = 0; // Tracks the current image index
let mImages = []; // Array to hold images from JSON
const mUrl = 'images.json'; // Local JSON file
const mWaitTime = 5000; // Slideshow interval in ms
let slideshowTimer;

$(document).ready(() => {
  $('.details').hide(); // Hide details initially

  // Event handlers
  $('.moreIndicator').click(() => {
    $('.details').slideToggle(); // Toggle metadata
    $('.moreIndicator').toggleClass('rot90 rot270'); // Rotate icon
  });

  $('#nextPhoto').click(showNextPhoto);
  $('#prevPhoto').click(showPrevPhoto);

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
  $('.location').text('Location: ' + img.imgbreed); // updated key
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

