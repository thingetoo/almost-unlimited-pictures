const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false; // allows us to be more specific when loading photos
let imagesLoaded = 0;
let totalImages = 0; // to know when its done loading
let photosArray = [];

// Unsplash API

let countToLoad = 5; // initial value set incase of slow browsers
const apiKey = "KBwlnj2Z2tlnRhN4uwKilcwjn_EAz0zl1o-Ejd7pot4";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    // page is ready - all images have leaded
    ready = true;
    loader.hidden = true;
    countToLoad = 30; // updated count once all of the images have loaded
  }
}

// Helper function to set attributes on dom element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos and add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> element to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank')
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //Create image for photo
    const img = document.createElement("img");
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description)
    // img.setAttribute('title', photo.alt_description)
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener - check when each is finished loading
    img.addEventListener("load", imageLoaded());
    //Put image inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API

async function getPhotos() {
  const proxyUrl = "";
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

//Check if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
