const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".icons-wrapper a");

let isClicking = false;

const observer = new IntersectionObserver(
  (entries) => {
    if (isClicking) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const top = entry.boundingClientRect.top;
        if (top >= 0 && top < window.innerHeight / 2) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const active = document.querySelector(
            `.icons-wrapper a[data-section="${entry.target.id}"]`,
          );
          if (active) active.classList.add("active");
        }
      }
    });
  },
  { threshold: [0, 0.1, 0.2, 0.5, 1] },
);

sections.forEach((section) => observer.observe(section));

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    isClicking = true;

    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    setTimeout(() => {
      isClicking = false;
    }, 1000);
  });
});

const darkBtn = document.querySelector(".dark-mode-wrapper");
const darkIcon = darkBtn.querySelector("img");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  darkIcon.src = "./assets/light-mode.svg";
}

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  darkIcon.src = isDark ? "./assets/light-mode.svg" : "./assets/dark.svg";
});
