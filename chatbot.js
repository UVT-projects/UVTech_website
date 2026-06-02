const questionBank = [
  {
    keywords: ["date", "data", "cand", "când", "when", "iunie", "june", "iunie 2026", "june 2026"],
    answer: "UVTech Fest 2026 are loc pe 6 Iunie 2026."
  },
  {
    keywords: ["locatie", "unde", "where", "timisoara", "uvt", "campus", "adresa"],
    answer: "Evenimentul se desfasoara la Universitatea de Vest din Timisoara, Bd. Vasile Parvan 4."
  },
  {
    keywords: ["pret", "cost", "gratuit", "gratis", "free", "bilet", "taxa", "intrare", "bani"],
    answer: "Intrarea este libera pentru toti studentii UVT. Locurile pentru publicul general sunt limitate."
  },
  {
    keywords: ["speakeri", "speakers", "vorbitori", "invitati", "cine", "vine", "prezentatori"],
    answer: "Avem 15+ speakeri confirmati, printre care Dr. Andrei Popescu (AI & ML), Elena Ionescu (Web Dev) si Mihai Stoica (Cybersecurity)."
  },
  {
    keywords: ["inscriere", "inregistrare", "inscrie", "register", "participare", "cum ma inscriu"],
    answer: "Te poti inscrie prin pagina de Contact a site-ului. Inscrierea este gratuita pentru studenti."
  },
  {
    keywords: ["workshop", "workshops", "laborator", "practic", "hands-on", "activitati"],
    answer: "Sunt planificate 10+ workshop-uri practice in laboratoarele UVT pe parcursul celor 2 zile."
  },
  {
    keywords: ["trackuri", "track", "teme", "subiecte", "domenii", "topicuri"],
    answer: "Trackurile principale sunt: AI & Machine Learning, Web Development, Cybersecurity, Cloud & DevOps si Open Source & Community."
  },
  {
    keywords: ["program", "agenda", "orar", "schedule", "ora", "sesiuni"],
    answer: "Agenda detaliata este disponibila pe pagina Overview. Prima sesiune incepe la 10:00 in fiecare zi."
  },
  {
    keywords: ["online", "stream", "live", "remote", "de acasa", "virtual"],
    answer: "Da, evenimentul va fi transmis si online prin live stream. Poti selecta optiunea online la inscriere."
  },
  {
    keywords: ["contact", "email", "scrie", "intrebare", "mesaj"],
    answer: "Ne poti contacta la uvtechfest@e-uvt.ro sau prin pagina de Contact a site-ului."
  },
  {
    keywords: ["multumesc", "multumesc!", "Thank you!", "Thank you"],
    answer: "Cu drag, daca mai ai intrebari legate de eveniment, sunt aici!"
  },
  {
    keywords: ["uvie", "bot", "chatbot", "cine esti", "tu esti"],
    answer: "Sunt UVie, asistenta virtuala a UVTech Fest 2026! Intreaba-ma orice despre eveniment."
  }
];

const chatContainer = document.getElementById("chat-container");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender === "bot" ? "message--bot" : "message--user");

  const name = document.createElement("span");
  name.classList.add("message-name");
  name.textContent = sender === "bot" ? "UVie" : "Tu";

  const bubble = document.createElement("div");
  bubble.classList.add("message-bubble");
  bubble.textContent = text;

  msg.appendChild(name);
  msg.appendChild(bubble);
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getAnswer(input) {
  const normalized = input.toLowerCase().trim();
  for (const entry of questionBank) {
    if (entry.keywords.some(kw => normalized.includes(kw))) {
      return entry.answer;
    }
  }
  return "Imi pare rau, nu am un raspuns pentru asta. Te rog contacteaza-ne la uvtechfest@e-uvt.ro sau prin pagina de Contact.";
}

addMessage("Salut! Sunt UVie, asistenta UVTech Fest 2026. Cu ce te pot ajuta?", "bot");

chatForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const answer = getAnswer(text);
  setTimeout(function() {
    addMessage(answer, "bot");
  }, 300);
});
