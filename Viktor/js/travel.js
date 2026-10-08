const offersDiv = document.querySelector('.offerGrid');

const offerB = {
    title: "Hyr bil",
    description: "Utforska Aten och närområdet på dina villkor med en bil. There are many parking lots throughout Athens, where you can safely leave your car.",
    price: 200,
    button: 'Boka din bil här!',
    id: 'offerB'
};

const offers = [offerB];

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
    offerInfo.appendChild(offerBtn);

    // Lägg till relevant info från objektet
    offerTitleText.textContent = obj.title;
    offerDesc.textContent = obj.description;
    offerPrice.textContent = `Pris: ${obj.price} kr/dag`
    offerBtn.textContent = obj.button



});