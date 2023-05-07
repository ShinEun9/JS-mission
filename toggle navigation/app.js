// do something!
const toggleBtn = document.querySelector(".toggle");
const nav = document.querySelector("nav");
const body = document.body;

window.addEventListener("load", () => {
  body.classList.remove("preload");
});

toggleBtn.addEventListener("click", (event) => {
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
    localStorage.setItem("open", true);
  } else {
    nav.classList.add("active");
    localStorage.setItem("open", false);
  }
});

function initialize() {
  const lsOpen = JSON.parse(localStorage.getItem("open"));
  if (lsOpen) {
    // lsOpen이 true인 상태이면
    nav.classList.remove("active");
  } else {
    // lsOpen이 false이거나 null이면
    nav.classList.add("active");
  }
  body.style.setProperty("visibility", "initial");
}

initialize();
