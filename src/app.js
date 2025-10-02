const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');

const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.routes');

const ProductManager = require('./managers/productManager');
const { config } = require('dotenv');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.set('io', io);

mongoose.connect(config.databaseURL || 'mongodb://localhost:27017/ecommerce')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = 8080;

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.use('/', viewsRouter);

// ---- SOCKETS ----
const productsPath = path.join(__dirname, '..', 'data', 'products.json');
const pm = new ProductManager(productsPath);

io.on('connection', (socket) => {
    // lista inicial al conectar
    socket.emit('productsUpdated', pm.getAll());

    // Crear producto
    socket.on('createProduct', (payload) => {
        try {
            pm.add(payload); // id autogenerado
            io.emit('productsUpdated', pm.getAll());
        } catch (e) {
            socket.emit('errorMsg', e.message || 'Error al crear producto');
        }
    });

    // Eliminar producto
    socket.on('deleteProduct', (pid) => {
        const ok = pm.delete(pid);
        if (!ok) return socket.emit('errorMsg', 'Producto no encontrado');
        io.emit('productsUpdated', pm.getAll());
    });
});


httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
