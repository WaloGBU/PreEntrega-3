const productos = [
    { id: 01, marca: "Fender", modelo: "Stratocaster", precio: 5000, cantidad: 1, img: "./img/FenderStratocaster.png" },
    { id: 02, marca: "Fender", modelo: "Telecaster", precio: 4500, cantidad: 1, img: "./img/FenderTelecaster.png" },
    { id: 03, marca: "Gibson", modelo: "Les Paul Standard", precio: 5500, cantidad: 1, img: "./img/GibsonLesPaul.jpg" },
    { id: 04, marca: "Gibson", modelo: "SG Standard", precio: 4800, cantidad: 1, img: "./img/GibsonSGStandard.jpg" },
    { id: 05, marca: "Ibanez", modelo: "Steve Vai Edition", precio: 6000, cantidad: 1, img: "./img/IbanezSteveVai.png" },
    { id: 06, marca: "Paul Red Smith", modelo: "Mark Holcomb", precio: 6500, cantidad: 1, img: "./img/PRSMarkHolcomb.png" },
    { id: 07, marca: "LTD", modelo: "EX200", precio: 3500, cantidad: 1, img: "./img/LTDEX200.png" }
]

const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class="modal-header-title">Carrito.</h1>`;
    modalContainer.append(modalHeader);
  
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";
  
    modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });
  
    modalHeader.append(modalbutton);
  
    carrito.forEach((product) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML = `
          <img src="${product.img}">
          <h3>${product.nombre}</h3>
          <h3>${product.modelo}</h3>
          <p>${product.precio} $</p>
          <span class="restar"> - </span>
          <p>${product.cantidad}</p>
          <span class="sumar"> + </span>
          <p>Total: ${product.cantidad * product.precio} $</p>
          <span class="delete-product"> ❌ </span>
        `;
  
      modalContainer.append(carritoContent);
  
      let restar = carritoContent.querySelector(".restar");
  
      restar.addEventListener("click", () => {
        if (product.cantidad !== 1) {
          product.cantidad--;
        }
        saveLocal();
        pintarCarrito();
      });
  
      let sumar = carritoContent.querySelector(".sumar");
      sumar.addEventListener("click", () => {
        product.cantidad++;
        saveLocal();
        pintarCarrito();
      });
  
      let eliminar = carritoContent.querySelector(".delete-product");
  
      eliminar.addEventListener("click", () => {
        eliminarProducto(product.id);
      });
  
    });
  
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  
    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: ${total} $`;
    modalContainer.append(totalBuying);
  };
  
  verCarrito.addEventListener("click", pintarCarrito);
  
  const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
  
    console.log(foundId);
  
    carrito = carrito.filter((carritoId) => {
      return carritoId !== foundId;
    });
  
    carritoCounter();
    saveLocal();
    pintarCarrito();
  };
  
  const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
  
    const carritoLength = carrito.length;
  
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
  };
  
  carritoCounter();
  