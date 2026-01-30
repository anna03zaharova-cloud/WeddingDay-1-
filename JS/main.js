// ======= TIMER =======
const weddingDate = new Date("2026-08-08T16:00:00");

function updateTimer() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById("days").textContent = 0;
    document.getElementById("hours").textContent = 0;
    document.getElementById("minutes").textContent = 0;
    document.getElementById("seconds").textContent = 0;
    return;
  }

  document.getElementById("days").textContent = Math.floor(diff / 86400000);
  document.getElementById("hours").textContent = Math.floor(diff / 3600000) % 24;
  document.getElementById("minutes").textContent = Math.floor(diff / 60000) % 60;
  document.getElementById("seconds").textContent = Math.floor(diff / 1000) % 60;
}

// обновляем сразу и потом каждую секунду
updateTimer();
setInterval(updateTimer, 1000);


// ======= FADE ANIMATION =======
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // больше не следим за этим элементом
      }
    });
  },
  {
    threshold: 0.1, // срабатывает, когда 10% элемента видно
    rootMargin: "0px 0px -100px 0px" // чуть раньше перед скроллом
  }
);

// сразу показываем HERO
window.addEventListener("DOMContentLoaded", () => {
  const heroCard = document.querySelector(".hero__card");
  if (heroCard) heroCard.classList.add("show");

  // остальные fade элементы
  document.querySelectorAll(".fade").forEach(el => {
    if (el !== heroCard) observer.observe(el);
  });
});


// ======= GALLERY MODAL =======
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");

document.querySelectorAll(".gallery__grid img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

modal.addEventListener("click", () => {
  modal.style.display = "none";
});


// ======= OPTIONAL: плавное появление HERO текста =======
const heroTextElements = document.querySelectorAll(".hero__card *");
heroTextElements.forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});
