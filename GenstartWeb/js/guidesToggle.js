document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggle-mode");
  const contentBox = document.getElementById("content-box");
  const title = document.getElementById("mode-title");
  const list = document.getElementById("mode-list");
  const label = document.getElementById("mode-label");

  if (!toggle || !contentBox || !title || !list || !label) return;

  const material = contentBox.dataset.material;

  const content = {
    "e-waste": {
      dos: {
        title: "Det her må du gerne gøre",
        items: [
          "✅ Aflever elektronik på genbrugsstationen",
          "✅ Fjern batterier inden aflevering",
          "✅ Brug e-mærkede indsamlingsbokse i butikker"
        ]
      },
      donts: {
        title: "Det her skal du undgå!",
        items: [
          "❌ Smid ikke elektronik i almindeligt skrald",
          "❌ Undgå at blande batterier med andet affald",
          "❌ Brug ikke husholdningsskrald til kabler og devices"
        ]
      }
    },
    "biohazard": {
      dos: {
        title: "Sikker håndtering af biohazard",
        items: [
          "✅ Brug kanylebokse eller sikre beholdere",
          "✅ Aflever medicin på apoteket",
          "✅ Marker tydeligt farligt affald"
        ]
      },
      donts: {
        title: "Undgå disse fejl!",
        items: [
          "❌ Smid aldrig kanyler i almindelig skraldespand",
          "❌ Skyl ikke medicin ud i toilettet",
          "❌ Bland ikke biohazard med elektronik eller papir"
        ]
      }
    }
    // Tilføj flere materialer her...
  };

  toggle.addEventListener("change", () => {
    const mode = toggle.checked ? "donts" : "dos";
    const data = content[material]?.[mode];

    if (data) {
      contentBox.classList.toggle("dos-theme", mode === "dos");
      contentBox.classList.toggle("donts-theme", mode === "donts");
      title.textContent = data.title;
      label.textContent = mode === "dos" ? "Do's" : "Don'ts";
      list.innerHTML = data.items.map(item => `<li>${item}</li>`).join("");
    }
  });

  // Scroll animation til scrolly-cards (fx nedbrydningstider)
  const cards = document.querySelectorAll(".scrolly-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});
