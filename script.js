let data = [];

async function loadData() {
  const res = await fetch("products.json");
  data = await res.json();
  renderProducts(data);
}

function renderProducts(list) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.onclick = () => window.location.href = item.link;

    div.innerHTML = `
      <img src="${item.image}" alt="product">
      <div class="id">${item.id}</div>
    `;

    grid.appendChild(div);
  });
}

document.getElementById("search").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = data.filter(item => item.id.toLowerCase().includes(keyword));
  renderProducts(filtered);
});

loadData();