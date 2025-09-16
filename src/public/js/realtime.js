const socket = io();

function renderRows(products) {
    const tbody = document.getElementById('product-rows');
    tbody.innerHTML = products.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.title}</td>
      <td>${p.code}</td>
      <td>${p.price}</td>
      <td>${p.stock}</td>
      <td>${p.category}</td>
    </tr>
  `).join('');
}

const msg = (text, cls = 'muted') => {
    const el = document.getElementById('msg');
    el.className = cls;
    el.textContent = text;
};


socket.on('productsUpdated', (products) => {
    renderRows(products);
    msg(`Lista actualizada (${products.length} productos)`, 'ok');
});

socket.on('errorMsg', (text) => msg(text, 'err'));

// Crear
document.getElementById('formCreate').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
        title: fd.get('title'),
        description: fd.get('description'),
        code: fd.get('code'),
        price: Number(fd.get('price')),
        status: fd.get('status') === 'on',
        stock: Number(fd.get('stock')),
        category: fd.get('category'),
        thumbnails: (fd.get('thumbnails') || '')
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
    };
    socket.emit('createProduct', payload);
    e.currentTarget.reset();
});

// Eliminar
document.getElementById('formDelete').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    socket.emit('deleteProduct', fd.get('pid'));
    e.currentTarget.reset();
});