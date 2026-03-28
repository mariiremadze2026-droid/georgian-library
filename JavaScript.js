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
    bio: "ავანგარდული ხელოვნების პიონერი"
  }
];

// 📚 წიგნები
const books = [
  { name: "ვეფხისტყაოსანი", author: "შოთა რუსთაველი" },
  { name: "დიდოსტატის მარჯვენა", author: "კონსტანტინე გამსახურდია" }
];

// 📚 წიგნები
function showBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  books.forEach(book => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="card">
        <h3>${book.name}</h3>
        <p>${book.author}</p>
        <button onclick="addToFavorites('${book.name}')">❤️</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// 🎨 მხატვრები (გალერია)
function showArtists() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  artists.forEach(artist => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="card">
        <img src="${artist.img}" onclick="openModal('${artist.img}', '${artist.name}', '${artist.bio}')">
        <h3>${artist.name}</h3>
        <p>${artist.bio}</p>
      </div>
    `;

    list.appendChild(li);
  });
}

// 🔍 ძებნა
function searchData() {
  const input = document.getElementById("search").value.toLowerCase();
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  books.filter(b => b.name.toLowerCase().includes(input))
    .forEach(book => {
      list.innerHTML += `<li>${book.name}</li>`;
    });

  artists.filter(a => a.name.toLowerCase().includes(input))
    .forEach(artist => {
      list.innerHTML += `<li>${artist.name}</li>`;
    });
}

// ❤️ ფავორიტები
function addToFavorites(name) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs.push(name);
  localStorage.setItem("favorites", JSON.stringify(favs));
  alert("დაემატა ❤️");
}

// 📸 Modal
function openModal(img, name, bio) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modalImg").src = img;
  document.getElementById("modalTitle").innerText = name;
  document.getElementById("modalText").innerText = bio;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// 🤖 AI
function sendMessage() {
  const input = document.getElementById("chatInput");
  const chat = document.getElementById("chat");

  const text = input.value.toLowerCase();
  if (!text) return;

  chat.innerHTML += `<p class="user">🧑 ${text}</p>`;

  let response = "ვერ გავიგე 😅";

  if (text.includes("ფიროსმანი")) {
    response = "ნიკო ფიროსმანი იყო ცნობილი ქართველი მხატვარი 🎨";
  } else if (text.includes("წიგნი")) {
    response = "საქართველოში ბევრი ცნობილი წიგნია 📚";
  } else if (text.includes("გამარჯობა")) {
    response = "გამარჯობა 👋";
  }

  chat.innerHTML += `<p class="bot">🤖 ${response}</p>`;

  input.value = "";
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

// 📱 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}