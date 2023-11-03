const productsContainer = document.getElementById('cart-products-container');

const getCart = async () => {
  const cartId = localStorage.getItem('cart');
  if (cartId) {
    const {
      data: {
        cart: { products },
      },
    } = await axios.get(`http://localhost:8080/api/carts/${cartId}`);
    console.log(products);
    products.forEach(({ product, quantity }) => {
      productsContainer.innerHTML += createProductDiv(product, quantity);
    });
    addEventToBtns();
  }
};

const createProductDiv = (product, quantity) => {
  return `<li class="product">
              <img src="${product.image}" alt="">
              <h5 id="nombre">${product.title}</h5>
              <p>Quantity: ${quantity}</p>
              <button class="plusOneToCart" data-id="${product._id}">-</button>
              <button class="minusOneToCart" data-id="${product._id}">+</button>
            </li>`;
};

const addEventToBtns = () => {
  const addToCartBtns = document.querySelectorAll('.plusOneToCart');
  const removeFromCartBtns = document.querySelectorAll('.minusOneToCart');
  addToCartBtns.forEach((btn) => {
    btn.onclick = ({ target }) => {
      addToCart(target.getAttribute('data-id'));
    };
  });
  removeFromCartBtns.forEach((btn) => {
    btn.onclick = ({ target }) => {
      addToCart(target.getAttribute('data-id'));
    };
  });
};

const addToCart = async (productId) => {
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

getCart();
