// Declare offers

const offers = [
    {
        id: "beach",
        name: "Stränder & pool",
        description: "En avkopplande dag med sol, bad och tillgång till pool.",
        pricePerPerson: 250,
        imageUrl: "images/beach.jpg"
    },
    {
        id: "tours",
        name: "Turer",
        description: "Upptäck Atens sevärdheter och historia med en guidad tur.",
        pricePerPerson: 400,
        imageUrl: "images/tours.jpg"
    },
    {
        id: "sports",
        name: "Sporter",
        description: "Träna i Atens vackeraste miljöer med våra sportturer.",
        pricePerPerson: 350,
        imageUrl: "images/sports.jpg"
    }
];

let selectedOffer = null;

// Offer functions

function renderOffers() {
  // map ger en ny array med ett kort per lokal. join gör om arrayen till en enda text.
  const offerList = document.getElementById('offerList')
  offerList.innerHTML = offers.map(createOfferCard).join("");
}

function createOfferCard(offer) {
    // Skapar ett kort för varje lokal med informationen från objektet.
  return `
    <div class="col-md-4 ">
        <div class="card h-100 shadow-sm cardMain">
            <img src="${offer.imageUrl}" class="card-img-top"
                 alt="${offer.name}" style="height: 220px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
                <h3 class="h5">${offer.name}</h3>
                <p>${offer.description}</p>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                    <p class="fw-bold text-primary mb-0">${offer.pricePerPerson} kr/person</p>
                    <button class="btn btn-primary" id=${offer.id}>Boka</button>
                </div>
            </div>
        </div>
    </div>
  `;
}

function selectOffer() {
    // När vi trycker på en av knapparna ska vi markera den valda knappen, spara det valda erbjudandet och visa formuläret med informationen från det valda erbjudandet.
    offers.forEach(offer => {
        const offerButton = document.getElementById(offer.id);

        offerButton.addEventListener('click', () => {

            // Ta bort markeringen från alla knappar
            offers.forEach(otherOffer => {
                const otherButton = document.getElementById(otherOffer.id);
                unmarkOffer(otherButton);
            });

            // Markera den valda knappen
            // offerButton.classList.add('Selected');
            markOffer(offerButton);

            // Spara det valda erbjudandet
            selectedOffer = offer;

            // Visa, nollställ och uppdatera formulär
            showForm()
            clearForm()
            updateFormInfo()

            // Dölj bokningsbekräftels
            hideBooking()
        });
    });
}

function markOffer (offerButton) {
    // Den här funktionen markerar den valda knappen.
    offerButton.classList.add('Selected');
}

function unmarkOffer (offerButton) {
    // Den här funktionen tar bort markeringen från den valda knappen.
    offerButton.classList.remove('Selected');
}

// Form functions

function showForm () {
    // När vi trycker på en av knapparna ska vi visa formuläret.
    const form = document.getElementById('form')
    form.classList.add('active')
}

function hideForm () {
    // Den här funktionen gömmer formuläret.
    const form = document.getElementById('form')
    form.classList.remove('active')
}

function clearForm () {
    // Den här funktionen nollställer formuläret och tar bort eventuella felmeddelanden.
    const firstName = document.getElementById("firstName");
    firstName.value = ''
    removeError(firstName)
    const lastName = document.getElementById("lastName");
    lastName.value = ''
    removeError(lastName)
    const email = document.getElementById("email");
    email.value = ''
    removeError(email)
    const people = document.getElementById("people");
    people.value = 1
    removeError(people)
}

function updateFormInfo() {
    // Den här funktionen uppdaterar formuläret med informationen från det valda erbjudandet.
    const formTitle = document.getElementById("formTitle");
    formTitle.textContent = selectedOffer.name

    const formPrice = document.getElementById("formPrice");
    formPrice.textContent = selectedOffer.pricePerPerson + " kr/person"

    updatePrice(selectedOffer.pricePerPerson)
}

// Price functions

