const productsContainer = document.getElementById('products-container');

const getProducts = async () => {
  const response = await fetch('http://localhost:8080/api/products');
  const { products } = await response.json();
  console.log(products);
  products.forEach((product) => {
    productsContainer.innerHTML += createProductDiv(product);
  });
  addEventToBtns();
};

const createProductDiv = (product) => {
  return `<li class="product">
            <img src="${product.image}" alt="">
            <h5 id="nombre">${product.title}</h5>
            <button class="addToCartBtn" data-id="${product._id}">Add to cart</button>
          </li>`;
};

const addEventToBtns = () => {
  const addToCartBtns = document.querySelectorAll('.addToCartBtn');
  addToCartBtns.forEach((btn) => {
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

getProducts();
