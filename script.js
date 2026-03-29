function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}

// NAVIGATION
function goHome() {
  showPage("home");
}

function goBooks() {
  showPage("books");
}

function goArtists() {
  showPage("artists");
}

// ACTIONS
function send() {
  let msg = document.getElementById("message").value;
  alert("გაიგზავნა: " + msg);
}

function share() {
  alert("გაზიარება 📩");
}