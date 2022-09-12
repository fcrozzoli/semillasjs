const URL = "json/productos.json"
jQuery(() => {
 // Recupero carrito en localstorage
    const productoLocalStorage = JSON.parse(localStorage.getItem("carrito"));

    const insertarProductos = () => {
        $.get(URL, (respuesta, estado) => {
            if (estado === "success") {
                for (const producto of respuesta) {
                    $('#divProductos').append(`
                    <div class="col mb-5" id="${producto.id}">
                    <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" src="${producto.imagen}" alt="..." />
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">${producto.nombre}</h5>
                            <!-- Product price-->
                            $${producto.precio}
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Añadir</a></div>
                    </div>
                    </div>`)

                    $(`#${producto.id}`).on("click", function () {
                        insertarProductosACanasta(producto);
                    });
                }
            }
        });
    }

    insertarProductos();

    if (productoLocalStorage !== null) {
        for (const producto of productoLocalStorage) {
            insertarProductosACanasta(producto);
        }
    }
});