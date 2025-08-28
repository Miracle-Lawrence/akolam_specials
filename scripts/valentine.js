const container = document.getElementById("val-package-container");
const loading = document.getElementById("loading");
const buttons = document.querySelectorAll(".filters button");

let cachedPackages = [];

async function fetchPackages() {
  try {
    loading.style.display = "block";
    const res = await fetch("data/valentine.json");
    const data = await res.json();
    loading.style.display = "none";
    return data.packages;
  } catch (error) {
    console.error("Failed to load packages:", error);
    loading.textContent = "Failed to load packages. Please try again.";
    return [];
  }
}

function createPackageCard(pkg) {
  return `
    <div class="package-card">
      <img src="${pkg.image}" alt="${
    pkg.name
  }" onerror="this.src='images/default.jpg'" />
      <div class="package-content">
        <h3>${pkg.name}</h3>
        <p>${pkg.description}</p>
        <p class="package-price">${pkg.price}</p>
        <ul class="package-items">
          ${pkg.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

function renderPackages(packages, gender = "all") {
  const filtered =
    gender === "all" ? packages : packages.filter((p) => p.gender === gender);
  container.innerHTML = filtered.map(createPackageCard).join("");
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const gender = btn.dataset.gender;
    renderPackages(cachedPackages, gender);
  });
});

(async () => {
  cachedPackages = await fetchPackages();
  renderPackages(cachedPackages);
})();
