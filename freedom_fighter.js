// Get required elements
const pics = document.getElementById("pics");
const favourites = document.getElementById("favourites");
const actions = document.getElementById("actions");
const message = document.getElementById("message");
const counter = document.getElementById("counter");

// Get all images in pics
const images = document.querySelectorAll("#pics img");

let totalImages = images.length;
let selectedCount = 0;

// Store original positions
images.forEach((img, index) => {
    img.dataset.index = index;

    // Tooltip from alt attribute
    img.title = img.alt;

    // Add click event
    img.addEventListener("click", moveToFavourites);
});

// ----------------------
// MOVE IMAGE TO FAVOURITES
// ----------------------
function moveToFavourites(e) {
    const img = e.target;

    // Prevent duplicate selection
    if (img.classList.contains("selected")) return;

    // Move image to favourites (rightmost end)
    favourites.appendChild(img);

    // Highlight image
    img.classList.add("selected");
    img.style.border = "3px solid green";

    // Update counter
    selectedCount++;

    // Add action log
    addAction(`Moved ${img.src} to favorites`);

    // Show selection message
    message.textContent = `Image selected as favorite number ${selectedCount}`;

    // Final message
    if (selectedCount === totalImages) {
        message.textContent = "All images have been selected!";
    }

    updateCounter();
}

// ----------------------
// REVERT IMAGE BACK
// ----------------------
favourites.addEventListener("click", function (e) {
    const img = e.target;

    // Only allow image clicks
    if (img.tagName !== "IMG") return;

    // Remove highlight
    img.classList.remove("selected");
    img.style.border = "";

    // Get original index
    const index = parseInt(img.dataset.index);

    // Insert back in correct position
    if (index >= pics.children.length) {
        pics.appendChild(img);
    } else {
        pics.insertBefore(img, pics.children[index]);
    }

    // Update counter
    selectedCount--;

    // Add action log
    addAction(`Reverted ${img.src} back to the main list`);

    updateCounter();
});

// ----------------------
// ACTION LIST FUNCTION
// ----------------------
function addAction(text) {
    const li = document.createElement("li");
    li.textContent = text;
    actions.appendChild(li);
}

// ----------------------
// COUNTER FUNCTION
// ----------------------
function updateCounter() {
    const remaining = totalImages - selectedCount;
    counter.textContent = `Remaining images: ${remaining}`;
}

// Initial counter display
updateCounter();