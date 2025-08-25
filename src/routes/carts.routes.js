const { Router } = require('express');
const path = require('path');
const CartManager = require('../managers/cartManager');

const router = Router();

const manager = new CartManager(
    path.join(__dirname, '..', '..', 'data', 'carts.json')
);


router.post('/', (req, res) => {
    const cart = manager.createCart();
    res.status(201).json(cart);
});


router.get('/:cid', (req, res) => {
    const cart = manager.getById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart.products);
});


router.post('/:cid/product/:pid', (req, res) => {
    const cart = manager.addProduct(req.params.cid, req.params.pid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
});

module.exports = router;