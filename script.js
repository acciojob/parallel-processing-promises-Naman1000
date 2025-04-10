//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to return a Promise that resolves if image loads successfully
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img); // success
    img.onerror = () => reject(`Failed to load image: ${url}`); // failure
  });
}

// Main function triggered on button click
function downloadImages() {
  // Clear previous content
  output.innerHTML = "";
  error.innerHTML = "";

  // Show loading spinner
  loading.style.display = "block";

  // Create promises for each image
  const downloadPromises = images.map(image => downloadImage(image.url));

  // Use Promise.all to download all in parallel
  Promise.all(downloadPromises)
    .then(imgElements => {
      // Hide loading
      loading.style.display = "none";

      // Append images to output div
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(errMsg => {
      // Hide loading and show error
      loading.style.display = "none";
      error.textContent = errMsg;
    });
}

// Button click listener
btn.addEventListener("click", downloadImages);
