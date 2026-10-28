// Erbjudanden och tillåtna antal personer.
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
    },
        {
        id: "test",
        name: "Fjärde erbjudandet",
        description: "fjärde erbjudandet.",
        price: 69
    }
];

const MIN_GUESTS = 1;
const MAX_GUESTS = 5;
const GUESTS_ERROR = `Ange ett heltal mellan ${MIN_GUESTS} och ${MAX_GUESTS} personer.`;
const NO_OFFER_MESSAGE = "Välj ett erbjudande för att se totalpriset.";

// Hämta fälten och platserna för meddelanden.
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

// Bygg ett kort för varje erbjudande.
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

// Kontrollera att antalet ligger inom tillåtna gränser.
function isValidGuestCount(numberOfGuests) {
    return Number.isInteger(numberOfGuests) &&
        numberOfGuests >= MIN_GUESTS &&
        numberOfGuests <= MAX_GUESTS;
}

// Kontrollera att namn och e-post har giltiga värden.
function validateName() {
    const nameIsValid = visitorName.value.trim() !== "";
    nameError.textContent = nameIsValid ? "" : "Ange ditt namn.";
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

// Visa fel om antal personer eller erbjudande saknas.
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

// Uppdatera priset när erbjudande eller antal ändras.
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

// Visa bokningsbekreftelsen när formuläret är godkänt.
function showConfirmation() {
    const selectedOffer = document.querySelector('input[name="offer"]:checked');
    const offer = offers.find(function (item) {
        return item.id === selectedOffer.value;
    });
    const numberOfGuests = Number(guests.value);

    confirmation.innerHTML = `
        <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                    <div class="modal-header bg-success text-white border-0 p-4">
                        <div>
                            <span class="badge rounded-pill bg-white text-success mb-2">Bokningen är klar</span>
                            <h2 class="modal-title fs-4" id="confirmationTitle">Bokning bekräftad</h2>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Stäng"></button>
                    </div>
                    <div class="modal-body p-4">
                        <p class="text-secondary mb-3">Här är en sammanfattning av din bokning.</p>
                        <div class="bg-light rounded-3 p-3">
                            <p class="d-flex justify-content-between gap-3 mb-2">
                                <strong>Namn</strong><span id="confirmationName" class="text-end"></span>
                            </p>
                            <p class="d-flex justify-content-between gap-3 mb-2">
                                <strong>E-post</strong><span id="confirmationEmail" class="text-end"></span>
                            </p>
                            <p class="d-flex justify-content-between gap-3 mb-2">
                                <strong>Erbjudande</strong><span class="text-end">${offer.name}</span>
                            </p>
                            <p class="d-flex justify-content-between gap-3 mb-2">
                                <strong>Antal personer</strong><span>${numberOfGuests}</span>
                            </p>
                            <p class="d-flex justify-content-between gap-3 border-top pt-3 mb-0 fs-5">
                                <strong>Totalpris</strong><strong>${offer.price * numberOfGuests} kr</strong>
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer border-0 px-4 pb-4">
                        <button type="button" class="btn btn-primary px-4" data-bs-dismiss="modal">Stäng</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Lägg in texten säkert, utan att tolka den som HTML.
    confirmation.querySelector("#confirmationName").textContent = visitorName.value.trim();
    confirmation.querySelector("#confirmationEmail").textContent = visitorEmail.value.trim();
    bootstrap.Modal.getOrCreateInstance(confirmation.querySelector("#confirmationModal")).show();

    // Lås formuläret, men låt användaren börja om.
    const formElements = bookingForm.querySelectorAll("input, button");
    formElements.forEach(function (element) {
        element.disabled = element !== resetButton;
    });
}

// Rensa fält och felmeddelanden när användaren börjar om.
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

// Sätt startvärde och visa erbjudandena.
guests.value = "1";
showOffers();

// Uppdatera priset när användaren gör ett val.
offersContainer.addEventListener("change", calculatePrice);
guests.addEventListener("input", calculatePrice);

// Validera alla fält innan bekräftelsen visas.
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

// Återställ bokningen vid klick på "Börja om".
resetButton.addEventListener("click", resetForm);
