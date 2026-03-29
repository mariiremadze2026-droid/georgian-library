let players = [];
let roles = [];
let current = 0;

// მოთამაშის დამატება
function addPlayer() {
  let name = document.getElementById("nameInput").value;
  if (!name) return;

  players.push(name);
  document.getElementById("players").innerText = players.join(", ");
  document.getElementById("nameInput").value = "";
}

// თამაში იწყება
function startGame() {
  if (players.length < 4) {
    alert("მინიმუმ 4 მოთამაშე!");
    return;
  }

  roles = [];
  let baseRoles = [
    "😈 მაფია",
    "💉 ექიმი",
    "🕵️ დეტექტივი",
    "👑 დონი",
    "🍷 ბარმენი",
    "🔪 სერიული მკვლელი",
    "🙂 მოქალაქე"
  ];

  roles.push("😈 მაფია");

  while (roles.length < players.length) {
    roles.push(baseRoles[Math.floor(Math.random() * baseRoles.length)]);
  }

  roles = roles.sort(() => Math.random() - 0.5);

  document.getElementById("setup").classList.add("hidden");
  document.getElementById("roleScreen").classList.remove("hidden");

  showPlayer();
}

// აჩვენე მოთამაშე
function showPlayer() {
  document.getElementById("playerName").innerText =
    players[current] + " 🔒";

  document.getElementById("roleBox").classList.add("hidden");
}

// ნახვა (იმპოსტერის სტილი)
function showRole() {
  let box = document.getElementById("roleBox");
  box.innerText = roles[current];
  box.classList.remove("hidden");
}

// შემდეგი მოთამაშე
function nextPlayer() {
  current++;

  if (current >= players.length) {
    startGamePhase();
    return;
  }

  showPlayer();
}

// თამაში იწყება
function startGamePhase() {
  document.getElementById("roleScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  document.getElementById("status").innerText =
    "🌙 თამაში დაიწყო";
}