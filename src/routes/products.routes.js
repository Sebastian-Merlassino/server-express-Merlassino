const { Router } = require('express');
const path = require('path');
const ProductManager = require('../managers/productManager');

const router = Router();

const manager = new ProductManager(
    path.join(__dirname, '..', '..', 'data', 'products.json')
);


router.get('/', (req, res) => {
    const all = manager.getAll();
    res.json(all);
});


router.get('/:pid', (req, res) => {
    const prod = manager.getById(req.params.pid);
    if (!prod) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(prod);
});


router.post('/', (req, res) => {
    try {
        const created = manager.add(req.body);
        res.status(201).json(created);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


router.put('/:pid', (req, res) => {
    const updated = manager.update(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
});


router.delete('/:pid', (req, res) => {
    const ok = manager.delete(req.params.pid);
    if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ status: 'ok' });
});

module.exports = router;