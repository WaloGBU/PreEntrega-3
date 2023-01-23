const productos = [
    { id: 01, categoria: "Guitarra Electrica", marca: "Fender", modelo: "Stratocaster", precio: 5000, cantidad: 1, img: "./img/FenderStratocaster.png" },
    { id: 02, categoria: "Guitarra Electrica", marca: "Fender", modelo: "Telecaster", precio: 4500, cantidad: 1, img: "./img/FenderTelecaster.png" },
    { id: 03, categoria: "Guitarra lectrica", marca: "Gibson", modelo: "Les Paul Standard", precio: 5500, cantidad: 1, img: "./img/GibsonLesPaul.jpg" },
    { id: 04, categoria: "Guitarra Electrica", marca: "Gibson", modelo: "SG Standard", precio: 4800, cantidad: 1, img: "./img/GibsonSGStandard.jpg" },
    { id: 05, categoria: "Guitarra Electrica", marca: "Ibanez", modelo: "Steve Vai Edition", precio: 6000, cantidad: 1, img: "./img/IbanezSteveVai.png" },
    { id: 06, categoria: "Guitarra Electrica", marca: "Paul Red Smith", modelo: "Mark Holcomb", precio: 6500, cantidad: 1, img: "./img/PRSMarkHolcomb.png" },
    { id: 07, categoria: "Guitarra Electrica", marca: "LTD", modelo: "EX200", precio: 3500, cantidad: 1, img: "./img/LTDEX200.png" },
    { id: 08, categoria: "Guitarra Acustica", marca: "Epiphone", modelo: "AJ-220S", precio: 2500, cantidad: 1, img: "./img/EpiphoneAJ-220S.jpg" },
    { id: 09, categoria: "Guitarra Acustica", marca: "Fender", modelo: "FA-125", precio: 3000, cantidad: 1, img: "./img/FenderFA125.png" },
    { id: 10, categoria: "Guitarra Acustica", marca: "Guild", modelo: "D-40", precio: 4000, cantidad: 1, img: "./img/GuildD40.jpg" },
    { id: 11, categoria: "Bajo", marca: "Fender", modelo: "Jazz Bass", precio: 6000, cantidad: 1, img: "./img/FenderJazzBass.png" },
    { id: 12, categoria: "Bajo", marca: "Fender", modelo: "Precision Bass", precio: 3500, cantidad: 1, img: "./img/FenderPrecisionBass.png" }
]

const pintarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `<h1 class="modal-header-title">Carrito</h1>`
    modalContainer.append(modalHeader)
  
    const modalbutton = document.createElement("h1")
    modalbutton.innerText = "x"
    modalbutton.className = "modal-header-button"
  
    modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none"
    })
  
    modalHeader.append(modalbutton)
  
    carrito.forEach((product) => {
      let carritoContent = document.createElement("div")
      carritoContent.className = "modal-content"
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
        `
  
      modalContainer.append(carritoContent)
  
      let restar = carritoContent.querySelector(".restar")
  
      restar.addEventListener("click", () => {
        if (product.cantidad !== 1) {
          product.cantidad--
        }
        saveLocal()
        pintarCarrito()
      });
  
      let sumar = carritoContent.querySelector(".sumar")
      sumar.addEventListener("click", () => {
        product.cantidad++
        saveLocal()
        pintarCarrito()
      })
  
      let eliminar = carritoContent.querySelector(".delete-product");
  
      eliminar.addEventListener("click", () => {
        eliminarProducto(product.id)
      });
  
    });
  
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)
  
    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `Total a pagar: ${total} $`
    modalContainer.append(totalBuying)

    const boton = document.createElement("button")
    boton.className = "boton"
    boton.innerHTML = "<button>Comprar</button>"
    modalContainer.append(boton)

    boton.addEventListener("click", () => {
    Swal.fire({
      title: '¿Está seguro que desea confirmar la compra?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero comprar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Gracias por su compra',
          'Ha adquirido los productos exitosamente',
          'success'
        )
      }
    })
  })
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
  