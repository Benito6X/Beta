const properties = [
  {
    id:"p1",
    title:"PH Costa del Este",
    location:"Costa del Este",
    operation:"Alquiler",
    price:"$1,850/mes",
    beds:2,baths:2,parking:2,meters:118,status:"Disponible",
    img:"url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop')"
  },
  {
    id:"p2",
    title:"Apartamento Parque Omar",
    location:"San Francisco",
    operation:"Venta",
    price:"$245,000",
    beds:3,baths:2,parking:2,meters:142,status:"Disponible",
    img:"url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop')"
  },
  {
    id:"p3",
    title:"Oficina lista Obarrio",
    location:"Obarrio",
    operation:"Alquiler",
    price:"$1,200/mes",
    beds:0,baths:1,parking:1,meters:78,status:"Reservado",
    img:"url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop')"
  }
];

const clients = [
  {name:"María González", phone:"+507 6000-0001", status:"Interesado", looking:"Alquiler 2 recámaras", zone:"Costa del Este", budget:"$1,500 - $2,000", next:"Enviar ficha de PH Costa del Este"},
  {name:"Carlos Medina", phone:"+507 6000-0002", status:"Nuevo", looking:"Compra inversión", zone:"San Francisco", budget:"$220k - $280k", next:"Calificar banco y retorno"},
  {name:"Ana Rivera", phone:"+507 6000-0003", status:"Visitó", looking:"Oficina pequeña", zone:"Obarrio", budget:"$900 - $1,300", next:"Enviar comparación"},
  {name:"Luis Paredes", phone:"+507 6000-0004", status:"Negociación", looking:"Apartamento ejecutivo", zone:"Punta Pacífica", budget:"$2,000 - $2,800", next:"Confirmar visita sábado"}
];

let filter = "all";
let tone = "premium";

function messageFor(p){
  return `Hola, te comparto esta propiedad: ${p.title} en ${p.location}. ${p.beds} recámaras, ${p.baths} baños, ${p.parking} estacionamientos y ${p.meters} m². Precio: ${p.price}. ¿Deseas coordinar una visita?`;
}

function propertyCard(p, wide=false){
  return `
    <article class="property-card ${wide ? "wide" : ""}">
      <div class="property-photo" style="--img:${p.img}">
        <span class="pill photo-badge">${p.status}</span>
      </div>
      <div class="price">${p.price}</div>
      <h3>${p.title}</h3>
      <p>${p.location} · ${p.operation}</p>
      <div class="property-meta">
        <span>${p.beds} rec.</span>
        <span>${p.baths} baños</span>
        <span>${p.parking} est.</span>
        <span>${p.meters} m²</span>
      </div>
      <div class="card-actions">
        <button class="small-btn primary" onclick="copyWhatsApp('${p.id}')">WhatsApp</button>
        <button class="small-btn" onclick="openFicha('${p.id}')">Ficha</button>
      </div>
    </article>
  `;
}

function clientCard(c){
  return `
    <article class="client-card">
      <div class="client-top">
        <div>
          <h3>${c.name}</h3>
          <p>${c.phone}</p>
        </div>
        <span class="status">${c.status}</span>
      </div>
      <p><b>Busca:</b> ${c.looking}</p>
      <p><b>Zona:</b> ${c.zone}</p>
      <p><b>Presupuesto:</b> ${c.budget}</p>
      <p style="margin-top:10px;color:var(--gold)"><b>Próximo:</b> ${c.next}</p>
    </article>
  `;
}

function render(){
  const home = document.getElementById("homeProperties");
  const feed = document.getElementById("propertyFeed");
  const clientFeed = document.getElementById("clientFeed");
  const q = (document.getElementById("propertySearch")?.value || "").toLowerCase();

  if(home) home.innerHTML = properties.map(p => propertyCard(p)).join("");

  if(feed){
    const list = properties.filter(p => {
      const okFilter = filter === "all" || p.operation === filter || p.status === filter;
      const text = `${p.title} ${p.location} ${p.price} ${p.status} ${p.operation}`.toLowerCase();
      return okFilter && text.includes(q);
    });
    feed.innerHTML = list.map(p => propertyCard(p,true)).join("");
  }

  if(clientFeed) clientFeed.innerHTML = clients.map(clientCard).join("");
}

function setView(view){
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(view).classList.add("active");

  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });

  window.scrollTo({top:0, behavior:"smooth"});
}

document.querySelectorAll("[data-view]").forEach(btn => {
  btn.addEventListener("click", () => setView(btn.dataset.view));
});

document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => setView(btn.dataset.go));
});

document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  });
});

document.querySelectorAll(".tone").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tone").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    tone = btn.dataset.tone;
  });
});

