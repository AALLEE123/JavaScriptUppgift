const offersDiv = document.querySelector('.offerGrid');

const offerA = {
    title: "Kollektivtrafik",
    description: "The Athens public transport system is affordable, reliable and covers most of the city and suburbs. You can use all means of public transport using the same ticket/card!",
    price: 200,
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

offers.forEach(obj => {
    
    // Skapa HTML Strukturen
    const offerItem = document.createElement('article');
    offerItem.classList.add('offerItem');
    offersDiv.appendChild(offerItem);

    const offerInput = document.createElement('input');
    offerInput.classList.add('offerInput');
    offerInput.type = 'checkbox';
    offerInput.name = 'offerAccordion';
    offerInput.id = obj.id;
    offerItem.appendChild(offerInput);

    const offerTitle = document.createElement('label');
    offerTitle.classList.add('offerTitle');
    offerTitle.htmlFor = obj.id
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
    offerBtn.id = `${obj.id}Btn`
    offerInfo.appendChild(offerBtn);

    // Lägg till relevant info från objektet
    offerTitleText.textContent = obj.title;
    offerDesc.textContent = obj.description;
    offerPrice.textContent = `Pris: ${obj.price} kr/dag`
    offerBtn.textContent = obj.button

});