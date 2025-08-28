const menuContainer = document.getElementById("menu-container");
const buttons = document.querySelectorAll("#category-tabs button");
const loading = document.getElementById("loading");

let cachedMeals = [];

// Normalize function (makes category strings comparable)
function normalizeCategory(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

async function fetchMeals() {
  try {
    loading.style.display = "block";
    const res = await fetch("data/menu.json");
    const data = await res.json();
    loading.style.display = "none";
    return data.menu;
  } catch (error) {
    console.error("Failed to load menu:", error);
    loading.textContent = "Failed to load menu. Please try again.";
    return [];
  }
}

function createMealItem(meal) {
  const whatsappText = encodeURIComponent(
    `Hello there, I'd like to get this: ${meal.name} - ${meal.price}`
  );
  const orderLink = `https://wa.me/2348067405845?text=${whatsappText}`;

  return `
    <div class="menu-item">
      <img src="${meal.image}" alt="${meal.name}" onerror="this.src='images/default-meal.jpg'" />
      <div class="menu-details">
        <h3>${meal.name}</h3>
        <p>${meal.description}</p>
        <p class="price">${meal.price}</p>
        <a href="${orderLink}" target="_blank" class="order-btn">Place Order</a>
      </div>
    </div>
  `;
}

function renderMeals(meals, category = "all") {
  const filtered =
    category === "all"
      ? meals
      : meals.filter((m) => normalizeCategory(m.category) === category);

  menuContainer.innerHTML = filtered.map(createMealItem).join("");

  if (!filtered.length) {
    menuContainer.innerHTML = `<p style="text-align:center;">No meals found in this category.</p>`;
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    if (!cachedMeals.length) {
      cachedMeals = await fetchMeals();
    }

    const category = btn.dataset.category;
    renderMeals(cachedMeals, category);
  });
});

// Initial load
(async () => {
  cachedMeals = await fetchMeals();
  renderMeals(cachedMeals);
})();
