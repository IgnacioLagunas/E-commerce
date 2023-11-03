const productsContainer = document.getElementById('products_container');

const getProducts = async () => {
  const response = await fetch('http://localhost:8080/api/products');
  const { products } = await response.json();
  console.log(products);
  products.forEach((product) => {
    productsContainer.innerHTML += createProductDiv(product);
  });
  addEventToButtons();
};

const createProductDiv = (product) => {
  return `<div class="product">
            <img src="${product.image}" alt="">
            <h5 id="nombre">${product.title}</h5>
            <button class="addToCartBtn">Add to cart</button>
          </div>`;
};

const addEventToButtons = () => {
  const addToCartBtns = document.querySelectorAll('.addToCartBtn');
  console.log(addToCartBtns);
  addToCartBtns.forEach((btn, i) => {
    btn.onclick = (e) => {
      e.preventDefault();
      console.log(e, i);
    };
  });
};

getProducts();
