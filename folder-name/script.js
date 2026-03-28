let roles = [];
let alive = [];
let currentPlayer = 0;
let phase = "night";

let selectedKill = null;
let selectedHeal = null;

function startGame() {
  let num = document.getElementById("players").value;

  let rolesList = [
    "მაფია 😈",
    "მოქალაქე 🙂",
    "დეტექტივი 🕵️",
    "ექიმი 💉",
    "დონი 👑",
    "ბარმენი 🍷",
    "სერიული მკვლელი 🔪"
  ];

  roles = [];
  alive = [];

  for (let i = 0; i < num; i++) {
    roles.push(rolesList[Math.floor(Math.random()*rolesList.length)]);
    alive.push(true);
  }

  currentPlayer = 0;

  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";

  showPlayer();
}

function showPlayer() {
  document.getElementById("playerTitle").innerText =
    "მოთამაშე " + (currentPlayer + 1);

  document.getElementById("roleBox").style.display = "none";
}

function showRole() {
  showOverlay(roles[currentPlayer]);

  document.getElementById("roleText").innerText =
    roles[currentPlayer];

  document.getElementById("roleBox").style.display = "block";
}

function nextPlayer() {
  currentPlayer++;

  if (currentPlayer >= roles.length) {
    document.getElementById("playerTitle").innerText =
      "🎮 თამაში დაიწყო!";
    return;
  }

  showPlayer();
}

/* 🎬 overlay animation */
function showOverlay(text){
  let overlay = document.createElement("div");
  overlay.id="overlay";
  overlay.innerHTML = `<div id="overlayText">${text}</div>`;
  document.body.appendChild(overlay);

  overlay.style.display="flex";

  setTimeout(()=>{
    overlay.remove();
  },1500);
}

/* 🌙☀️ PHASE */
function nextPhase() {
  if (phase === "night") {
    phase = "day";
    document.getElementById("phaseText").innerText="☀️ დღე";
    showVoting();
  } else {
    phase = "night";
    document.getElementById("phaseText").innerText="🌙 ღამე";
    showNight();
  }
}

/* 🌙 NIGHT */
function showNight(){
  let html="<h3>🌙 ღამე</h3>";

  roles.forEach((r,i)=>{
    if(!alive[i]) return;

    html += `<button onclick="selectKill(${i})">🔫 ${i+1}</button>`;
    html += `<button onclick="selectHeal(${i})">💉 ${i+1}</button>`;
    html += `<button onclick="detect(${i})">🕵️ ${i+1}</button><br>`;
  });

  html += `<button onclick="resolveNight()">დასრულება</button>`;

  document.getElementById("voteArea").innerHTML=html;
}

function selectKill(i){ selectedKill=i; }
function selectHeal(i){ selectedHeal=i; }

function detect(i){
  alert("👉 "+roles[i]);
}

function resolveNight(){
  if(selectedKill!==null){
    if(selectedKill===selectedHeal){
      alert("გადარჩა 💉");
    }else{
      alive[selectedKill]=false;
      alert("მოკვდა 💀");
    }
  }

  selectedKill=null;
  selectedHeal=null;

  checkWin();
}

/* ☀️ DAY */
function showVoting(){
  let html="<h3>🗳️ Voting</h3>";

  roles.forEach((r,i)=>{
    if(alive[i]){
      html+=`<button onclick="voteOut(${i})">❌ ${i+1}</button>`;
    }
  });

  document.getElementById("voteArea").innerHTML=html;
}

function voteOut(i){
  alive[i]=false;
  alert("გავარდა ❌");
  checkWin();
}

/* 🏆 WIN */
function checkWin(){
  let mafia=0, citizens=0, serial=0;

  roles.forEach((r,i)=>{
    if(!alive[i]) return;

    if(r.includes("მაფია")||r.includes("დონი")) mafia++;
    else if(r.includes("სერიული")) serial++;
    else citizens++;
  });

  if(serial===1 && mafia===0 && citizens===0){
    endGame("🔪 სერიული მოიგო");
  }

  if(mafia>=citizens && mafia>0){
    endGame("🟥 მაფია მოიგო");
  }

  if(mafia===0){
    endGame("🟩 მოქალაქეები მოიგეს");
  }
}

function endGame(msg){
  document.body.innerHTML=
  `<h1>${msg}</h1><button onclick="location.reload()">🔄 თავიდან</button>`;
}