const offersDiv = document.querySelector('.offerGrid');
const formSection = document.querySelector('#formSection');



const offerA = {
    title: "Kollektivtrafik",
    description: "The Athens public transport system is affordable, reliable and covers most of the city and suburbs. You can use all means of public transport using the same ticket/card!",
    price: 100,
    button: 'Boka ditt dagskort här!',
    id: 'offerA'
};

const offerB = {
    title: "Hyr bil",
    description: "Utforska Aten och närområdet på dina villkor med en bil. There are many parking lots throughout Athens, where you can safely leave your car.",
    price: 200,
    button: 'Boka din bil här!',
    id: 'offerB'
};

const offerC = {
    title: "Hyr cykel",
    description: "Upplev Aten med friheten av en cykel. Although cycling in Athens is not as common as in other cities, new bike lanes exist along the central roads.",
    price: 75,
    button: 'Boka din cykel här!',
    id: 'offerC'
};

const offers = [offerA, offerB, offerC];

let chosenOffer = null;

function createOffers() {
    offers.forEach(obj => {
    
        // Skapa HTML Strukturen
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

        // Lägg till relevant info från objektet
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
            enableForm();
            lockOffers();
            setChosenOffer(obj);
        })
    })
}

function setChosenOffer(offer) {
    chosenOffer = offer
    const formTitle = document.querySelector('.formTitle')
    formTitle.textContent = `Valt erbjudande: ${chosenOffer.title}`;
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

function enableForm () {
    formSection.classList.add('active');
} 

function disableForm () {
    formSection.classList.remove('active');
} 

function enableResetBtn() {
    const resetBtn = document.querySelector('#resetBtn')

    resetBtn.addEventListener('click', () => {
        unlockOffers();
        disableForm();
    })
}

createOffers();
enableOfferBtns();
enableResetBtn();

const form = document.querySelector('.formGrid');

form.addEventListener('submit', e => {
    e.preventDefault()



})

const numberOfDays = document.querySelector('#numberOfDays')

numberOfDays.addEventListener('change', e => {

    const input = e.target;
    let price = '-'
    console.log(/^[1-5]$/.test(input.value.trim()))
    if (!validateNumber(input)) {
        setError(input,'Ange ett heltal från 1 till 5');  
    } else {
        removeError(input);
        const days = Number(input.value.trim());
        price = calculatePrice(days,chosenOffer)
    }
    
    updatePrice(price)  
})

function updatePrice(price) {
    const formPrice = document.querySelector('#formPrice')
    formPrice.textContent = `${price} kr`
}

function calculatePrice(days,offer) {
    return days * offer.price;
}

function validateNumber(input) {
    // regex checks for number between 1-5
    return /^[1-5]$/.test(input.value.trim())
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

