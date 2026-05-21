const properties = [
  {
    id: "costa-del-este-1204",
    title: "Apartamento premium en Costa del Este",
    location: "Costa del Este, Panamá",
    operation: "Alquiler",
    price: "$1,850/mes",
    beds: 2,
    baths: 2,
    parking: 2,
    meters: 118,
    status: "Disponible",
    img: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop')"
  },
  {
    id: "san-francisco-park-view",
    title: "PH familiar cerca de Parque Omar",
    location: "San Francisco, Panamá",
    operation: "Venta",
    price: "$245,000",
    beds: 3,
    baths: 2,
    parking: 2,
    meters: 142,
    status: "Disponible",
    img: "url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop')"
  },
  {
    id: "oficina-obarrio-ready",
    title: "Oficina lista para ocupar en Obarrio",
    location: "Obarrio, Panamá",
    operation: "Alquiler",
    price: "$1,200/mes",
    beds: 0,
    baths: 1,
    parking: 1,
    meters: 78,
    status: "Reservado",
    img: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop')"
  }
];

const clients = [
  {
    name: "María González",
    phone: "+507 6000-0001",
    budget: "$1,500 - $2,000",
    looking: "Apartamento 2 recámaras",
    zone: "Costa del Este / San Francisco",
    status: "Interesado",
    next: "Enviar 3 opciones hoy"
  },
  {
    name: "Carlos Medina",
    phone: "+507 6000-0002",
    budget: "$220k - $280k",
    looking: "Compra para inversión",
    zone: "San Francisco / El Cangrejo",
    status: "Nuevo",
    next: "Calificar presupuesto y banco"
  },
  {
    name: "Ana Rivera",
    phone: "+507 6000-0003",
    budget: "$900 - $1,300",
    looking: "Oficina pequeña",
    zone: "Obarrio / Marbella",
    status: "Visitó",
    next: "Seguimiento post-visita"
  },
  {
    name: "Luis Paredes",
    phone: "+507 6000-0004",
    budget: "$2,000 - $2,800",
    looking: "Apartamento ejecutivo",
    zone: "Punta Pacífica",
    status: "Negociación",
    next: "Confirmar visita sábado"
  }
];

let currentFilter = "all";
let currentTone = "premium";

function moneyMessage(property){
  return `Hola, te comparto esta propiedad que puede interesarte: ${property.title}, ubicada en ${property.location}. Tiene ${property.beds} recámaras, ${property.baths} baños, ${property.parking} estacionamientos y ${property.meters} m². Precio: ${property.price}. ¿Deseas que coordinemos una visita?`;
}

function renderPropertyRow(property){
  return `
    <article class="property-row">
      <div class="prop-image" style="--img:${property.img}"></div>
      <div class="prop-info">
        <span class="badge">${property.status}</span>
        <h3>${property.title}</h3>
        <p>${property.location} · ${property.operation} · ${property.meters} m²</p>
        <p>${property.beds} rec. · ${property.baths} baños · ${property.parking} est.</p>
      </div>
      <div>
        <div class="price">${property.price}</div>
        <div class="card-actions">
          <button class="small-btn" onclick="copyMessage('${property.id}')">WhatsApp</button>
          <button class="small-btn" onclick="openFicha('${property.id}')">Ficha</button>
        </div>
      </div>
    </article>
  `;
}

function renderPropertyCard(property){
  return `
    <article class="property-card">
      <div class="prop-image" style="--img:${property.img}">
        <span class="badge" style="position:absolute;left:13px;top:13px">${property.status}</span>
      </div>
      <div class="prop-info">
        <h3>${property.title}</h3>
        <p>${property.location}</p>
        <p>${property.beds} rec. · ${property.baths} baños · ${property.parking} est. · ${property.meters} m²</p>
      </div>
      <div class="price">${property.price}</div>
      <div class="card-actions">
        <button class="small-btn" onclick="copyMessage('${property.id}')">Mensaje</button>
        <button class="small-btn" onclick="openFicha('${property.id}')">Ver ficha</button>
      </div>
    </article>
  `;
}

function renderClient(client){
  return `
    <article class="client-card">
      <div class="client-top">
        <div>
          <h3>${client.name}</h3>
          <p>${client.phone}</p>
        </div>
        <span class="badge">${client.status}</span>
      </div>
      <p><b>Busca:</b> ${client.looking}</p>
      <p><b>Zona:</b> ${client.zone}</p>
      <p><b>Presupuesto:</b> ${client.budget}</p>
      <p style="color:var(--gold);margin-top:12px"><b>Próximo paso:</b> ${client.next}</p>
    </article>
  `;
}

function renderAll(){
  const dashboardProperties = document.getElementById("dashboardProperties");
  const propertyBoard = document.getElementById("propertyBoard");
  const clientGrid = document.getElementById("clientGrid");

  if(dashboardProperties){
    dashboardProperties.innerHTML = properties.slice(0,3).map(renderPropertyRow).join("");
  }

  if(propertyBoard){
    const filtered = properties.filter(p => {
      if(currentFilter === "all") return true;
      return p.operation === currentFilter || p.status === currentFilter;
    });
    propertyBoard.innerHTML = filtered.map(renderPropertyCard).join("");
  }

  if(clientGrid){
    clientGrid.innerHTML = clients.map(renderClient).join("");
  }

  document.getElementById("statProperties").textContent = properties.length + 21;
  document.getElementById("statClients").textContent = clients.length + 14;
}

