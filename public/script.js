const API = "http://localhost:5000/api/products";

async function loadProducts() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("products");
  list.innerHTML = "";

  data.forEach(p => {
    const li = document.createElement("li");
    li.innerText = `${p.name} - ₹${p.price} (${p.category})`;
    list.appendChild(li);
  });
}

loadProducts();
