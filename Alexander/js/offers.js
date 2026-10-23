// Varje lokal är ett objekt. Alla lokaler samlas i en array.
// Priset är ett tal så att vi kan räkna med det. Texten "kr" lägger vi till när priset visas.
const offers = [
  {
    id: "meeting",
    name: "Mötesrum",
    description: "Plats för åtta personer. Skärm och whiteboard ingår.",
    pricePerHour: 450
  },
  {
    id: "studio",
    name: "Podcaststudio",
    description: "Ljudisolerat rum med mikrofoner och mixer.",
    pricePerHour: 600
  },
  {
    id: "workshop",
    name: "Kreativ verkstad",
    description: "Arbetsbänkar och verktyg för dig som vill bygga och skapa.",
    pricePerHour: 350
  }
];

//Vi hämtar platsen där korten ska visas.
const offersList = document.querySelector("#offers");

//Det här värdet ändras när användaren väljer, så vi använder let.
//null betyder att inget är valt ännu.
let selectedOfferId = null;

//1185 blir "1 185 kr".
function formatPrice(amount) {
  return amount.toLocaleString("sv-SE") + " kr";
}

//En funktion bygger HTML för ett kort. En annan visar alla.
function createOfferCard(offer) {
  return `
    <button type="button" data-id="${offer.id}" aria-pressed="false"
      class="group flex flex-col rounded-xl border-2 border-slate-200 bg-white p-4 text-left shadow-sm hover:border-indigo-300 aria-pressed:border-indigo-600 aria-pressed:bg-indigo-50 cursor-pointer">
      <span class="text-lg font-semibold">${offer.name}</span>
      <span class="mt-1 text-sm text-slate-600">${offer.description}</span>
      <span class="mt-4 font-semibold">
        ${formatPrice(offer.pricePerHour)}
        <span class="text-sm font-normal text-slate-500">/ timme</span>
      </span>
      <span class="mt-3 text-sm text-slate-500 group-aria-pressed:hidden">Välj</span>
      <span class="mt-3 hidden text-sm font-semibold text-indigo-700 group-aria-pressed:block">✓ Vald</span>
    </button>
  `;
}

function renderOffers() {
  // map ger en ny array med ett kort per lokal. join gör om arrayen till en enda text.
  offersList.innerHTML = offers.map(createOfferCard).join("");
}

//Markera det valda kortet. CSS i Tailwind reagerar på aria-pressed.
function updateSelection() {
  for (const card of offersList.children) {
    card.setAttribute("aria-pressed", card.dataset.id === selectedOfferId);
  }
}

function handleOfferClick(event) {
  // En enda lyssnare på hela listan. closest letar uppåt från det som klickades
  // tills den hittar ett element med data-id. Klick mellan korten ger null.
  const card = event.target.closest("[data-id]");
  if (card === null) {
    return;
  }
  selectedOfferId = card.dataset.id;
  updateSelection();
}

renderOffers();
offersList.addEventListener("click", handleOfferClick);