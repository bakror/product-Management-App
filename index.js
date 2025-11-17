// Dark mode toggle
const checkbox = document.getElementById("checkbox");
checkbox.checked = localStorage.getItem("dark") === "true";
document.body.classList.toggle("dark", checkbox.checked);
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", checkbox.checked);
});

// DOM elements
const els = {
  title: document.getElementById("title"),
  price: document.getElementById("price"),
  taxes: document.getElementById("taxes"),
  ads: document.getElementById("ads"),
  discount: document.getElementById("discount"),
  total: document.getElementById("total"),
  count: document.getElementById("count"),
  category: document.getElementById("category"),
  submit: document.getElementById("submit"),
  tbody: document.getElementById("tbody"),
  deleteAll: document.getElementById("deleteAll"),
  search: document.getElementById("search"),
  finl: document.getElementById("finl"),
};

// Data initialization
let datePro = JSON.parse(localStorage.getItem("product")) || [];
let mood = "create";
let tmp;
let moodSearch = "Title";
console.log;
// Input validation
const sanitizeInput = (value) =>
  String(value)
    .replace(/[<>{}]/g, "")
    .trim();

const isValidNumber = (value) => !isNaN(value) && value >= 0;

const validateProduct = ({ title, price }) =>
  sanitizeInput(title) && isValidNumber(price);

// Calculate total
const getTotal = () => {
  const price = +els.price.value || 0;
  els.total.innerHTML = price
    ? price +
      (+els.taxes.value || 0) +
      (+els.ads.value || 0) -
      (+els.discount.value || 0)
    : "";
  els.total.style.background = price ? "#00a94f" : "#dc2626";
};

// Add input listeners
[els.price, els.taxes, els.ads, els.discount].forEach((input) =>
  input.addEventListener("input", getTotal)
);

// Render product row
const renderProduct = (
  id,
  { title, price, taxes, ads, discount, category, result }
) => `
  <tr>
    <td>${id}</td>
    <td>${sanitizeInput(title)}</td>
    <td>${price}</td>
    <td>${taxes}</td>
    <td>${ads}</td>
    <td>${discount}</td>
    <td>${sanitizeInput(category)}</td>
    <td>${result}</td>
    <td><button onclick="update(${id - 1})">update</button></td>
    <td><button onclick="deleteDate(${id - 1})">delete</button></td>
  </tr>
`;

// Read and render data
const readDate = () => {
  els.tbody.innerHTML = datePro.map((p, i) => renderProduct(i + 1, p)).join("");
  els.deleteAll.innerHTML = datePro.length
    ? `<button onclick="deleteAll()">Delete All (${datePro.length})</button>`
    : "";
};

// Create or update product
const createProduct = () => {
  const countValue = +els.count.value || 1;
  if (countValue > 100) return;
  if (els.category.value === "") return;

  const product = {
    title: sanitizeInput(els.title.value),
    price: +els.price.value || 0,
    taxes: +els.taxes.value || 0,
    ads: +els.ads.value || 0,
    discount: +els.discount.value || 0,
    category: sanitizeInput(els.category.value),
    result: els.total.innerHTML,
    count: 1,
  };

  if (!validateProduct(product)) return;

  if (mood === "create") {
    for (let i = 0; i < countValue; i++) datePro.push(product);
  } else {
    datePro[tmp] = product;
    mood = "create";
    els.submit.innerHTML = "Create";
    els.count.style.display = els.category.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(datePro));
  clearInputs();
  readDate();
};

// Clear inputs
const clearInputs = () => {
  Object.values(els).forEach((el) => el.tagName === "INPUT" && (el.value = ""));
  els.total.innerHTML = "";
  els.total.style.background = "#dc2626";
};

// Submit event
els.submit.addEventListener("click", createProduct);

// Delete product
const deleteDate = (i) => {
  datePro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(datePro));
  readDate();
};

// Delete all
const deleteAll = () => {
  localStorage.removeItem("product");
  datePro = [];
  readDate();
};

// Update product
function update(i) {
  if (i < 0 || i >= datePro.length) {
    return;
  }
  els.title.value = datePro[i].title || "";
  els.price.value = datePro[i].price || 0;
  els.taxes.value = datePro[i].taxes || 0;
  els.ads.value = datePro[i].ads || 0;
  els.discount.value = datePro[i].discount || 0;
  els.category.value = datePro[i].category || "";
  els.count.value = datePro[i].count || 1;

  els.count.style.display = els.category.style.display = "none";
  els.submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  getTotal();
}

// Search mode
const searchMood = (id) => {
  moodSearch = id === "searchTitle" ? "Title" : "Category";
  els.search.setAttribute("placeholder", `Search By ${moodSearch}`);
  els.search.value = "";
  els.search.focus();
  readDate();
};

// Search data
const searchDate = (value) => {
  value = sanitizeInput(value).toLowerCase();
  const oldNoData = els.finl.nextElementSibling;
  if (oldNoData?.tagName === "H2") oldNoData.remove();

  const filtered = datePro.filter((p) =>
    p[moodSearch.toLowerCase()].toLowerCase().includes(value)
  );

  els.tbody.innerHTML = !value
    ? datePro.map((p, i) => renderProduct(i + 1, p)).join("")
    : !filtered.length
    ? ""
    : filtered.map((p, i) => renderProduct(i + 1, p)).join("");

  if (value && !filtered.length) {
    const noData = document.createElement("h2");
    noData.innerHTML = "مفيش بيانات";
    noData.style.textAlign = "center";
    els.finl.after(noData);
  }
};

els.search.addEventListener("input", () => searchDate(els.search.value));

// Initial render
readDate();
