
const offers = [
    {
        id: "beach",
        name: "Stränder & pool",
        description: "En avkopplande dag med sol, bad och tillgång till pool.",
        pricePerHour: 250,
        imageUrl: "images/beach.jpg"
    },
    {
        id: "tours",
        name: "Turer",
        description: "Upptäck Atens sevärdheter och historia med en guidad tur.",
        pricePerHour: 400,
        imageUrl: "images/tours.jpg"
    },
    {
        id: "sports",
        name: "Sporter",
        description: "Träna i Atens vackeraste miljöer med våra sportturer.",
        pricePerHour: 350,
        imageUrl: "images/sports.jpg"
    }
];

function renderOffers() {
  // map ger en ny array med ett kort per lokal. join gör om arrayen till en enda text.
  const offerList = document.getElementById('offerList')
  offerList.innerHTML = offers.map(createOfferCard).join("");
}

function createOfferCard(offer) {
  return `
    <div class="col-md-4">
        <div class="card h-100 shadow-sm">
            <img src=${offer.imageUrl} class="card-img-top"
                    alt=${offer.name} style="height: 220px; object-fit: cover;">
            <div class="card-body">
                <h3 class="h5">${offer.name}</h3>
                <p>${offer.description}</p>
                <p class="fw-bold text-primary">${offer.pricePerHour} kr/person</p>
            </div>
        </div>
    </div>
  `;
}

renderOffers()