const fs = require('fs');
const path = require('path');

class CartManager {
    constructor(filePath) {
        this.path = filePath;
    }

    #ensureFile() {
        const dir = path.dirname(this.path);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        if (!fs.existsSync(this.path)) fs.writeFileSync(this.path, '[]');
    }

    getAll() {
        this.#ensureFile();
        const raw = fs.readFileSync(this.path, 'utf8');
        return JSON.parse(raw || '[]');
    }

    getById(cid) {
        const all = this.getAll();
        return all.find(c => String(c.id) === String(cid)) || null;
    }

    createCart() {
        const all = this.getAll();
        const nextId = all.length ? Math.max(...all.map(c => Number(c.id))) + 1 : 1;
        const cart = { id: nextId, products: [] };
        all.push(cart);
        fs.writeFileSync(this.path, JSON.stringify(all, null, 2));
        return cart;
    }

    addProduct(cid, pid) {
        const all = this.getAll();
        const idx = all.findIndex(c => String(c.id) === String(cid));
        if (idx === -1) return null;

        const products = all[idx].products;
        const itemIdx = products.findIndex(it => String(it.product) === String(pid));

        if (itemIdx === -1) {
            products.push({ product: String(pid), quantity: 1 });
        } else {
            products[itemIdx].quantity += 1;
        }

        fs.writeFileSync(this.path, JSON.stringify(all, null, 2));
        return all[idx];
    }
}

module.exports = CartManager;