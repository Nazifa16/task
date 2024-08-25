const inputProduct = document.getElementById("input-product");
const inputPrice = document.getElementById("input-price");
const listContainer = document.getElementById("list-container");
const totalCount = document.getElementById("total-count");
const totalPrice = document.getElementById("total-price");

let products = JSON.parse(localStorage.getItem("products")) || [];

function updateSummary() {
  const total = products.reduce((sum, product) => sum + product.price, 0);
  totalCount.innerText = products.length;
  totalPrice.innerText = total;
}

function addToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderList() {
  const items = products
    .map((product, index) => {
      return `<li data-price="${product.price}">
                ${product.name} (${product.price} AZN)
                <span onclick="removeProduct(${index})">Sil</span>
              </li>`;
    })
    .join("");
  listContainer.innerHTML = items;
}

function addProduct() {
  const productName = inputProduct.value.trim();
  const productPrice = parseFloat(inputPrice.value);

  if (productName === "" || isNaN(productPrice)) {
    alert("Please fill in all fields");
  } else if (productPrice <= 0) {
    alert("Price must be greater than 0");
  } else if (
    products.some(
      (product) => product.name.toLowerCase() === productName.toLowerCase()
    )
  ) {
    alert("This product is already in the list");
  } else {
    products.push({ name: productName, price: productPrice });
    addToLocalStorage();
    renderList();
    updateSummary();
  }

  inputProduct.value = "";
  inputPrice.value = "";
}

function removeProduct(index) {
  // remove the product at the specified index
  products.splice(index, 1);
  addToLocalStorage();
  renderList();
  updateSummary();
}

document.addEventListener("DOMContentLoaded", () => {
  renderList();
  updateSummary();
});
