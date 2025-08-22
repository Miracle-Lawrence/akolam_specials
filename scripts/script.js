// ==== Set footer year and last modified ====
const currentYear = new Date().getFullYear();
const footer = document.querySelector("footer");

if (footer) {
  const paras = footer.querySelectorAll("p");
  if (paras.length >= 2) {
    paras[0].textContent = `© ${currentYear} | Akolam Specials`;
    paras[1].textContent = `Last Modified: ${document.lastModified}`;
  }
}

// ==== Navigation hamburger toggle ====
const navButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

if (navButton && navBar) {
  navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    navBar.classList.toggle("show");
  });
}
