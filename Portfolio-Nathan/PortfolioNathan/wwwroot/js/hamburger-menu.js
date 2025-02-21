//change icon and show/hide menu

const hamburgerIcon = document.getElementById("hamburger-icon");
const navbar = document.querySelector(".navbar");

function toggleMenu() {
  if (hamburgerIcon.classList.contains("bx-menu-alt-right")) {
    hamburgerIcon.classList.remove("bx-menu-alt-right");
    hamburgerIcon.classList.add("bx-x");
  } else {
    hamburgerIcon.classList.remove("bx-x");
    hamburgerIcon.classList.add("bx-menu-alt-right");
  }
  navbar.classList.toggle("active");
}
