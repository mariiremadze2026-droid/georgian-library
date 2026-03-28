// 📚 წიგნები
const books = [
  "ვეფხისტყაოსანი",
  "დიდოსტატის მარჯვენა",
  "დათა თუთაშხია"
];

// 🎨 მხატვრები
const artists = [
  {
    name: "ნიკო ფიროსმანი",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Niko_Pirosmani.jpg",
    bio: "ცნობილი ქართველი მხატვარი 🎨"
  },
  {
    name: "დავით კაკაბაძე",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/David_Kakabadze.jpg",
    bio: "ავანგარდული მხატვარი"
  }
];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// 📚 წიგნები
function showBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  books.forEach(book => {
    const li = document.createElement("li");
    li.textContent = book;
    list.appendChild(li);
  });
}

// 🎨 მხატვრები
function showArtists() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  artists.forEach(a => {
    const li = document.createElement("li");

    li.innerHTML = `
      <img src="${a.img}" style="width:200px;">
      <h3>${a.name}</h3>
      <p>${a.bio}</p>
      <button onclick="addFavorite('${a.name}')">❤️</button>
    `;

    list.appendChild(li);
  });
}

// ❤️ ფავორიტები
function addFavorite(name) {
  if (!favorites.includes(name)) {
    favorites.push(name);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("დაემატა ❤️");
  }
}

function showFavorites() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  favorites.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
}

// 🔍 ძებნა
function searchData() {
  const input = document.getElementById("search").value.toLowerCase();
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  const all = [...books, ...artists.map(a => a.name)];

  all
    .filter(item => item.toLowerCase().includes(input))
    .forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
}

// 📤 გაზიარება
function shareApp() {
  if (navigator.share) {
    navigator.share({
      title: "Georgian Library",
      text: "ნახე ეს აპი 📚",
      url: window.location.href
    });
  }
}

// 🤖 AI ჩატი
function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chatBox");

  const text = input.value;
  if (!text) return;

  chat.innerHTML += `<p class="user">🧑: ${text}</p>`;

  let response = "ვერ გავიგე 😅";

  if (text.includes("ფიროსმანი")) {
    response = "ნიკო ფიროსმანი იყო ცნობილი ქართველი მხატვარი 🎨";
  } else if (text.includes("გამარჯობა")) {
    response = "გამარჯობა 👋";
  }

  chat.innerHTML += `<p class="bot">🤖: ${response}</p>`;

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}