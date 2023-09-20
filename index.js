const cardsContainer = document.querySelector("#cards");
const pairs = {
  A: "🐶",
  B: "🐱",
  C: "🐭",
  D: "🐹",
  E: "🐰",
  F: "🦊",
  G: "🐻",
  H: "🐼",
  I: "🐨",
};

let prevCard = null;
let score = 0;

function renderCards() {
  const CardTemplate = (key, value) => `
  <div class="flip-card" data-key="${key}">
    <div class="flip-card-inner">
      <div class="flip-card-front"></div>
      <div class="flip-card-back">
        <h1>${value}</h1> 
      </div>
    </div>
  </div>
  `;

  let cards = [];
  Object.keys(pairs).forEach((key) => {
    const a = CardTemplate(key, pairs[key]);
    const b = CardTemplate(key, key);
    cards.push(a);
    cards.push(b);
  });
  cards = cards.sort(() => Math.random() - 0.5);
  cardsContainer.innerHTML = cards.join(" ");
}
renderCards();

document.querySelectorAll(".flip-card").forEach((currentCard) => {
  currentCard.addEventListener("click", () => {
    debugger;
    if (currentCard === prevCard) return;

    currentCard.dataset.flipped = true;

    if (prevCard === null) {
      prevCard = currentCard;
      return;
    }

    // comparar ambas iguales
    const keyA = prevCard.dataset.key;
    const keyB = currentCard.dataset.key;

    // no son iguales
    if (keyA !== keyB) {
      setTimeout(() => {
        prevCard.dataset.flipped = false;
        currentCard.dataset.flipped = false;
        prevCard = null;
      }, 500);
      return;
    }

    // si son iguales
    prevCard = null;
    score++;

    // ganaste
    if (score === Object.keys(pairs).length) {
      setTimeout(() => {
        alert("You win!");
      }, 500);
    }
  });
});
