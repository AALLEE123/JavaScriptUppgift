const offerA = {
    title: "Kollektivtrafik",
    description: "The Athens public transport system is affordable, reliable and covers most of the city and suburbs. You can use all means of public transport using the same ticket/card!",
    price: 100,
    button: 'Boka ditt dagskort här!',
    id: 'offerA',
    item: 'dagskort'
};

const offerB = {
    title: "Hyr bil",
    description: "Utforska Aten och närområdet på dina villkor med en bil. There are many parking lots throughout Athens, where you can safely leave your car.",
    price: 200,
    button: 'Boka din bil här!',
    id: 'offerB',
    item: 'bil'
};

const offerC = {
    title: "Hyr cykel",
    description: "Upplev Aten med friheten av en cykel. Although cycling in Athens is not as common as in other cities, new bike lanes exist along the central roads.",
    price: 75,
    button: 'Boka din cykel här!',
    id: 'offerC',
    item: 'cykel'
};

const offers = [offerA, offerB, offerC];

let chosenOffer = null;

// "basic" functions

function scrollToSectionId(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
}

function setChosenOffer(offer) {
    chosenOffer = offer;
}

function lockOffers() {
    offers.forEach(obj => {
        const offerInput = document.querySelector(`#${obj.id}`);
        offerInput.disabled = true;
        offerInput.checked = false;
        offerInput.classList.remove('active');
    })
}

function unlockOffers() {
    offers.forEach(obj => {
        const offerInput = document.querySelector(`#${obj.id}`);
        offerInput.disabled = false;
        offerInput.classList.add('active');
    })
}

function setFormTitle(message) {
    const formTitle = document.querySelector('.formTitle');
    formTitle.classList.add('active');
    formTitle.textContent = message;
}

function hideFormTitle() {
    const formTitle = document.querySelector('.formTitle');
    formTitle.classList.remove('active');
}

function displayForm() {
    const formGrid = document.querySelector('.formGrid');
    formGrid.classList.add('active');
}

function hideForm() {
    const formGrid = document.querySelector('.formGrid');
    formGrid.classList.remove('active');
}

function clearForm() {
    const requiredInputs = document.querySelectorAll("input[required]");
    requiredInputs.forEach(input => {
        input.value = '';
    })
    updatePrice('-')
}

function validateInput(input) {
    if (input.id === "numberOfDays") return validateNumber(input)
    if (input.type === "text") return validateText(input)
    if (input.type === "email") return validateEmail(input)
    return false
}

function validateText(input) {
    const value = input.value.trim();

    if (value.length < 1) {
        setError(input,'Detta fält får inte vara tomt');
        return false;
    }

    // not empty, not less than 2 letters
    if (value.length < 2) {
        setError(input,'Detta fält får inte vara mindre än två bokstäver');
        return false;
    }

    // regex checks for swedish alphabet only + hyphen for double names
    if (!/^[A-Za-zÅÄÖåäö-]+$/.test(value)) {
        setError(input,'Endast svenska alfabetet och bindestreck är giltiga');
        return false;
    }

    removeError(input);
    return true;
}

function validateEmail(input) {
    const value = input.value.trim();

    // check if empty
    if (value.length === 0) {
        setError(input,'Detta fält får inte vara tomt');
        return false;
    }

    // check for no blank spaces
    if (value.includes(' ')) {
        setError(input,'Får ej innehålla blanksteg');    
        return false;
    }

    // check for only one @
    let parts = value.split('@');
    if (parts.length !== 2) {
        if (value.includes('@')) {
            setError(input,'Får bara innehålla ett @');
        } else {
            setError(input,'Måste innehålla ett @');
        }     
        return false;
    }
    
    // username not empty
    if (parts[0].length === 0) {
        setError(input, 'Måste innehålla ett username före @');
        return false;
    }

    // domain part contains atleast one period
    if (!parts[1].includes('.')) {
        setError(input,'Måste innehålla ett toppdomän (.com, .se, ...)');     
        return false;
    }

    // with text before and after
    let partsDomain = parts[1].split('.');
    for (let i=0; i < partsDomain.length; i++) {
        if (partsDomain[i].length < 1) {
            setError(input,'Måste innehålla ett domän och toppdomän (ex: gmail.com)');   
            return false;
        }
    }

    // regex checks for english alphabet, numbers 0-9, "-", "_", "@", "."
    if (!/^[A-Za-z0-9._@-]+$/.test(value)) {
        setError(input,'Ogiltigt tecken');   
        return false;
    }

    removeError(input);
    return true;
}

function validateNumber(input) {
    const value = input.value.trim();

    // regex checks for number between 1-5
    if (!/^[1-5]$/.test(value)) {
        setError(input,'Ange ett heltal från 1 till 5');
        return false;
    }

    removeError(input);
    return true;
}

function setError(input, message) {
    const parent = input.parentElement;
    const invalidText = parent.querySelector('.invalidText');
    parent.classList.add('error');
    invalidText.textContent = message;
}

