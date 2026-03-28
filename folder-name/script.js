let players = [];
let roles = [];
let phase = "night";

function addPlayer() {
  let name = document.getElementById("playerName").value;
  if (!name) return;

  players.push({ name: name, role: "", alive: true });
  document.getElementById("playerName").value = "";
  renderPlayers();
}

function renderPlayers() {
  let ul = document.getElementById("players");
  ul.innerHTML = "";
  players.forEach(p => {
    let li = document.createElement("li");
    li.textContent = p.name;
    ul.appendChild(li);
  });
}

function startGame() {
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  assignRoles();
  showNight();
}

function assignRoles() {
  let shuffled = [...players].sort(() => Math.random() - 0.5);

  shuffled[0].role = "mafia";
  if (players.length > 2) shuffled[1].role = "doctor";
  if (players.length > 3) shuffled[2].role = "detective";

  players = shuffled;
}

function showNight() {
  document.getElementById("phase").textContent = "🌙 Night";
  let actions = document.getElementById("actions");
  actions.innerHTML = "";

  players.forEach(p => {
    if (!p.alive) return;

    let btn = document.createElement("button");
    btn.textContent = p.name;
    btn.onclick = () => killPlayer(p);
    actions.appendChild(btn);
  });
}

function showDay() {
  document.getElementById("phase").textContent = "☀️ Day";
  let actions = document.getElementById("actions");
  actions.innerHTML = "<h3>Vote someone</h3>";

  players.forEach(p => {
    if (!p.alive) return;

    let btn = document.createElement("button");
    btn.textContent = p.name;
    btn.onclick = () => votePlayer(p);
    actions.appendChild(btn);
  });
}

function killPlayer(p) {
  p.alive = false;
  showMessage(p.name + " მოკვდა 💀");
  checkWin();
}

function votePlayer(p) {
  p.alive = false;
  showMessage(p.name + " გააგდეს 🗳️");
  checkWin();
}

function nextPhase() {
  if (phase === "night") {
    phase = "day";
    showDay();
  } else {
    phase = "night";
    showNight();
  }
}

function showMessage(msg) {
  let info = document.getElementById("info");
  info.textContent = msg;
  info.classList.add("fade");

  setTimeout(() => info.classList.remove("fade"), 500);
}

function checkWin() {
  let mafia = players.filter(p => p.alive && p.role === "mafia").length;
  let citizens = players.filter(p => p.alive && p.role !== "mafia").length;

  if (mafia === 0) {
    alert("მოქალაქეებმა მოიგეს 🎉");
    location.reload();
  }

  if (mafia >= citizens) {
    alert("მაფიამ მოიგო 😈");
    location.reload();
  }
}