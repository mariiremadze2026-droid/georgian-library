let players = [];
let roles = [];
let alive = [];
let current = 0;

function add() {
  let n = document.getElementById("name").value;
  if (!n) return;

  players.push(n);
  alive.push(true);

  document.getElementById("players").innerHTML += `<div>${n}</div>`;
  document.getElementById("name").value = "";
}

function start() {
  if (players.length < 6) {
    alert("მინიმუმ 6 მოთამაშე!");
    return;
  }

  roles = [];

  let mafiaCount = Math.floor(players.length / 3);

  for (let i = 0; i < mafiaCount; i++) roles.push("🟥 მაფია");

  roles.push("👑 დონი");
  roles.push("🟦 დეტექტივი");
  roles.push("🟨 ექიმი");
  roles.push("🍷 ბარმენი");
  roles.push("🔪 სერიული მკვლელი");

  while (roles.length < players.length) {
    roles.push("🟩 მოქალაქე");
  }

  roles.sort(() => Math.random() - 0.5);

  current = 0;

  document.getElementById("game").classList.remove("hidden");

  show();
}

function show() {
  document.getElementById("role").innerText =
    players[current] + " 👉 " + roles[current];
}

function next() {
  current++;

  if (current >= players.length) {
    document.getElementById("role").innerText = "🎮 თამაში დაიწყო!";
    return;
  }

  show();
}

function night() {
  document.getElementById("phase").innerText = "🌙 ღამე";

  let actions = "";

  players.forEach((p, i) => {
    if (!alive[i]) return;

    if (roles[i].includes("მაფია") || roles[i].includes("დონი")) {
      actions += `<button onclick="kill(${i})">🔫 მოკალი ${p}</button>`;
    }

    if (roles[i].includes("ექიმი")) {
      actions += `<button onclick="heal(${i})">❤️ გადაარჩინე ${p}</button>`;
    }

    if (roles[i].includes("დეტექტივი")) {
      actions += `<button onclick="check(${i})">🔍 შეამოწმე ${p}</button>`;
    }

    if (roles[i].includes("სერიული")) {
      actions += `<button onclick="kill(${i})">🔪 მოკალი ${p}</button>`;
    }
  });

  document.getElementById("actions").innerHTML = actions;
}

function day() {
  document.getElementById("phase").innerText = "☀️ დღე";

  let vote = "";

  players.forEach((p, i) => {
    if (!alive[i]) return;
    vote += `<button onclick="voteOut(${i})">❌ გააგდე ${p}</button>`;
  });

  document.getElementById("actions").innerHTML = vote;
}

function kill(i) {
  alive[i] = false;
  alert(players[i] + " მოკვდა 💀");
}

function heal(i) {
  alive[i] = true;
  alert(players[i] + " გადარჩა ❤️");
}

function check(i) {
  alert(players[i] + " არის 👉 " + roles[i]);
}

function voteOut(i) {
  alive[i] = false;
  alert(players[i] + " გააგდეს ❌");
}