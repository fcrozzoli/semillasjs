
const canastaLocalStorage = [];
const eliminarProducto = (producto) => {

    $(`#productoCanasta-${producto.id}`).remove();
    const index = canastaLocalStorage.findIndex(productoLocal => parseInt(producto.id) === parseInt(productoLocal.id));
    canastaLocalStorage.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(canastaLocalStorage));
    actualizarCarritoIcon();
    sumarCarrito();
}

const convertirPrecioANumero = (precio) => parseInt(precio.replaceAll(",", ""));

const numeroAComas = (total) => {
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const sumarCarrito = () => {
    let totalCanasta = 0;
    for (const producto of canastaLocalStorage) {
        totalCanasta = totalCanasta + (producto.precio * producto.cantidad);
    }

    $("#totalPagar").html(`$${numeroAComas(totalCanasta)}`);
    localStorage.setItem("totalAPagar", totalCanasta);
}

const actualizarCarritoIcon = () => {

    let totalCarrito = 0;
    for (const producto of canastaLocalStorage) {
        totalCarrito = totalCarrito + 1;
    }

    $("#iconCarrito").html(`${totalCarrito}`);
    $("#badgeCarrito").html(`${totalCarrito}`);

    localStorage.setItem("totalCarrito", totalCarrito);
}


$(".boton-canasta").on("click", function () {
    $("#contenedor-general-canasta").toggleClass("on");
});

/* Para agregar productos del contenedor a la canasta */
const insertarProductosACanasta = (producto) => {
    if ($(`#productoCanasta-${producto.id}`).length === 0) {
        if (!$("#contenedor-general-canasta").hasClass("on")) {
            $(".boton-canasta").trigger("click");
        }
        $('#listadoCarrito').append(`
        <li class="list-group-item d-flex justify-content-between lh-sm" id="productoCanasta-${producto.id}">
        <div>
            <h6 class="my-0">${producto.nombre}</h6>
            <b> Cantidad: <span id="producto-cantidad-${producto.id}">${producto.cantidad}</span></b>
        </div>
        <span class="text-muted">$${producto.precio}</span>
    </li>
        `)

        /* Para eliminar el producto de la canasta */
        $(`#productoCanasta-${producto.id}`).append(`
            <button id="btn-${producto.id}" type="button" class="btn btn-outline-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                </svg>
            </button>
        `);

        $(`#btn-${producto.id}`).on("click", function () {
            eliminarProducto(producto);
        });

        canastaLocalStorage.push(producto);

    } else {
        const nuevaCantidad = parseInt($(`#producto-cantidad-${producto.id}`).html()) + 1;
        const i = canastaLocalStorage.findIndex(p => parseInt(p.id) === parseInt(producto.id))
        canastaLocalStorage[i] = { ...canastaLocalStorage[i], cantidad: nuevaCantidad };
        $(`#producto-cantidad-${producto.id}`).html(nuevaCantidad)
    }
    localStorage.setItem("carrito", JSON.stringify(canastaLocalStorage));
    actualizarCarritoIcon();
    sumarCarrito();
}
