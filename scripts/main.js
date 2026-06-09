import { degree, projects, techStack } from "../data/data.js";

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

const _skillContainerElem = document.querySelector(".content-layout-container");

if (_skillContainerElem) {
	_skillContainerElem.innerHTML = "";

	techStack.forEach((skill) => {
		const { id, type, image, skills } = skill;

		const skillsListHTML = skills
			.map(
				(skillname) =>
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

const projectElem = document.querySelector(".projects-grid");
if (projectElem) {
	projectElem.innerHTML = "";

	projects.forEach((project) => {
		const { id, name, image, paragraph, techUsed, viewCode, liveDemo } =
			project;

		const techUsedHTML = techUsed
			.map((tech) => `<span>${tech}</span>`)
			.join("");

		const _projectHTML = `          <div class="project-card" data-id="${id}">
            <div class="project-img">
              <img
                src="${image || "./assets/default-project.svg"}"
                alt="${name}"
              />
            </div>
            <h3>${name}</h3>
            <p>${paragraph}</p>
            <div class="project-tech">
              ${techUsedHTML}
            </div>
            <div class="project-links">
              <a
                href="${viewCode || "#"}"
                class="gradient-underline"
                >View Code</a
              >
              <a
                href="${liveDemo || "#"}"
                class="gradient-underline"
                >Live Demo</a
              >
            </div>
          </div>`;

		projectElem.innerHTML += _projectHTML;
	});
}

const _eduElem = document.querySelector(".edu-grid");

if (_eduElem) {
	_eduElem.innerHTML = "";

	degree.forEach((passout) => {
		const {
			id,
			category,
			courseName,
			schoolName,
			schoolAddnDuration,
			major,
			focusedOn,
			schoolPara,
		} = passout;

		const tagColorClass =
			category === "HIGH SCHOOL" ? "edu-tag--purple" : "edu-tag--orange";

		const _focusedOnHTML = focusedOn
			.map((focus) => `<span class="edu-tag ${tagColorClass}">${focus}</span>`)
			.join("");

		const majorHTML = major
			? `<p class="edu-card__major">Major: <span>${major}</span></p>`
			: "";

		const eduHTML = `
      <div class="edu-card" data-id="${id}">
        <div class="edu-card__content">
          <span class="edu-card__level">${category}</span>
          <h2 class="edu-card__title">${courseName}</h2>
          <p class="edu-card__institution">${schoolName}</p>
          <p class="edu-card__meta">${schoolAddnDuration}</p>
          ${majorHTML}

          <h3 class="edu-card__subtitle">Focused On:</h3>
          <div class="edu-card__tags">
            ${_focusedOnHTML}
          </div>
        </div>
        <div class="edu-card__sidebar">
          <p class="edu-card__description">
            ${schoolPara}
          </p>
        </div>
      </div>
    `;

		_eduElem.innerHTML += eduHTML;
	});
}
