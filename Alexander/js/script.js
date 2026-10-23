
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
    <div class="col-md-4 ">
        <div class="card h-100 shadow-sm cardMain">
            <img src="${offer.imageUrl}" class="card-img-top"
                 alt="${offer.name}" style="height: 220px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
                <h3 class="h5">${offer.name}</h3>
                <p>${offer.description}</p>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                    <p class="fw-bold text-primary mb-0">${offer.pricePerHour} kr/person</p>
                    <button class="btn btn-primary" id=${offer.id}>Boka</button>
                </div>
            </div>
        </div>
    </div>
  `;
}


let selectedOffer = null;

function selectOffer() {
    offers.forEach(offer => {
        const offerButton = document.getElementById(offer.id);

        offerButton.addEventListener('click', () => {

            // Ta bort markeringen från alla knappar
            offers.forEach(otherOffer => {
                const otherButton = document.getElementById(otherOffer.id);
                otherButton.classList.remove('Selected');
            });

            // Markera den valda knappen
            offerButton.classList.add('Selected');

            // Spara det valda erbjudandet
            selectedOffer = offer;
            console.log(selectedOffer)

            // Visa formulär
            showForm()
            updateForm()
        });
    });
}

function showForm () {
    const form = document.getElementById('form')
    form.classList.add('active')
}

function hideForm () {
    const form = document.getElementById('form')
    form.classList.remove('active')
}

function clearForm () {
    const firstName = document.getElementById("firstName");
    firstName.value = ''
    const lastName = document.getElementById("lastName");
    lastName.value = ''
    const email = document.getElementById("email");
    email.value = ''
    const people = document.getElementById("people");
    people.value = 1
}

function resetBooking () {
    const resetButton = document.getElementById('resetBooking');
    resetButton.addEventListener('click', () => {
        hideForm()
        clearForm()
    })
}

function updateForm() {
    const formTitle = document.getElementById("formTitle");
    formTitle.textContent = selectedOffer.name

    const formPrice = document.getElementById("formPrice");
    formPrice.textContent = selectedOffer.pricePerHour + " kr/person"

    updatePrice(selectedOffer.pricePerHour)
}

function totalPrice() {
    const people = document.getElementById("people")

    let numberOfPeople = null
    let price = null

    people.addEventListener('input', () => {
        
        numberOfPeople = people.value

        price = numberOfPeople * selectedOffer.pricePerHour

        updatePrice(price)
    })    
}

function updatePrice(price) {
    const formTotal = document.getElementById("formTotal");
    formTotal.textContent = price + " kr"
}


renderOffers()
selectOffer()
resetBooking()
totalPrice()
