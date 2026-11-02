// Här ligger alla erbjudanden samlade, så både korten och bokningsbekräftelsen
// kan hämta namn och pris från samma ställe.
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

const MIN_GUESTS = 1;
const MAX_GUESTS = 5;
const GUESTS_ERROR = `Ange ett heltal mellan ${MIN_GUESTS} och ${MAX_GUESTS} personer.`;
const NO_OFFER_MESSAGE = "Välj ett erbjudande för att se totalpriset.";

// Vi hämtar fälten en gång här och återanvänder referenserna i validering,
// prisberäkning och bekräftelsen längre ner.
const offersContainer = document.querySelector("#offers");
const offerError = document.querySelector("#offerError");
const visitorName = document.querySelector("#visitorName");
const visitorEmail = document.querySelector("#visitorEmail");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const guests = document.querySelector("#guests");
const guestsError = document.querySelector("#guestsError");
const totalPrice = document.querySelector("#totalPrice");
const bookingForm = document.querySelector("#bookingForm");
const resetButton = document.querySelector("#resetButton");
const confirmation = document.querySelector("#confirmation");

// Bygger ett kort per erbjudande. Körs när sidan startar, så nya erbjudanden
// i listan ovan också dyker upp här utan att vi behöver skriva kortena för hand.
function showOffers() {
    let offersHTML = "";

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

    offersContainer.innerHTML = offersHTML;
}

// Samma kontroll används både när priset räknas ut och när formuläret skickas,
// så vi inte råkar godkänna olika antal på de två ställena.
function isValidGuestCount(numberOfGuests) {
    return Number.isInteger(numberOfGuests) &&
        numberOfGuests >= MIN_GUESTS &&
        numberOfGuests <= MAX_GUESTS;
}

// Kontrollera att namn och e-post har giltiga värden.
function validateName() {
    const name = visitorName.value.trim();
    const nameIsValid = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u.test(name);
    nameError.textContent = nameIsValid
        ? ""
        : "Ange ett namn med bokstäver. Mellanslag, bindestreck och apostrof går bra.";
    return nameIsValid;
}

function validateEmail() {
    const email = visitorEmail.value.trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    emailError.textContent = emailIsValid
        ? ""
        : "Ange en giltig e-postadress, till exempel namn@exempel.se.";
    return emailIsValid;
}

// De här kontrollerna körs när bokningen skickas. Antalet använder också
// isValidGuestCount, som prisräkningen återanvänder när användaren ändrar antal.
function validateGuests() {
    const numberOfGuests = Number(guests.value);
    const guestsAreValid = isValidGuestCount(numberOfGuests);

    guestsError.textContent = guestsAreValid ? "" : GUESTS_ERROR;
    return guestsAreValid;
}

function validateOffer() {
    const selectedOffer = document.querySelector('input[name="offer"]:checked');
    const offerIsValid = selectedOffer !== null;

    offerError.textContent = offerIsValid ? "" : "Välj ett erbjudande.";
    return offerIsValid;
}

// Körs när användaren byter erbjudande eller ändrar antal. Samma funktion
// används alltså för båda fälten, så priset hålls uppdaterat direkt.
function calculatePrice() {
    const selectedOffer = document.querySelector('input[name="offer"]:checked');

    if (selectedOffer === null) {
        totalPrice.textContent = NO_OFFER_MESSAGE;
        return;
    }

    const numberOfGuests = Number(guests.value);
    if (!isValidGuestCount(numberOfGuests)) {
        totalPrice.textContent = "-";
        return;
    }

    const offer = offers.find(function (item) {
        return item.id === selectedOffer.value;
    });

    totalPrice.textContent = offer.price * numberOfGuests + " kr";
}

// Visas först efter att formuläret klarat alla kontroller. Hämtar erbjudandet
// från samma lista som showOffers använder ovan.
function showConfirmation() {
    const selectedOffer = document.querySelector('input[name="offer"]:checked');
    const offer = offers.find(function (item) {
        return item.id === selectedOffer.value;
    });
    const numberOfGuests = Number(guests.value);

    confirmation.innerHTML = `
        <div class="alert alert-success">
            <h3>Bokning bekräftad</h3>
            <p><strong>Namn:</strong> <span id="confirmationName"></span></p>
            <p><strong>E-post:</strong> <span id="confirmationEmail"></span></p>
            <p><strong>Erbjudande:</strong> ${offer.name}</p>
            <p><strong>Antal personer:</strong> ${numberOfGuests}</p>
            <p><strong>Totalpris:</strong> ${offer.price * numberOfGuests} kr</p>
        </div>
    `;

    // Namn och e-post är användartext, så lägg in den som text och inte HTML.
    confirmation.querySelector("#confirmationName").textContent = visitorName.value.trim();
    confirmation.querySelector("#confirmationEmail").textContent = visitorEmail.value.trim();

    // Efter bokningen låser vi fälten, men lämnar "Börja om" aktivt.
    const formElements = bookingForm.querySelectorAll("input, button");
    formElements.forEach(function (element) {
        element.disabled = element !== resetButton;
    });
}

// Anropas av "Börja om". Återställer både formuläret och sånt som inte följer
// med i bookingForm.reset(), som feltexterna och bekräftelsen.
function resetForm() {
    bookingForm.reset();
    bookingForm.querySelectorAll("input, button").forEach(function (element) {
        element.disabled = false;
    });

    nameError.textContent = "";
    emailError.textContent = "";
    offerError.textContent = "";
    guestsError.textContent = "";
    guests.value = "1";
    totalPrice.textContent = NO_OFFER_MESSAGE;
    confirmation.innerHTML = "";
}

// Sidans startläge: en person är förvald och erbjudandekorten byggs här.
guests.value = "1";
showOffers();

// Båda händelserna använder samma prisfunktion, så ändring av erbjudande och
// ändring av antal uppdaterar priset på samma sätt, direckt när man ändrar.
offersContainer.addEventListener("change", calculatePrice);
guests.addEventListener("input", calculatePrice);

// Samlar valideringen vid skickning; bekräftelsen visas bara om allt är okej.
bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const guestsAreValid = validateGuests();
    const offerIsValid = validateOffer();

    if (nameIsValid && emailIsValid && guestsAreValid && offerIsValid) {
        showConfirmation();
    }
});

// Kopplar omstartsknappen till resetForm ovan, som också kan återanvändas
// om vi senare behöver starta om bokningen från ett annat ställe.
resetButton.addEventListener("click", resetForm);
