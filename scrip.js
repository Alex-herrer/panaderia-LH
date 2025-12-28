document.addEventListener("DOMContentLoaded", () => {

  const imgs = document.querySelectorAll(".header-slider ul img");
  const prevBtn = document.querySelector(".control_prev");
  const nextBtn = document.querySelector(".control_next");
  let index = 0;
  let autoSlide;

  function showSlide() {
    imgs.forEach(img => img.style.display = "none");
    imgs[index].style.display = "block";
  }

  function nextSlide() {
    index = (index + 1) % imgs.length;
    showSlide();
  }

  function prevSlide() {
    index = index > 0 ? index - 1 : imgs.length - 1;
    showSlide();
  }

  if (imgs.length > 0) {
    showSlide();
    autoSlide = setInterval(nextSlide, 3000);

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        clearInterval(autoSlide);
        nextSlide();
        autoSlide = setInterval(nextSlide, 3000);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        clearInterval(autoSlide);
        prevSlide();
        autoSlide = setInterval(nextSlide, 3000);
      });
    }
  }

  const scrollContainers = document.querySelectorAll(".products");

  scrollContainers.forEach(container => {
    container.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 1.5;
      },
      { passive: false }
    );
  });

  const pastel = document.getElementById("pasteles");
  if (pastel) {
    pastel.addEventListener("click", () => {
      alert("Contáctenos para decoración y el tipo de pastel que necesite 🍰");
    });
  }

  const buscador = document.getElementById("buscador");

  const rutas = {
    "coca cola": "gaseosa.html",
    "coca": "gaseosa.html",
    "pepsi": "gaseosa.html",

    "refresco": "naturales.html",
    "cacao": "naturales.html",
    "chia": "naturales.html",

    "cafe": "cafe.html",
    "capuccino": "cafe.html",

    "pan": "panes.html",
    "pan dulce": "panes.html",

    "pastel": "pasteles.html",
    "torta": "panes.html"
  };

  if (buscador) {
    buscador.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const texto = buscador.value.toLowerCase().trim();

        for (let palabra in rutas) {
          if (texto.includes(palabra)) {
            window.location.href = rutas[palabra];
            return;
          }
        }

        alert("No se encontraron resultados 😕");
      }
    });
  }

});
