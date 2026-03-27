const books = [
  "ვეფხისტყაოსანი",
  "დიდოსტატის მარჯვენა",
  "მე, ბებია, ილიკო და ილარიონი",
  "დათა თუთაშხია",
  "შუშანიკის წამება"
];

const list = document.getElementById("bookList");
const search = document.getElementById("search");

function showBooks(filter = "") {
  list.innerHTML = "";

  books
    .filter(book => book.includes(filter))
    .forEach(book => {
      const li = document.createElement("li");
      li.textContent = book;
      list.appendChild(li);
    });
}

search.addEventListener("input", () => {
  showBooks(search.value);
});

showBooks();

// გაზიარება
function shareApp() {
  if (navigator.share) {
    navigator.share({
      title: "Georgian Library",
      text: "ნახე ეს ქართული წიგნების აპი 📚",
      url: window.location.href
    });
  } else {
    alert("გაზიარება არ მუშაობს ამ მოწყობილობაზე");
  }
}