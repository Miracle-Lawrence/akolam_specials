const carousel = document.getElementById("meal-carousel");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const carouselContainer = document.querySelector(".carousel-container");

let meals = [];
let currentIndex = 0;

// Check if meals exist in localStorage
const storedMeals = localStorage.getItem("mealsData");

if (storedMeals) {
  meals = JSON.parse(storedMeals);
  renderMeals();
  updateCarousel();
  startAutoplay();
} else {
  // Fetch and store in localStorage if not found
  fetch("data/meals.json")
    .then((response) => response.json())
    .then((data) => {
      meals = data.meals.slice(0, 10);
      localStorage.setItem("mealsData", JSON.stringify(meals));
      renderMeals();
      updateCarousel();
      startAutoplay();
    })
    .catch((error) => console.error("Error loading meals:", error));
}

function renderMeals() {
  carousel.innerHTML = "";

  meals.forEach((meal) => {
    const mealItem = document.createElement("div");
    mealItem.classList.add("carousel-item");

    mealItem.innerHTML = `
      <img src="${meal.image}" alt="${meal.name}" loading="lazy">
      <h3>${meal.name}</h3>
      <p><strong>${meal.price}</strong></p>
    `;

    carousel.appendChild(mealItem);
  });
}

function updateCarousel() {
  const screenWidth = window.innerWidth;
  const itemsPerPage = screenWidth >= 1024 ? 3 : 1;
  const itemWidthPercent = 100 / itemsPerPage;
  const offset = currentIndex * itemWidthPercent;
  carousel.style.transform = `translateX(-${offset}%)`;
}

let autoplayInterval;

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    const itemsPerPage = window.innerWidth >= 1024 ? 3 : 1;
    const maxIndex = meals.length - itemsPerPage;

    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
  }, 4000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

carouselContainer.addEventListener("mouseenter", stopAutoplay);
carouselContainer.addEventListener("mouseleave", startAutoplay);

nextBtn.addEventListener("click", () => {
  const itemsPerPage = window.innerWidth >= 1024 ? 3 : 1;
  const maxIndex = meals.length - itemsPerPage;

  currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  const itemsPerPage = window.innerWidth >= 1024 ? 3 : 1;
  const maxIndex = meals.length - itemsPerPage;

  currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);
