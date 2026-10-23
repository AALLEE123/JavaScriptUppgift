document.addEventListener("DOMContentLoaded", function () {
    const offerSelect = document.getElementById("offer");
    const peopleSelect = document.getElementById("people");
    const selectedOffer = document.getElementById("selectedOffer");
    const pricePerPerson = document.getElementById("pricePerPerson");
    const numberOfPeople = document.getElementById("numberOfPeople");
    const totalPrice = document.getElementById("totalPrice");
    const resetButton = document.getElementById("resetBooking");
    const bookingForm = document.getElementById("bookingForm");
    const bookingMessage = document.getElementById("bookingMessage");

    // Kontrollera att HTML-elementen finns
    if (
        !offerSelect || !peopleSelect || !selectedOffer ||
        !pricePerPerson || !numberOfPeople || !totalPrice ||
        !resetButton || !bookingForm || !bookingMessage
    ) {
        console.error(
            "Bokningen kunde inte startas. Kontrollera ID:n i HTML-koden."
        );
        return;
    }

    // Erbjudanden och priser
    const offers = {
        beach: { name: "Stränder & pool", price: 250 },
        tours: { name: "Turer", price: 400 },
        sports: { name: "Sporter", price: 350 }
    };

    function updatePrice() {
        const offer = offers[offerSelect.value];
        const people = Number(peopleSelect.value);

        // Kontrollera att erbjudandet och antalet personer är giltiga
        if (!offer || !Number.isInteger(people) || people < 1 || people > 5) {
            totalPrice.textContent = "Kunde inte beräkna priset";
            console.error("Ogiltigt val:", offerSelect.value, peopleSelect.value);
            return;
        }

        const total = offer.price * people;

        selectedOffer.textContent = offer.name;
        pricePerPerson.textContent = offer.price + " kr";
        numberOfPeople.textContent = people;
        totalPrice.textContent =
            total.toLocaleString("sv-SE") + " kr";

        bookingMessage.textContent = "";
    }

    // Uppdatera priset vid ändringar
    offerSelect.addEventListener("change", updatePrice);
    peopleSelect.addEventListener("change", updatePrice);

    // Återställ alla val och priset
    resetButton.addEventListener("click", function () {
        offerSelect.value = "beach";
        peopleSelect.value = "1";

        updatePrice();

        bookingMessage.textContent = "Bokningen har återställts.";
        bookingMessage.className = "mt-3 mb-0 text-primary";
    });

    // Visa sammanfattning vid bokning
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        updatePrice();

        const offer = offers[offerSelect.value];
        const people = Number(peopleSelect.value);
        const total = offer.price * people;

        bookingMessage.textContent =
            "Testbokning: " + offer.name + ", " +
            people + (people === 1 ? " person. " : " personer. ") +
            "Totalpris: " + total.toLocaleString("sv-SE") + " kr.";

        bookingMessage.className = "mt-3 mb-0 text-success";
    });

    // Visa startpriset
    updatePrice();
});
