const rooms = [
  {name:"Kanto Reborn", icon:"🔥", desc:"Una aventura clásica de Kanto con reglas renovadas y retos especiales.", region:"KANTO", diff:"Media", players:342, online:true, rating:4.9},
  {name:"Johto Eclipse", icon:"🌙", desc:"Explora Johto bajo un misterioso eclipse y descubre nuevos eventos.", region:"JOHTO", diff:"Difícil", players:218, online:true, rating:4.8},
  {name:"Hoenn Legends", icon:"🌊", desc:"Una campaña de Hoenn centrada en exploración, combates y secretos.", region:"HOENN", diff:"Fácil", players:176, online:true, rating:4.7},
  {name:"Sinnoh Origins", icon:"❄️", desc:"Aventura de Sinnoh con progresión alternativa y equipos especiales.", region:"SINNOH", diff:"Media", players:154, online:true, rating:4.6},
  {name:"Unova Blackout", icon:"⚡", desc:"Una región afectada por un apagón global. Solo los mejores avanzan.", region:"UNOVA", diff:"Difícil", players:129, online:true, rating:4.8},
  {name:"Paldea Frontier", icon:"🟣", desc:"Una experiencia abierta inspirada en Paldea con desafíos comunitarios.", region:"PALDEA", diff:"Media", players:95, online:false, rating:4.5}
];

const grid = document.getElementById("roomGrid");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

function renderRooms(){
  const q = search.value.toLowerCase().trim();
  const f = filter.value;
  const list = rooms.filter(r=>{
    const matchesText = `${r.name} ${r.region} ${r.desc}`.toLowerCase().includes(q);
    const matchesFilter =
      f==="all" ||
      (f==="online" && r.online) ||
      (f==="easy" && r.diff==="Fácil") ||
      (f==="medium" && r.diff==="Media") ||
      (f==="hard" && r.diff==="Difícil");
    return matchesText && matchesFilter;
  });

  grid.innerHTML = list.length ? list.map(r=>`
    <article class="room-card">
      <div class="room-top">
        <div class="room-icon">${r.icon}</div>
        <span class="live">${r.online ? "● ONLINE" : "● OFFLINE"}</span>
      </div>
      <h3>${r.name}</h3>
      <p>${r.desc}</p>
      <div class="tags"><span class="tag">${r.region}</span><span class="tag">${r.diff}</span></div>
      <div class="room-bottom">
        <span class="players">👥 ${r.players} jugadores</span>
        <button class="enter" onclick="joinRoom('${r.name.replace(/'/g,"\\'")}')">ENTRAR →</button>
      </div>
    </article>`).join("") : `<div style="grid-column:1/-1;color:#73819a;padding:40px;text-align:center">No se encontraron Rooms.</div>`;
}
search.addEventListener("input", renderRooms);
filter.addEventListener("change", renderRooms);

function joinRoom(name){
  showToast(`Conectando con ${name}...`);
}

const ranking = [...rooms].sort((a,b)=>b.players-a.players).slice(0,5);
document.getElementById("rankingList").innerHTML = ranking.map((r,i)=>`
  <div class="rank-row">
    <span class="rank-number">#${i+1}</span>
    <div class="rank-name">${r.icon} ${r.name}<small>${r.region} • ${r.diff}</small></div>
    <span class="rank-players">👥 ${r.players} online</span>
    <span class="stars">★★★★★</span>
  </div>
`).join("");

document.getElementById("roomForm").addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("roomName").value.trim();
  const region = document.getElementById("region").value.trim();
  const diff = document.getElementById("difficulty").value;
  const desc = document.getElementById("description").value.trim();
  if(!name || !region || !desc) return;
  rooms.unshift({name,icon:"⚡",desc,region:region.toUpperCase(),diff,players:0,online:true,rating:5});
  renderRooms();
  e.target.reset();
  showToast(`"${name}" fue creada correctamente.`);
  location.hash = "rooms";
});

function showToast(message){
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(()=>toast.classList.remove("show"),2500);
}

let count = 1284;
setInterval(()=>{
  count += Math.random() > .5 ? 1 : -1;
  document.getElementById("onlineCount").textContent = count.toLocaleString("en-US");
},3500);

renderRooms();
