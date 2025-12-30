let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
  actualizarTotal();

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

    nextBtn?.addEventListener("click", () => {
      clearInterval(autoSlide);
      nextSlide();
    });

    prevBtn?.addEventListener("click", () => {
      clearInterval(autoSlide);
      prevSlide();
    });
  }

  document.querySelectorAll(".producto").forEach(producto => {
    const id = producto.dataset.id;
    const span = producto.querySelector(".cantidad span");
    const encontrado = carrito.find(p => p.id === id);
    if (encontrado) span.textContent = encontrado.cantidad;
  });

  renderCarrito();
});

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;
  contador.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
}

function actualizarTotal() {
  const totalSpan = document.getElementById("total-carrito");
  if (!totalSpan) return;
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  totalSpan.textContent = total.toFixed(2);
}

function sumar(btn) {
  const producto = btn.closest(".producto");
  const { id, nombre, precio } = producto.dataset;
  const span = btn.previousElementSibling;

  let item = carrito.find(p => p.id === id);

  if (item) {
    item.cantidad++;
    span.textContent = item.cantidad;
  } else {
    carrito.push({
      id,
      nombre,
      precio: parseFloat(precio),
      cantidad: 1
    });
    span.textContent = 1;
  }

  guardarCarrito();
  actualizarContador();
  actualizarTotal();
}

function restar(btn) {
  const producto = btn.closest(".producto");
  const id = producto.dataset.id;
  const span = btn.nextElementSibling;

  let item = carrito.find(p => p.id === id);
  if (!item) return;

  item.cantidad--;
  span.textContent = Math.max(item.cantidad, 0);

  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
    span.textContent = 0;
  }

  guardarCarrito();
  actualizarContador();
  actualizarTotal();
}

function renderCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalFinal = document.getElementById("total-final");
  if (!lista || !totalFinal) return;

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach(p => {
    const subtotal = p.precio * p.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "item-carrito";
    div.innerHTML = `
      <div>
        <h4>${p.nombre}</h4>
        <p>Precio: C$ ${p.precio}</p>
      </div>

      <div class="controles">
        <button onclick="cambiarCantidad('${p.id}', -1)">−</button>
        <span>${p.cantidad}</span>
        <button onclick="cambiarCantidad('${p.id}', 1)">+</button>
        <button class="btn-eliminar" onclick="eliminarProducto('${p.id}')">🗑</button>
      </div>
    `;
    lista.appendChild(div);
  });

  totalFinal.textContent = total.toFixed(2);
}

function cambiarCantidad(id, cambio) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;

  item.cantidad += cambio;

  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  guardarCarrito();
  actualizarContador();
  actualizarTotal();
  renderCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
  actualizarContador();
  actualizarTotal();
  renderCarrito();
}

function pagar() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  alert("✅ Pago realizado con éxito\n¡Gracias por su compra!");
  carrito = [];
  guardarCarrito();
  actualizarContador();
  actualizarTotal();
  renderCarrito();
}