function setView(viewName){
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(viewName)?.classList.add("active");

  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  window.scrollTo({top:0, behavior:"smooth"});
}

document.querySelectorAll("[data-view]").forEach(btn => {
  btn.addEventListener("click", () => setView(btn.dataset.view));
});

document.querySelectorAll("[data-view-jump]").forEach(btn => {
  btn.addEventListener("click", () => setView(btn.dataset.viewJump));
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderAll();
  });
});

document.querySelectorAll(".tone-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tone-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentTone = btn.dataset.tone;
  });
});

document.getElementById("themeToggle").addEventListener("click", () => {
  const isLight = document.documentElement.dataset.theme === "light";
  document.documentElement.dataset.theme = isLight ? "dark" : "light";
});

document.getElementById("sendSuggestionBtn").addEventListener("click", () => {
  const property = properties[0];
  document.getElementById("suggestedMessage").textContent = moneyMessage(property);
});

function copyMessage(id){
  const property = properties.find(p => p.id === id);
  const msg = moneyMessage(property);
  navigator.clipboard?.writeText(msg);
  showToast("Mensaje copiado para WhatsApp");
}

function openFicha(id){
  const property = properties.find(p => p.id === id);
  const msg = encodeURIComponent(moneyMessage(property));
  const ficha = `
${property.title}
${property.location}

${property.price}
${property.beds} recámaras · ${property.baths} baños · ${property.parking} estacionamientos · ${property.meters} m²

${moneyMessage(property)}
  `.trim();

  const popup = window.open("", "_blank", "width=420,height=720");
  popup.document.write(`
    <html>
    <head>
      <title>${property.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body{margin:0;background:#071015;color:#fff;font-family:Inter,system-ui,sans-serif;padding:18px}
        .card{border:1px solid rgba(255,255,255,.14);border-radius:28px;overflow:hidden;background:rgba(255,255,255,.07)}
        .img{height:260px;background:${property.img};background-size:cover;background-position:center}
        .body{padding:20px}
        h1{font-size:36px;line-height:.94;letter-spacing:-.07em;margin:0 0 10px}
        p{color:#9BA8B8;line-height:1.6}
        .price{font-size:32px;color:#D8B35D;font-weight:1000}
        a{display:block;text-align:center;margin-top:16px;background:linear-gradient(135deg,#22E6A4,#4D8DFF);color:#05100E;padding:14px;border-radius:16px;text-decoration:none;font-weight:900}
      </style>
    </head>
    <body>
      <div class="card">
        <div class="img"></div>
        <div class="body">
          <h1>${property.title}</h1>
          <p>${property.location}</p>
          <div class="price">${property.price}</div>
          <p>${property.beds} recámaras · ${property.baths} baños · ${property.parking} estacionamientos · ${property.meters} m²</p>
          <p>Ficha demo creada desde Propix Agent. En la versión real esto será un link público profesional.</p>
          <a target="_blank" href="https://wa.me/?text=${msg}">Enviar por WhatsApp</a>
        </div>
      </div>
    </body>
    </html>
  `);
  popup.document.close();
}

const modal = document.getElementById("propertyModal");
document.querySelectorAll(".open-modal,#quickAddBtn").forEach(btn => {
  btn.addEventListener("click", () => modal.classList.add("active"));
});
document.querySelector(".close-modal").addEventListener("click", () => modal.classList.remove("active"));
modal.addEventListener("click", e => {
  if(e.target === modal) modal.classList.remove("active");
});

document.getElementById("savePropertyBtn").addEventListener("click", () => {
  const title = document.getElementById("newTitle").value || "Nueva propiedad en Panamá";
  const location = document.getElementById("newLocation").value || "Panamá";
  const price = document.getElementById("newPrice").value || "$1,000/mes";
  const operation = document.getElementById("newOperation").value;

  properties.unshift({
    id: "demo-" + Date.now(),
    title,
    location,
    operation,
    price,
    beds: 2,
    baths: 2,
    parking: 1,
    meters: 95,
    status: "Disponible",
    img: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop')"
  });

  modal.classList.remove("active");
  renderAll();
  setView("properties");
  showToast("Propiedad creada en modo demo");
});

document.getElementById("generateAiBtn").addEventListener("click", () => {
  const input = document.getElementById("aiInput").value.trim() || "Apartamento moderno en Panamá, excelente ubicación, buena iluminación y listo para ocupar";
  let output = "";

  if(currentTone === "premium"){
    output = `Propiedad exclusiva con excelente distribución y ubicación estratégica. ${input}. Ideal para clientes que buscan comodidad, presencia y una experiencia residencial superior en Panamá.`;
  } else if(currentTone === "whatsapp"){
    output = `Hola, te comparto esta opción que puede interesarte: ${input}. Si deseas, puedo coordinarte una visita y enviarte más detalles.`;
  } else {
    output = `Oportunidad para inversión inmobiliaria: ${input}. Su ubicación, perfil de demanda y potencial de renta la convierten en una alternativa atractiva para evaluar retorno y plusvalía.`;
  }

  document.getElementById("aiOutput").textContent = output;
});

function showToast(text){
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

renderAll();
