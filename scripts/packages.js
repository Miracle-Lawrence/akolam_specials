fetch("data/packages.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("packages-container");

    data.packages.forEach((pkg) => {
      const card = document.createElement("div");
      card.classList.add("package-card");

      card.innerHTML = `
        <img src="${pkg.image}" alt="${pkg.name}" class="package-img">
        <h2>${pkg.name}</h2>
        <p class="price">₦${pkg.price}</p>
        <ul>
          ${pkg.meals.map((meal) => `<li>${meal}</li>`).join("")}
        </ul>
      `;

      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