function calculatePrice() {
    const people = document.getElementById("people")

    let numberOfPeople = null
    let price = null

    people.addEventListener('input', () => {
        
        if (validatePeople(people)) {
            numberOfPeople = people.value

            // price = numberOfPeople * selectedOffer.pricePerPerson
            price = totalPrice(numberOfPeople,selectedOffer.pricePerPerson)

            updatePrice(price)
        } else {
            updatePrice('-')
        }     

    })    
}

function totalPrice(people, price) {
    return Number(people.trim()) * price
}

function updatePrice(price) {
    const formTotal = document.getElementById("formTotal");
    formTotal.textContent = price + " kr"
}

// Validation and Error functions

function validatePeople(input) {
    // Funktionen tittar på antalet personer och kontrollerar att det är korrekt ifyllt. Om det inte är det, lägger vi till ett felmeddelande.
    const people = Number(input.value);

    if (Number.isInteger(people) && people >= 1 && people <= 5) {
        removeError(input);
        return true;
    } else {
        addError(input,'Ange ett heltal från 1 till 5');
        return false;
    }
}

function validateName(input) {
    // Funktionen tittar på namnet och kontrollerar att det är korrekt ifyllt. Om det inte är det, lägger vi till ett felmeddelande.
    const name = input.value.trim();
    // Namnet är ifyllt och inte bara innehåller blanksteg.
    if (name.includes(' ')) {
        addError(input,'Namnet får inte innehålla blanksteg');
        return false;
    }
    if (name === '') {
        addError(input,'Namnet är obligatoriskt');
        return false;
    }
    if (name.length < 2) {
        addError(input,'Namnet är får inte vara mindre än två bokstäver');
        return false;
    }

    if (!/^[A-Za-zÅÄÖåäö-]+$/.test(name)) {
        addError(input,'Endast svenska alfabetet och bindestreck är giltiga');
        return false;
    }
    
    const nameParts = name.split('-')
    if (nameParts.length > 3) {
        addError(input,'endast enkel, dubbel eller trippelnamn är giltiga');
        return false;
    }
    // Går igenom varje del av namnet och kontrollerar att varje del är minst två bokstäver lång.
    for (let i = 0; i < nameParts.length; i++) {
        if (nameParts[i].length < 2) {
            addError(input,'Namnet får inte vara mindre än två bokstäver');
            return false;
        }
    }

    // Om alla kontroller passerar, tar vi bort eventuella felmeddelanden och returnerar true.
    removeError(input);
    return true;
}

function validateEmail(input) {
    // Funktionen tittar på e-postadressen och kontrollerar att den är korrekt ifylld. Om den inte är det, lägger vi till ett felmeddelande.
    const email = input.value.trim();

    // E-postadressen är ifylld, saknar blanksteg och innehåller ett enda @ med text före och efter.
    // Domändelen ska innehålla minst en punkt med text på båda sidor.

    if (email.includes(' ')) {
        addError(input,'Mailadressen får inte innehålla blanksteg');
        return false;
    }

    if (email === '') {
        addError(input,'Mailadressen är obligatorisk');
        return false;
    }

    if (!email.includes('@')) {
        addError(input,'Mailadressen måste innehålla ett @-tecken');
        return false;
    }

    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
        addError(input,'Mailadressen får bara innehålla ett @-tecken');
        return false;
    }

    const username = emailParts[0];
    if (username === '') {
        addError(input,'Mailadressen behöver ett användarnamn');
        return false;
    }
    
    // Kontrollerar att username är mellan 1 och 64 tecken lång och endast innehåller bokstäver, siffror, understreck, bindestreck och punkter.
    // Punkten får inte stå först eller sist, och flera punkter får inte stå direkt efter varandra.
    if (!/^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*$/.test(username)) {
        addError(input,'Mailadressen behöver ett giltigt användarnamn');
        return false;
    }
        
    const domain = emailParts[1];
    const domainParts = domain.split('.')
    if (domainParts.length < 2) {
        addError(input,'Mailadressen måste innehålla en domän och en toppdomän');
        return false;
    }

    for (let i = 0; i < domainParts.length; i++) {
        console.log(domainParts[i])
        if (domainParts[i] === '') {
            addError(input,'Domän-delarna får inte vara tomma');
            return false;
        }
        
        if (!/^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*$/.test(domainParts[i])) {
            addError(input,'Domän-delarna får bara innehålla giltiga tecken');
            return false;
        }
    }

    removeError(input)
    return true    
}

