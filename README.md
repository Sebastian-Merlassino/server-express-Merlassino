Descripción General

Este proyecto implementa un servidor basado en Node.js con Express, utilizando Handlebars como motor de plantillas y Socket.IO para la comunicación en tiempo real.

El objetivo principal es gestionar productos y reflejar los cambios en tiempo real en una vista web. Cada vez que se agrega o elimina un producto, la lista de productos se actualiza automáticamente en la interfaz, sin necesidad de recargar la página.

Tecnologías Utilizadas

Node.js

Express

Express Router

Handlebars

Socket.IO

File System (para persistencia en archivos .json)

Estructura del Proyecto
/data
  ├── products.json
  ├── carts.json
/src
  ├── managers
  │     ├── productManager.js
  │     └── cartManager.js
  ├── routes
  │     ├── products.routes.js
  │     └── carts.routes.js
  ├── views
  │     ├── home.handlebars
  │     ├── realTimeProducts.handlebars
  │     └── layouts
  │           └── main.handlebars
  ├── public
  │     └── js
  │           └── realtime.js
  └── app.js

Funcionalidades

1. Manejo de Productos (HTTP)

GET /api/products → Listar todos los productos.

GET /api/products/:pid → Obtener un producto específico por su ID.

POST /api/products → Agregar un nuevo producto.

PUT /api/products/:pid → Actualizar un producto existente.

DELETE /api/products/:pid → Eliminar un producto por su ID.

2. Manejo de Carritos (HTTP)

POST /api/carts → Crear un nuevo carrito.

GET /api/carts/:cid → Obtener todos los productos de un carrito.

POST /api/carts/:cid/product/:pid → Agregar un producto a un carrito.

3. Vistas con Handlebars

GET /home → Renderiza la lista de productos cargada desde el servidor (actualización solo con recarga de página).

GET /realtimeproducts → Renderiza la lista de productos con actualización automática vía WebSockets.

Persistencia de Datos

La información se almacena en los siguientes archivos JSON:

products.json: Lista de productos con los campos requeridos.

carts.json: Listado de carritos y productos asociados.

Pruebas en Postman

Obtener todos los productos

Método: GET

URL: http://localhost:8080/api/products

Obtener un producto específico

Método: GET

URL: http://localhost:8080/api/products/1

Agregar un producto

Método: POST

URL: http://localhost:8080/api/products

Body (JSON):

{
"title": "Casco de Seguridad Evolution",
"description": "Casco de protección industrial",
"code": "LIB-CAS-001",
"price": 4500,
"status": true,
"stock": 120,
"category": "Protección Cabeza",
"thumbnails": ["img/casco1.png"]
}

Actualizar un producto

Método: PUT

URL: http://localhost:8080/api/products/1

Body (JSON):

{
"price": 5000,
"stock": 100
}

Eliminar un producto

Método: DELETE

URL: http://localhost:8080/api/products/1

Crear un carrito

Método: POST

URL: http://localhost:8080/api/carts

Obtener productos de un carrito

Método: GET

URL: http://localhost:8080/api/carts/1

Agregar producto a un carrito

Método: POST

URL: http://localhost:8080/api/carts/1/product/2

Ejecución del Proyecto

Instalar dependencias:

npm install

Iniciar el servidor:

npm start

Acceder a las vistas:

http://localhost:8080/home

http://localhost:8080/realtimeproducts

---

Autor: **Sebastián Merlassino**
