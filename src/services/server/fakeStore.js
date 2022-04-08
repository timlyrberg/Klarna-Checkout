import fetch from "node-fetch";

async function getItemById(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (response.ok) {
        const product = await response.json();
        return product;
    } else {
        console.error("Error ", response.statusText, response.status);
        throw new Error("500 Error, Fake store api is not working");
    }
}

async function getCartById(id) {
    const response = await fetch(`https://fakestoreapi.com/carts/${id}`);
    if (response.ok) {
        const cart = await response.json();
        return cart;
    } else {
        console.error('error', response.statusText);
        throw new Error('500 error!, Fake store API is not working')
    }
}

async function getProductsFromCart(cart) {
    const { products } = cart;
    const response = await fetch('https://fakestoreapi.com/products');
    if (response.ok) {
        const productsFromDb = await response.json();
        const productFromCart = [];
        products.forEach((product) => {
            const foundProduct = productsFromDb.find((element) => element.id === product.productId)
            if(!!foundProduct) {
                productFromCart.push({product: foundProduct, quantity: product.quantity});
            }
        });
            return productFromCart;
    } else {
        console.error('Error ', response.statusText)
        throw new Error('500 error!, Fake store API is not working')
    }
}

module.exports = { getItemById, getCartById, getProductsFromCart };

