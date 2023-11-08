const addToCartBtn = document.querySelector('.addToCartBtn');
addToCartBtn.onclick = ({ target }) => {
  addToCart(target.getAttribute('data-id'));
};

const addToCart = async (productId) => {
  console.log('click');
  const cartId = localStorage.getItem('cart');
  if (!cartId) {
    const {
      data: { cart },
    } = await axios.post(`http://localhost:8080/api/carts/`);
    console.log('carrito creado', { cart });
    localStorage.setItem('cart', cart._id);
  }
  await axios.put(
    `http://localhost:8080/api/carts/${cartId}/product/${productId}`
  );
};
