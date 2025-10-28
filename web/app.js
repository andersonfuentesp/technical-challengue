const API_BASE = "http://localhost:3000";

const grid = document.getElementById("grid");
const meta = document.getElementById("meta");
document.getElementById("load").addEventListener("click", load);

async function load(){
  const count = document.getElementById("count").value || 10;
  const gender = document.getElementById("gender").value;
  const nat = document.getElementById("nat").value.trim();

  const params = new URLSearchParams({ count });
  if (gender) params.set("gender", gender);
  if (nat) params.set("nat", nat);

  grid.innerHTML = "Cargando...";
  const res = await fetch(`${API_BASE}/api/users?${params.toString()}`);
  const data = await res.json();

  meta.textContent = `Total: ${data.meta.count}`;
  grid.innerHTML = "";
  data.users.forEach(u => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="row">
        <img src="${u.photo}" alt="${u.fullName}">
        <div>
          <div><strong>${u.fullName}</strong></div>
          <small>${u.gender} • ${new Date(u.dobISO).toLocaleDateString()}</small><br>
          <small>${u.location}</small><br>
          <a href="mailto:${u.email}">${u.email}</a>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// carga inicial
load();