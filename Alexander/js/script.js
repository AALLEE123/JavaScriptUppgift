
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
            updateFormInfo()
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

function resetBooking () {
    const resetButton = document.getElementById('resetBooking');
    resetButton.addEventListener('click', () => {
        hideForm()
        clearForm()
    })
}

// function confirmBooking () {
//     const bookingForm = document.getElementById('bookingForm');
    
//     bookingForm.addEventListener('sumbit', (event) => {
//         event.preventDefault();
        
//         const inputs = document.querySelectorAll("input[required]");

//         console.log(inputs)



//     })
// }

function confirmBooking () {
    const bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const errors = []

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

        if (errors.includes(false)) {
            return
        }


    });
}



function updateFormInfo() {
    const formTitle = document.getElementById("formTitle");
    formTitle.textContent = selectedOffer.name

    const formPrice = document.getElementById("formPrice");
    formPrice.textContent = selectedOffer.pricePerHour + " kr/person"

    updatePrice(selectedOffer.pricePerHour)
}

function calculatePrice() {
    const people = document.getElementById("people")

    let numberOfPeople = null
    let price = null

    people.addEventListener('input', () => {
        
        if (validatePeople(people)) {
            numberOfPeople = people.value

            price = numberOfPeople * selectedOffer.pricePerHour

            updatePrice(price)
        } else {
            updatePrice('-')
        }     

    })    
}

function updatePrice(price) {
    const formTotal = document.getElementById("formTotal");
    formTotal.textContent = price + " kr"
}

function validatePeople(input) {
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
    const name = input.value.trim();
    //Namnet är ifyllt och inte bara innehåller blanksteg.
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

    // regex checks for swedish alphabet only + hyphen for double names
    if (!/^[A-Za-zÅÄÖåäö-]+$/.test(name)) {
        addError(input,'Endast svenska alfabetet och bindestreck är giltiga');
        return false;
    }
    
    const nameParts = name.split('-')
    if (nameParts.length > 3) {
        addError(input,'endast dubbel eller trippelnamn är giltiga');
        return false;
    }
    nameParts.forEach (part => {
        if (part.length < 2) {
            addError(input,'Namnet får inte vara mindre än två bokstäver');
            return false;
        }
    })

    removeError(input);
    return true;
}

function validateEmail(input) {
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
    if (!/^(?=.{1,64}$)[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*$/.test(username)) {
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
    const parentDiv = input.parentElement
    parentDiv.classList.add('error')
    const errorText = parentDiv.querySelector('.errorText')
    errorText.textContent = message
}

function removeError(input) {
    const parentDiv = input.parentElement
    parentDiv.classList.remove('error')
}



renderOffers()
selectOffer()
resetBooking()
calculatePrice()
confirmBooking()