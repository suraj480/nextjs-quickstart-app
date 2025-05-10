
export const products = [
    { id: 1, type: 'Mobile', description: 'Iphone 15', price: "$50" },
    { id: 2, type: 'Laptop', description: 'Hp probook', price: "$530" },
    { id: 3, type: 'Accesories', description: 'Keyboard', price: "$110" },
]

let nextId = 4;

export function getProducts() {
    return products;
}

export function getProductById(id) {
    return products.find(u => u.id === id);
}

export function createProduct(product) {
    const newProduct = { id: nextId++, ...product };
    products.push(newProduct);
    return newProduct;
}

export function updateProduct(id, updatedProduct) {
    const index = products.findIndex(u => u.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        return products[index];
    }
    return null;
}

export function deleteProduct(id) {
    const index = products.findIndex(u => u.id === id);
    if (index !== -1) {
        return products.splice(index, 1)[0];
    }
    return null;
}