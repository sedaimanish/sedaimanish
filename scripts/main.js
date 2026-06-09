import { techStack } from "../data/data.js";

// --- SCROLL OBSERVER ---
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

// --- DARK MODE ---
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

// --- NOW DYNAMIC HTML ---
const _skillContainerElem = document.querySelector(".content-layout-container");

if (_skillContainerElem) {
	_skillContainerElem.innerHTML = "";

	techStack.forEach((skill) => {
		const { id, type, image, skills } = skill;

		const skillsListHTML = skills
			.map(
				(skillname) =>
					// 2. FIXED: Changed the closing <li> tag from <li> to </li>
					`<li><a href="#" class="gradient-underline">${skillname}</a></li>`,
			)
			.join("");

		const skillHTML = `
      <div class="content-layout" data-id="${id}">
        <div class="skills-img-wrapper">
          <img src="${image || "./assets/"}" alt="${type} Icon" />
        </div>
        <h3>${type}</h3>
        <ul class="skills-list">
          ${skillsListHTML}
        </ul>
      </div>`;

		_skillContainerElem.innerHTML += skillHTML;
	});
}