document.getElementById("propertySearch").addEventListener("input", render);

document.getElementById("themeToggle").addEventListener("click", () => {
  const light = document.documentElement.dataset.theme === "light";
  document.documentElement.dataset.theme = light ? "" : "light";
});

document.getElementById("smartFollowBtn").addEventListener("click", () => {
  copyText("Hola María, buen día. Te comparto una opción en Costa del Este que encaja con lo que estás buscando. Si te parece bien, puedo coordinarte una visita esta semana.");
  toast("Mensaje de seguimiento copiado");
});

function copyWhatsApp(id){
  const p = properties.find(x => x.id === id);
  copyText(messageFor(p));
  toast("Mensaje copiado para WhatsApp");
}

function copyText(text){
  if(navigator.clipboard) navigator.clipboard.writeText(text);
}

function openFicha(id){
  const p = properties.find(x => x.id === id);
  const msg = encodeURIComponent(messageFor(p));
  const win = window.open("", "_blank", "width=430,height=760");
  win.document.write(`
    <html>
    <head>
      <title>${p.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body{margin:0;background:#07111F;color:#fff;font-family:Inter,system-ui,sans-serif;padding:14px}
        .card{overflow:hidden;border-radius:30px;background:#13263D;border:1px solid rgba(255,255,255,.12)}
        .img{height:310px;background:${p.img};background-size:cover;background-position:center}
        .body{padding:20px}
        h1{font-size:42px;line-height:.9;letter-spacing:-.075em;margin:0 0 10px}
        p{color:#94A6BC;line-height:1.55}
        .price{color:#DBB760;font-size:34px;font-weight:1000}
        .meta{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}
        .meta span{background:rgba(255,255,255,.08);border-radius:999px;padding:8px 10px;color:#94A6BC}
        a{display:block;text-align:center;text-decoration:none;margin-top:18px;padding:15px;border-radius:18px;background:linear-gradient(135deg,#20E6A3,#4F8DFF);color:#06110F;font-weight:1000}
      </style>
    </head>
    <body>
      <div class="card">
        <div class="img"></div>
        <div class="body">
          <div class="price">${p.price}</div>
          <h1>${p.title}</h1>
          <p>${p.location} · ${p.operation}</p>
          <div class="meta">
            <span>${p.beds} rec.</span><span>${p.baths} baños</span><span>${p.parking} est.</span><span>${p.meters} m²</span>
          </div>
          <p>Ficha demo profesional creada desde Propix Agent. En la versión real esta ficha tendrá link público, PDF y agenda.</p>
          <a href="https://wa.me/?text=${msg}" target="_blank">Enviar por WhatsApp</a>
        </div>
      </div>
    </body>
    </html>
  `);
  win.document.close();
}

const sheet = document.getElementById("propertySheet");
document.querySelectorAll(".open-sheet").forEach(btn => {
  btn.addEventListener("click", () => sheet.classList.add("active"));
});
document.querySelector(".close-sheet").addEventListener("click", () => sheet.classList.remove("active"));
sheet.addEventListener("click", e => {
  if(e.target === sheet) sheet.classList.remove("active");
});

document.getElementById("saveProperty").addEventListener("click", () => {
  properties.unshift({
    id:"p"+Date.now(),
    title:document.getElementById("newTitle").value || "Nueva propiedad en Panamá",
    location:document.getElementById("newLocation").value || "Panamá",
    operation:"Alquiler",
    price:document.getElementById("newPrice").value || "$1,500/mes",
    beds:2,baths:2,parking:1,meters:95,status:"Disponible",
    img:"url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop')"
  });
  sheet.classList.remove("active");
  render();
  setView("properties");
  toast("Propiedad creada");
});

document.getElementById("generateText").addEventListener("click", () => {
  const input = document.getElementById("aiInput").value.trim() || "Apartamento moderno en Panamá, excelente ubicación, buena iluminación y listo para ocupar.";
  let out = "";

  if(tone === "premium"){
    out = `Propiedad con presencia, buena distribución y una ubicación estratégica. ${input} Ideal para quienes buscan comodidad, imagen y una experiencia residencial superior.`;
  } else if(tone === "whatsapp"){
    out = `Hola, te comparto esta opción: ${input} Si deseas, puedo enviarte la ficha completa o coordinar una visita.`;
  } else {
    out = `Oportunidad inmobiliaria para evaluar: ${input} Por ubicación, demanda y potencial de renta, puede ser una opción interesante para inversión.`;
  }

  document.getElementById("aiOutput").textContent = out;
});

function toast(text){
  const el = document.getElementById("toast");
  el.textContent = text;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2100);
}

render();
