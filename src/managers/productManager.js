const fs = require('fs');
const path = require('path');

class ProductManager {
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

    getById(id) {
        const all = this.getAll();
        return all.find(p => String(p.id) === String(id)) || null;
    }

    add(product) {

        const all = this.getAll();
        const nextId = all.length ? Math.max(...all.map(p => Number(p.id))) + 1 : 1;

        const newProduct = {
            id: nextId,
            title: String(product.title),
            description: String(product.description),
            code: String(product.code),
            price: Number(product.price),
            status: Boolean(product.status),
            stock: Number(product.stock),
            category: String(product.category),
            thumbnails: Array.isArray(product.thumbnails) ? product.thumbnails.map(String) : []
        };

        all.push(newProduct);
        fs.writeFileSync(this.path, JSON.stringify(all, null, 2));
        return newProduct;
    }

    update(id, fields) {
        const all = this.getAll();
        const idx = all.findIndex(p => String(p.id) === String(id));
        if (idx === -1) return null;

        const { id: _omit, ...rest } = fields;
        all[idx] = { ...all[idx], ...rest, id: all[idx].id };

        fs.writeFileSync(this.path, JSON.stringify(all, null, 2));
        return all[idx];
    }

    delete(id) {
        const all = this.getAll();
        const newAll = all.filter(p => String(p.id) !== String(id));
        if (newAll.length === all.length) return false;
        fs.writeFileSync(this.path, JSON.stringify(newAll, null, 2));
        return true;
    }
}

module.exports = ProductManager;