function removeError(input) {
    const parent = input.parentElement;
    parent.classList.remove('error');
}

function updatePrice(price) {
    const formPrice = document.querySelector('#formPrice');
    formPrice.textContent = `${price} kr`;
}

function calculatePrice(days,offer) {
    return Number(days.trim()) * offer.price;
}

function createBooking(inputs) {
    const booking = {offer: chosenOffer.title};
    inputs.forEach(input => {
        booking[input.id] = input.value.trim();
    })
    booking['totalPrice'] = calculatePrice(booking.numberOfDays,chosenOffer);
    return booking
}

function displayBooking() {
    const bookingCard = document.querySelector('.bookingCard');
    bookingCard.classList.add('active');
}

function hideBooking() {
    const bookingCard = document.querySelector('.bookingCard');
    bookingCard.classList.remove('active');
}

function addBookingText(booking) {
    const bookingText1 = document.querySelector('.bookingText1');
    const bookingText2 = document.querySelector('.bookingText2');
    const bookingText3 = document.querySelector('.bookingText3');
    const bookingText4 = document.querySelector('.bookingText4');
    const bookingText5 = document.querySelector('.bookingText5');
    bookingText1.textContent = `Bokning av ${chosenOffer.item}`
    bookingText2.textContent = `För: ${booking.firstName} ${booking.lastName}`
    bookingText3.textContent = `Antal Dagar: ${booking.numberOfDays}`
    bookingText4.textContent = `Totalt pris: ${booking.totalPrice} kr`
    bookingText5.textContent = `kvitto till: ${booking.email}`
}

// "program" functions

function createOffers() {
    const offersDiv = document.querySelector('.offerGrid');

    offers.forEach(obj => {
    
        // Create HTML structure
        const offerItem = document.createElement('article');
        offerItem.classList.add('offerItem');
        offersDiv.appendChild(offerItem);

        const offerInput = document.createElement('input');
        offerInput.classList.add('offerInput','active');
        offerInput.type = 'checkbox';
        offerInput.name = 'offerAccordion';
        offerInput.id = obj.id;
        offerItem.appendChild(offerInput);

        const offerTitle = document.createElement('label');
        offerTitle.classList.add('offerTitle');
        offerTitle.htmlFor = obj.id;
        offerItem.appendChild(offerTitle);

        const offerTitleText = document.createElement('h3');
        offerTitle.appendChild(offerTitleText)

        const offerInfo = document.createElement('div')
        offerInfo.classList.add('offerInfo');
        offerItem.appendChild(offerInfo);

        const offerDesc = document.createElement('p')
        offerDesc.classList.add('offerDesc');
        offerInfo.appendChild(offerDesc);

        const offerPrice = document.createElement('p')
        offerPrice.classList.add('offerPrice');
        offerInfo.appendChild(offerPrice);

        const offerBtn = document.createElement('button')
        offerBtn.classList.add('btn', 'btn-primary');
        offerBtn.id = `${obj.id}Btn`;
        offerInfo.appendChild(offerBtn);

        // Add relevant text to offer
        offerTitleText.textContent = obj.title;
        offerDesc.textContent = obj.description;
        offerPrice.textContent = `Pris: ${obj.price} kr/dag`;
        offerBtn.textContent = obj.button;
    })
}

function enableOfferBtns() {
    offers.forEach(obj => {
        const offerBtn = document.querySelector(`#${obj.id}Btn`);
        
        offerBtn.addEventListener('click', () => { 
            setChosenOffer(obj);
            lockOffers();
            setFormTitle(`Valt erbjudande: ${chosenOffer.title}`);
            displayForm();
            hideBooking();
            clearForm();
            scrollToSectionId('formSection');
        })
    })
}

function enableResetBtn() {
    const resetBtn = document.querySelector('#resetBtn')

    resetBtn.addEventListener('click', () => {
        unlockOffers();
        hideForm();
        hideFormTitle();
        clearForm();
        scrollToSectionId('offerSection');
    })
}

function enablePriceCheck() {
    const numberOfDays = document.querySelector('#numberOfDays');

    numberOfDays.addEventListener('input', e => {
        const input = e.target;
        let price = '-';
 
        if (validateNumber(input)) {
            price = calculatePrice(input.value,chosenOffer);
        }
        
        updatePrice(price);
    })
}

function confirmBooking() {
    const form = document.querySelector('.formGrid');
    
    form.addEventListener('submit', e => {
        e.preventDefault();
    
        const requiredInputs = form.querySelectorAll("input[required]");
        const errors = [];
    
        requiredInputs.forEach(input => {
            errors.push(validateInput(input));
        })
    
        if (errors.includes(false)) return;
    
        const booking = createBooking(requiredInputs)

        addBookingText(booking)
        displayBooking();
        setFormTitle(`Tack för din bokning!`);
        hideForm();
        unlockOffers();
        clearForm();
        scrollToSectionId('offerSection');
    })
}

// run "program"
createOffers();
enableOfferBtns();
enableResetBtn();
enablePriceCheck();
confirmBooking();
