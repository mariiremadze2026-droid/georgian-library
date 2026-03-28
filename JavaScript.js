// 📚 წიგნები
const books = [
  {
    name: "ვეფხისტყაოსანი",
    author: "შოთა რუსთაველი"
  },
  {
    name: "დიდოსტატის მარჯვენა",
    author: "კონსტანტინე გამსახურდია"
  },
  {
    name: "დათა თუთაშხია",
    author: "ჭაბუა ამირეჯიბი"
  },
  {
    name: "მე, ბებია, ილიკო და ილარიონი",
    author: "ნოდარ დუმბაძე"
  }
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
    bio: "ავანგარდული ხელოვნების პიონერი"
  },
  {
    name: "ელენე ახვლედიანი",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/59/Elene_Akhvlediani.jpg",
    bio: "თბილისის ხედების მხატვარი"
  }
];

// 📚 წიგნების ჩვენება
function showBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  books.forEach(book => {
    const li = document.createElement("li");

    li.innerHTML = `
      <h3>${book.name}</h3>
      <p>✍️ ${book.author}</p>
    `;

    list.appendChild(li);
  });
}

// 🎨 მხატვრების ჩვენება
function showArtists() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  artists.forEach(artist => {
    const li = document.createElement("li");

    li.innerHTML = `
      <img src="${artist.img}" style="width:200px; border-radius:10px;">
      <h3>${artist.name}</h3>
      <p>${artist.bio}</p>
    `;

    list.appendChild(li);
  });
}

// 🔍 ძებნა (ორივეზე მუშაობს)
function searchData() {
  const input = document.getElementById("search").value.toLowerCase();
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  const allBooks = books.filter(b =>
    b.name.toLowerCase().includes(input)
  );

  const allArtists = artists.filter(a =>
    a.name.toLowerCase().includes(input)
  );

  allBooks.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `<h3>${book.name}</h3><p>${book.author}</p>`;
    list.appendChild(li);
  });

  allArtists.forEach(artist => {
    const li = document.createElement("li");
    li.innerHTML = `<h3>${artist.name}</h3>`;
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
  }
  else if (text.includes("ვეფხისტყაოსანი")) {
    response = "ვეფხისტყაოსანი დაწერა შოთა რუსთაველმა 📚";
  }
  else if (text.includes("გამარჯობა")) {
    response = "გამარჯობა 👋";
  }

  chat.innerHTML += `<p class="bot">🤖: ${response}</p>`;

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}