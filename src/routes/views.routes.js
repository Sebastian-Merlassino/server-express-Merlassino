const { Router } = require('express');
const path = require('path');
const ProductManager = require('../managers/productManager');

const router = Router();

const pm = new ProductManager(path.join(__dirname, '..', '..', 'data', 'products.json'));


router.get('/', (req, res) => {
    const products = pm.getAll();
    res.render('home', { products });
});


router.get('/realtimeproducts', (req, res) => {
    const products = pm.getAll();
    res.render('realTimeProducts', { products });
});

module.exports = router;