function addError(input,message) {
    // Funktionen lägger till ett felmeddelande
    const parentDiv = input.parentElement
    parentDiv.classList.add('error')
    const errorText = parentDiv.querySelector('.errorText')
    errorText.textContent = message
}

function removeError(input) {
    // Funktionen tar bort ett felmeddelande
    const parentDiv = input.parentElement
    parentDiv.classList.remove('error')
}

// Booking

function showBooking(){
    // När vi trycker på boka-knappen ska vi visa bokningsbekräftelsen.
    const confirmedBooking = document.getElementById('confirmedBooking');
    confirmedBooking.classList.add('active')
}

function hideBooking(){
    // Den här funktionen gömmer bokningsbekräftelsen. 
    const confirmedBooking = document.getElementById('confirmedBooking');
    confirmedBooking.classList.remove('active')
}

function updateBookingInfo(offer, firstName, lastName, email, people, price){
    // Den här funktionen fyller informationen i bokningsbekräftelsen.  
    
    const bookingActivity = document.getElementById("confirmedActivity");
    bookingActivity.textContent = offer;

    const bookingName = document.getElementById("confirmedName")
    bookingName.textContent = `${firstName} ${lastName}`

    const bookingEmail = document.getElementById("confirmedEmail")
    bookingEmail.textContent = `${email}`

    const bookingPeople = document.getElementById("confirmedPeople")
    bookingPeople.textContent = `${people}`

    const bookingTotal = document.getElementById("confirmedPrice")
    bookingTotal.textContent = `${price} kr`
}

function confirmBooking () {
    // När vi trycker på boka-knappen ska vi validera formuläret och om allt är korrekt fyllt i ska vi visa bokningsbekräftelsen med informationen från formuläret.
    
    // Definiera en variabel för formuläret
    const bookingForm = document.getElementById('bookingForm');
    // Lägg till en eventlyssnare för formulärets submit-händelse
    bookingForm.addEventListener('submit', function(event) {
        // Förhindra att formuläret skickas och sidan laddas om
        event.preventDefault();
        // Samla alla fel i en array
        const errors = []
        // Validera varje fält och lägg till false i errors-arrayen om valideringen misslyckas
        const firstName = document.getElementById('firstName')
        if (!validateName(firstName)) {
            errors.push(false)
        }
        const lastName = document.getElementById('lastName')
        if (!validateName(lastName)) {
            errors.push(false)
        }
        const email = document.getElementById('email')
        if (!validateEmail(email)) {
            errors.push(false)
        }
        const people = document.getElementById('people')
        if (!validatePeople(people)) {
            errors.push(false)
        }
        // Om det finns några fel i errors-arrayen, returnerar vi och gör inget mer.
        if (errors.includes(false)) {
            return
        }
        // Om alla fält är korrekt ifyllda, döljer vi formuläret och visar bokningsbekräftelsen med informationen från formuläret.
        hideForm()
        showBooking()
        updateBookingInfo(selectedOffer.name, firstName.value, lastName.value, email.value, people.value, totalPrice(people.value,selectedOffer.pricePerPerson))


    });
}

function resetBooking () {
    // När vi trycker på återställ-knappen ska vi dölja formuläret och nollställa det.
    const resetButton = document.getElementById('resetBooking');
    resetButton.addEventListener('click', () => {
        hideForm()
        clearForm()
        const offerButton = document.getElementById(selectedOffer.id)
        unmarkOffer(offerButton)
        selectedOffer = null;
    })
}

// Run program

renderOffers()
selectOffer()
resetBooking()
calculatePrice()
confirmBooking()