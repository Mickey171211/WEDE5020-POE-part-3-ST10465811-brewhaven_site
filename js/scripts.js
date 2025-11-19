/* ------------------------------------------------------
   MOBILE NAVIGATION
------------------------------------------------------ */
const navToggle = document.getElementById("nav-toggle");
const navList = document.getElementById("nav-list");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

/* ------------------------------------------------------
   LOAD YEAR IN FOOTER
------------------------------------------------------ */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* ------------------------------------------------------
   FEATURES SECTION (Homepage)
------------------------------------------------------ */
const features = [
  { title: "Small-Batch Roasting", text: "Freshly roasted beans prepared weekly." },
  { title: "Ethical Sourcing", text: "Supporting sustainable farmers around the world." },
  { title: "Community Events", text: "Workshops, cupping sessions, and café meetups." }
];

const featuresGrid = document.getElementById("features-grid");
if (featuresGrid) {
  features.forEach(f => {
    featuresGrid.innerHTML += `
      <div class="feature-card">
        <h3>${f.title}</h3>
        <p>${f.text}</p>
      </div>`;
  });
}

/* ------------------------------------------------------
   LOAD PRODUCTS FROM JSON
------------------------------------------------------ */
async function loadProducts() {
  const response = await fetch("data/products.json");
  return await response.json();
}

/* ------------------------------------------------------
   RENDER PRODUCTS ON PRODUCTS PAGE
------------------------------------------------------ */
const productsList = document.getElementById("products-list");

if (productsList) {
  loadProducts().then(products => {
    renderProducts(products);

    // SEARCH
    document.getElementById("product-search").addEventListener("input", e => {
      const query = e.target.value.toLowerCase();
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.notes.toLowerCase().includes(query)
      );
      renderProducts(filtered);
    });

    // FILTER
    document.getElementById("product-filter").addEventListener("change", e => {
      const roast = e.target.value;
      const filtered = roast ? products.filter(p => p.roast.toLowerCase() === roast) : products;
      renderProducts(filtered);
    });

    // SORT
    document.getElementById("product-sort").addEventListener("change", e => {
      const value = e.target.value;
      let sorted = [...products];

      if (value === "price-asc") sorted.sort((a, b) => a.price - b.price);
      if (value === "name-asc") sorted.sort((a, b) => a.title.localeCompare(b.title));
      if (value === "featured") sorted.sort((a, b) => b.featured - a.featured);

      renderProducts(sorted);
    });
  });
}

function renderProducts(list) {
  productsList.innerHTML = "";
  list.forEach(p => {
    productsList.innerHTML += `
      <div class="product-card">
        <h3>${p.title}</h3>
        <small>${p.origin}</small>
        <p>${p.notes}</p>
        <p class="price">R${p.price}</p>
      </div>`;
  });
}

/* ------------------------------------------------------
   FEATURED PRODUCTS (Homepage)
------------------------------------------------------ */
const featuredList = document.getElementById("featured-list");

if (featuredList) {
  loadProducts().then(products => {
    const featured = products.filter(p => p.featured);
    featured.forEach(p => {
      featuredList.innerHTML += `
        <div class="product-card">
          <h3>${p.title}</h3>
          <small>${p.origin}</small>
          <p>${p.notes}</p>
          <p class="price">R${p.price}</p>
        </div>`;
    });
  });
}

/* ------------------------------------------------------
   GALLERY (Lightbox)
------------------------------------------------------ */
const gallery = document.getElementById("gallery");

if (gallery) {
  const images = ["gallery1.jpg", "gallery2.jpg", "gallery3.jpg", "gallery4.jpg", "gallery5.jpg"];

  images.forEach(img => {
    gallery.innerHTML += `
      <img src="assets/${img}" alt="Brew Haven Gallery Image" data-caption="Brew Haven Coffee Moment"/>`;
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");

if (gallery) {
  gallery.addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
      lightboxImg.src = e.target.src;
      lightboxCaption.textContent = e.target.dataset.caption;
      lightbox.classList.add("active");
    }
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}

/* ------------------------------------------------------
   FORMS — ENQUIRY + CONTACT (AJAX Simulation)
------------------------------------------------------ */
function handleForm(formId, responseId) {
  const form = document.getElementById(formId);
  const responseBox = document.getElementById(responseId);

  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    // SIMPLE VALIDATION
    const valid = form.checkValidity();
    if (!valid) {
      alert("Please complete all required fields correctly.");
      return;
    }

    // SIMULATE SEND
    responseBox.style.display = "block";
    responseBox.textContent = "Thank you! Your submission has been received.";
    form.reset();
  });
}

handleForm("enquiry-form", "enquiry-response");
handleForm("contact-form", "contact-response");

/* ------------------------------------------------------
   MAP (Leaflet API)
------------------------------------------------------ */
const mapDiv = document.getElementById("map");

if (mapDiv) {
  const map = L.map("map").setView([-33.9249, 18.4241], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  L.marker([-33.9249, 18.4241])
    .addTo(map)
    .bindPopup("Brew Haven Café — Cape Town")
    .openPopup();
}