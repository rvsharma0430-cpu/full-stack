const productGrid = document.getElementById("productGrid");
const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect");

const products = [
  { id: 1, name: "Wireless Mouse", category: "electronics", price: 799 },
  { id: 2, name: "Bluetooth Headphones", category: "electronics", price: 2499 },
  { id: 3, name: "Cotton Hoodie", category: "fashion", price: 1399 },
  { id: 4, name: "Sneakers", category: "fashion", price: 2199 },
  { id: 5, name: "JavaScript Basics", category: "books", price: 499 },
  { id: 6, name: "Clean Code", category: "books", price: 899 },
];

function renderProducts(list) {
  productGrid.classList.add("fade-out");

  setTimeout(() => {
    productGrid.innerHTML = "";

    list.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card fade-in";

      card.innerHTML = `
        <span class="badge">${p.category.toUpperCase()}</span>
        <h2>${p.name}</h2>
        <p class="price">₹${p.price}</p>
      `;

      productGrid.appendChild(card);
    });

    productGrid.classList.remove("fade-out");
  }, 180);
}

function applyFilterAndSort() {
  const selectedCategory = categorySelect.value;
  const selectedSort = sortSelect.value;

  let filtered = [...products];

  if (selectedCategory !== "all") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  if (selectedSort === "priceLow") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "priceHigh") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (selectedSort === "nameAZ") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSort === "nameZA") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  renderProducts(filtered);
}

categorySelect.addEventListener("change", applyFilterAndSort);
sortSelect.addEventListener("change", applyFilterAndSort);

renderProducts(products);
