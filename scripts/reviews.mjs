// scripts/reviews.mjs
async function loadReviews() {
  const testimonialEl = document.getElementById("testimonial");

  try {
    const response = await fetch("data/reviews.json");
    const data = await response.json();
    const reviews = data.reviews;

    if (Array.isArray(reviews) && reviews.length > 0) {
      showRandomReview(reviews, testimonialEl);
      setInterval(() => showRandomReview(reviews, testimonialEl), 5000);
      setupDialog(reviews);
    } else {
      testimonialEl.textContent = "No reviews available at the moment.";
    }
  } catch (error) {
    testimonialEl.textContent = "Unable to load reviews at this time.";
    console.error("Error loading reviews:", error);
  }
}

function showRandomReview(reviews, testimonialEl) {
  const randomIndex = Math.floor(Math.random() * reviews.length);
  testimonialEl.textContent = reviews[randomIndex];
}

function setupDialog(reviews) {
  const dialog = document.getElementById("reviews-dialog");
  const seeMoreBtn = document.getElementById("see-more-reviews");
  const reviewsList = document.getElementById("all-reviews-list");
  const closeBtn = document.getElementById("close-dialog");

  // Fill list
  reviewsList.innerHTML = reviews.map((r) => `<li>${r}</li>`).join("");

  // Open dialog
  seeMoreBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  // Close dialog
  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
}



export { loadReviews };
