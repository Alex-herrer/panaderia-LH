let carrito = [];
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
      alert("Contáctenos para decoración y el tipo de pastel que necesite");
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

        alert("No se encontraron resultados");
      }
    });
  }
  let guardado = localStorage.getItem("carrito");
  if (guardado) {
    carrito = JSON.parse(guardado);
    actualizarContador();
    actualizarTotal();
  }
  const productos = document.querySelectorAll(".producto");

productos.forEach(producto => {
  const id = producto.dataset.id;
  const span = producto.querySelector(".cantidad span");

  const encontrado = carrito.find(p => p.id === id);

  if (encontrado) {
    span.textContent = encontrado.cantidad;
  }
});

});

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
    let total = 0;
    for (let p of carrito) {
        total += p.cantidad;
    }
    document.getElementById("contador-carrito").textContent = total;
}

function actualizarTotal() {
    let total = 0;
    for (let p of carrito) {
        total += p.precio * p.cantidad;
    }
    document.getElementById("total-carrito").textContent = total.toFixed(2);
}

function sumar(boton) {
    let producto = boton.closest(".producto");

    let id = producto.dataset.id;
    let nombre = producto.dataset.nombre;
    let precio = parseFloat(producto.dataset.precio);

    let span = boton.previousElementSibling;
    let cantidad = parseInt(span.textContent) + 1;
    span.textContent = cantidad;

    let encontrado = carrito.find(p => p.id === id);

    if (encontrado) {
        encontrado.cantidad = cantidad;
    } else {
        carrito.push({ id, nombre, precio, cantidad });
    }

    guardarCarrito();
    actualizarContador();
    actualizarTotal();
}

function restar(boton) {
    let producto = boton.closest(".producto");
    let id = producto.dataset.id;

    let span = boton.nextElementSibling;
    let cantidad = parseInt(span.textContent);

    if (cantidad > 0) {
        cantidad--;
        span.textContent = cantidad;
    }

    let encontrado = carrito.find(p => p.id === id);

    if (encontrado) {
        encontrado.cantidad = cantidad;
        if (cantidad === 0) {
            carrito = carrito.filter(p => p.id !== id);
        }
    }

    guardarCarrito();
    actualizarContador();
    actualizarTotal();
}

const listaCarrito = document.getElementById("lista-carrito");
const totalFinal = document.getElementById("total-final");

if (listaCarrito && totalFinal) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;

    listaCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("item-carrito");

        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        div.innerHTML = `
            <h4>${producto.nombre}</h4>
            <p>Precio: C$ ${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p><strong>Subtotal: C$ ${subtotal.toFixed(2)}</strong></p>
        `;

        listaCarrito.appendChild(div);
    });

    totalFinal.textContent = total.toFixed(2);
}
