const offers = [
    {
        id: "acropolis-tour",
        name: "Guidad tur vid Akropolis",
        description: "Följ med på en guidad tur bland antikens monument.",
        price: 450
    },
    {
        id: "museum-tour",
        name: "Museibesök",
        description: "Upptäck Atens historia genom museernas samlingar.",
        price: 300
    },
    {
        id: "history-walk",
        name: "Historisk stadsvandring",
        description: "Se historiska kvarter och landmärken till fots.",
        price: 250
    }
];

const offersContainer = document.getElementById("offersContainer");

offers.forEach((offer) => {
    const column = document.createElement("div");
    column.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card shadow-sm h-100";

    const label = document.createElement("label");
    label.className = "card-body d-flex flex-column p-4";
    label.htmlFor = offer.id;

    const choice = document.createElement("span");
    choice.className = "form-check mb-3";

    const radio = document.createElement("input");
    radio.className = "form-check-input";
    radio.type = "radio";
    radio.name = "offer";
    radio.id = offer.id;
    radio.value = offer.id;

    const name = document.createElement("span");
    name.className = "form-check-label fw-semibold";
    name.textContent = offer.name;

    const description = document.createElement("span");
    description.className = "text-secondary mb-3";
    description.textContent = offer.description;

    const price = document.createElement("span");
    price.className = "mt-auto fw-semibold";
    price.textContent = `${offer.price} kr / person`;

    choice.append(radio, name);
    label.append(choice, description, price);
    card.append(label);
    column.append(card);
    offersContainer.append(column);
});