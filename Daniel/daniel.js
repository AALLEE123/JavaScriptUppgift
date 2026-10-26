
// ERBJUDANDEN
// Varje erbjudande är ett objekt.
// Alla erbjudanden samlas i en array som heter offers.
const offers = [
    {
        id: "acropolis",
        name: "Guidad tur vid Akropolis",
        description: "Följ med på en guidad tur bland antikens monument.",
        price: 450
    },
    {
        id: "museum",
        name: "Museibesök",
        description: "Upptäck Atens historia genom museernas samlingar.",
        price: 300
    },
    {
        id: "walk",
        name: "Historisk stadsvandring",
        description: "Se historiska kvarter och landmärken till fots.",
        price: 250
    }
];

// Tillåtna gränser för antal personer.
const MIN_GUESTS = 1;
const MAX_GUESTS = 5;
const GUESTS_ERROR = `Ange ett heltal mellan ${MIN_GUESTS} och ${MAX_GUESTS} personer.`;



// HÄMTA ELEMENT FRÅN HTML


// Hämta platsen där erbjudandena ska visas
const offersContainer = document.querySelector("#offers");
const offerError = document.querySelector("#offerError");

// Hämta namn- och e-postfälten samt platserna för deras felmeddelanden
const visitorName = document.querySelector("#visitorName");
const visitorEmail = document.querySelector("#visitorEmail");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");

// Hämta inputfältet där användaren skriver antal personer
const guests = document.querySelector("#guests");

// Hämta platsen där ett felmeddelande om antal personer visas
const guestsError = document.querySelector("#guestsError");

// Hämta platsen för totalpriset
const totalPrice = document.querySelector("#totalPrice");
const bookingForm = document.querySelector("#bookingForm");
const resetButton = document.querySelector("#resetButton");

// Ange standardvärdet här i JavaScript i stället för i HTML.
guests.value = "1";



// VISA ERBJUDANDENA PÅ SIDAN


function showOffers() {
    let offersHTML = "";

    // Loopen går igenom ett erbjudande i taget och lägger till dess HTML.
    for (let i = 0; i < offers.length; i++) {
        const offer = offers[i];
        offersHTML += `
            <div class="col-md-4">
                <div class="card shadow-sm h-100">
                    <label class="card-body d-flex flex-column p-4" for="offer-${offer.id}">
                        <span class="form-check mb-3">
                            <input class="form-check-input" type="radio" name="offer"
                                id="offer-${offer.id}" value="${offer.id}">
                            <span class="form-check-label fw-semibold">${offer.name}</span>
                        </span>
                        <span class="text-secondary mb-3">${offer.description}</span>
                        <span class="mt-auto fw-semibold">${offer.price} kr / person</span>
                    </label>
                </div>
            </div>
        `;
    }

    // Visa alla erbjudanden på sidan.
    offersContainer.innerHTML = offersHTML;
}



// RÄKNA UT OCH VISA PRISET


function calculatePrice() {
    // Hämta det radioalternativ som användaren har valt
    const selectedOffer = document.querySelector('input[name="offer"]:checked');

    // Om inget erbjudande är valt visar vi ingen uträkning
    if (selectedOffer ===  null) {
        totalPrice.textContent = "Välj ett erbjudande för att se totalpriset.";
        return;
    }

    // Visa inget pris om antalet inte kan användas, men validera inte fältet här.
    const numberOfGuests = Number(guests.value);
    if (!Number.isInteger(numberOfGuests) ||
        numberOfGuests < MIN_GUESTS ||
        numberOfGuests > MAX_GUESTS) {
        totalPrice.textContent = "-";
        return;
    }

    // Leta upp erbjudandet i arrayen med hjälp av dess id
    const offer = offers.find(function (item) {
        return item.id === selectedOffer.value;
    });

    // Multiplicera priset per person med antalet personer
    const total = offer.price * numberOfGuests;

    // Visa totalpriset på sidan
    totalPrice.textContent = total + " kr";
}



// VALIDERRINGSFUNKTIONERNA


function validateName() {
    // trim tar bort blanksteg i början och slutet av namnet.
    if (visitorName.value.trim() === "") {
        nameError.textContent = "Ange ditt namn.";
        return false;
    }

    nameError.textContent = "";
    return true;
}

function validateEmail() {
    const email = visitorEmail.value.trim();

    // Kontrollera att adressen har text före och efter @, en punkt i domänen
    // och inga blanksteg.
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
        emailError.textContent = "Ange en giltig e-postadress, till exempel namn@exempel.se.";
        return false;
    }

    emailError.textContent = "";
    return true;
}

function validateGuests() {
    const numberOfGuests = Number(guests.value);
    const guestsAreValid = Number.isInteger(numberOfGuests) &&
        numberOfGuests >= MIN_GUESTS &&
        numberOfGuests <= MAX_GUESTS;

    guestsError.textContent = guestsAreValid ? "" : GUESTS_ERROR;
    return guestsAreValid;
}

function validateOffer() {
    const selectedOffer = document.querySelector('input[name="offer"]:checked');
    const offerIsValid = selectedOffer !== null;

    offerError.textContent = offerIsValid ? "" : "Välj ett erbjudande.";
    return offerIsValid;
}

// Rensa felmeddelanden när formuläret återställs.
function resetForm() {
    // reset namn, e-post och valt erbjudande.
    bookingForm.reset();

    nameError.textContent = "";
    emailError.textContent = "";
    offerError.textContent = "";
    guestsError.textContent = "";
    guests.value = "1";
    totalPrice.textContent = "Välj ett erbjudande för att se totalpriset.";
}



// STARTA OCH LYSSNA PÅ ÄNDRINGAR


// Skapa och visaoffers när html laddas
showOffers();

// Lyssna på ändringar i erbjudandelistan och antalet personer
offersContainer.addEventListener("change", calculatePrice);
guests.addEventListener("input", calculatePrice);

// Kontrollera namn och e-post när formuläret skickas.
bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    validateName();
    validateEmail();
    validateGuests();
    validateOffer();
});

// Kör resetForm när användaren trycker på "Börja om".
resetButton.addEventListener("click", resetForm);
