const productsContainer = document.getElementById('cart-products-container');

const getCart = async () => {
  productsContainer.innerHTML = '';
  const {
    data: {
      user: { cart: cartId },
    },
  } = await axios.get(`http://localhost:8080/api/sessions/current`);
  if (cartId) {
    const {
      data: {
        cart: { products },
      },
    } = await axios.get(`http://localhost:8080/api/carts/${cartId}`);
    let totalPrice = 0;
    if (products.length == 0)
      productsContainer.innerHTML = '<h2>Your cart is empty 😶 </h2>';
    else {
      products.forEach(({ product, quantity }) => {
        productsContainer.innerHTML += createProductDiv(product, quantity);
        totalPrice += Math.trunc(product.price * quantity);
      });
      productsContainer.innerHTML += `<h3>Total Price: $${totalPrice}</h3>`;
    }
    addEventToBtns();
  }
};

const createProductDiv = (product, quantity) => {
  return `<li class="product">
              <img src="${product.image}" alt="">
              <h5 id="nombre">${product.title}</h5>
              <p>Total price: $${Math.trunc(product.price * quantity)}</p>
              <p>Quantity: ${quantity}</p>
              <button class="minusOneToCart" data-id="${product._id}">-</button>
              <button class="plusOneToCart" data-id="${product._id}">+</button>
              <button class="removeFromCart" data-id="${
                product._id
              }">Delete product</button>
            </li>`;
};

const addEventToBtns = () => {
  const addToCartBtns = document.querySelectorAll('.plusOneToCart');
  const removeOneFromCartBtns = document.querySelectorAll('.minusOneToCart');
  const removeFromCartBtn = document.querySelectorAll('.removeFromCart');
  addToCartBtns.forEach((btn) => {
    btn.onclick = ({ target }) => {
      addOrRemoveFromCart(target.getAttribute('data-id'), 1);
    };
  });
  removeOneFromCartBtns.forEach((btn) => {
    btn.onclick = ({ target }) => {
      addOrRemoveFromCart(target.getAttribute('data-id'), -1);
    };
  });
  removeFromCartBtn.forEach((btn) => {
    btn.onclick = ({ target }) => {
      deleteWholeProductFromCart(target.getAttribute('data-id'));
    };
  });
};

const addOrRemoveFromCart = async (productId, qtty = 1) => {
  const {
    data: {
      user: { cart: cartId },
    },
  } = await axios.get(`http://localhost:8080/api/sessions/current`);
  await axios.put(
    `http://localhost:8080/api/carts/${cartId}/product/${productId}?qtty=${qtty}`
  );
  getCart();
};

const deleteWholeProductFromCart = async (productId) => {
  const cartId = localStorage.getItem('cart');
  if (!cartId) {
    const {
      data: { cart },
    } = await axios.post(`http://localhost:8080/api/carts/`);
    console.log('carrito creado', { cart });
    localStorage.setItem('cart', cart._id);
  }
  await axios.delete(
    `http://localhost:8080/api/carts/${cartId}/product/${productId}`
  );
  getCart();
};

getCart();
