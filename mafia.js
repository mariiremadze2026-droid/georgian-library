function getRole() {
  const roles = ["მაფია 🕶️", "მოქალაქე 🙂", "ექიმი 🏥", "პოლიციელი 🚓"];
  const random = Math.floor(Math.random() * roles.length);

  document.getElementById("role").innerText = "შენი როლი: " + roles[random];
}