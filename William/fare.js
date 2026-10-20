/* =====================================================================
   1. DATA – alla priser och regler på ETT ställe.
   Vill ni ändra ett pris eller en gräns ändrar ni bara här.
   ===================================================================== */
const SERVICES = {
    restaurang: { label: "Restaurang – bordsbokning", pricePerPerson: 50,  maxGuests: 12 },
    cafe:       { label: "Café-rundtur",              pricePerPerson: 199, maxGuests: 10 },
    nattklubb:  { label: "Entré till nattklubb",      pricePerPerson: 150, maxGuests: 8 }
};
 
const EXTRAS = {
    meny:         { label: "Trerättersmeny",  pricePerPerson: 350 },
    provsmakning: { label: "Provsmakning",    pricePerPerson: 60 },
    vip:          { label: "VIP & garderob",  pricePerPerson: 200 }
};
 
/* =====================================================================
   2. HJÄLPFUNKTIONER – hitta rätt formulär och läsa av det.
   Alla tre bokningsformulär ("paneler") använder SAMMA funktioner.
   Varje funktion får veta vilken panel den ska jobba med.
   ===================================================================== */
function getPanels() {
    return Array.from(document.querySelectorAll(".booking-panel"));
}
 
function getServiceKey(panel) {
    return panel.dataset.service;
}
 
// Hittar ett fält i just den här panelen, t.ex. getField(panel, "guests")
function getField(panel, name) {
    return panel.querySelector('[name="' + name + '"]');
}
 
function getErrorBox(panel, name) {
    return panel.querySelector('[data-error-for="' + name + '"]');
}
 
function getGuests(panel) {
    return Number(getField(panel, "guests").value);
}
 
// Returnerar en lista med nycklar, t.ex. ["meny"], för tillval som är ikryssade
function getSelectedExtras(panel) {
    return Array.from(panel.querySelectorAll('input[name="extra"]:checked'))
        .map(box => box.value);
}
 
function formatPrice(amount) {
    return amount.toLocaleString("sv-SE") + " kr";
}
 
function todayAsText() {
    return new Date().toISOString().split("T")[0]; // "ÅÅÅÅ-MM-DD"
}
 
/* =====================================================================
   3. BERÄKNING – rena funktioner: tar emot värden, ger tillbaka resultat.
   De rör inte sidan alls, vilket gör dem lätta att testa och återanvända.
   ===================================================================== */
// Bygger en lista med prisrader, t.ex. [{ label: "Café-rundtur: 3 × 199 kr", amount: 597 }, ...]
// En rad för tjänsten och en rad för varje valt tillval.
function getPriceLines(serviceKey, guests, extraKeys) {
    const service = SERVICES[serviceKey];
    const lines = [{
        label: service.label + ": " + guests + " × " + formatPrice(service.pricePerPerson),
        amount: service.pricePerPerson * guests
    }];
    extraKeys.forEach(key => {
        lines.push({
            label: EXTRAS[key].label + ": " + guests + " × " + formatPrice(EXTRAS[key].pricePerPerson),
            amount: EXTRAS[key].pricePerPerson * guests
        });
    });
    return lines;
}
 
// Totalsumman är summan av alla prisrader, så uträkningen och summan kan aldrig bli olika.
function calculateTotal(serviceKey, guests, extraKeys) {
    return getPriceLines(serviceKey, guests, extraKeys)
        .reduce((sum, line) => sum + line.amount, 0);
}
 
/* =====================================================================
   4. VALIDERING – varje regel returnerar ett felmeddelande, eller "" om allt är OK.
   Samma regler används av alla tre formulär.
   ===================================================================== */
function validateName(value) {
    return value.trim().length >= 2 ? "" : "Ange ditt namn (minst 2 tecken).";
}
 
function validateEmail(value) {
    if (value.trim() === "") return "Ange din e-postadress.";
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    return looksLikeEmail ? "" : "E-postadressen ser fel ut. Exempel: namn@exempel.se";
}
 
function validateDate(value) {
    if (value === "") return "Välj ett datum.";
    return value >= todayAsText() ? "" : "Datumet har redan passerat. Välj dagens datum eller senare.";
}
 
function validateGuests(value, serviceKey) {
    const max = SERVICES[serviceKey].maxGuests;
    const hint = "Ange ett giltigt antal personer mellan 1 och " + max + ".";
    if (value === "" || !Number.isInteger(Number(value))) return "Antalet saknas eller är inte ett heltal. " + hint;
    if (Number(value) < 1) return "Du måste boka för minst 1 person. " + hint;
    if (Number(value) > max) return "Det går inte att boka för fler än " + max + " personer. " + hint;
    return "";
}
 
function validateTime(value) {
    return value !== "" ? "" : "Välj en tid för bordet.";
}
 
function validateAge(isChecked) {
    return isChecked ? "" : "Du måste intyga att alla är 18 år eller äldre.";
}
 
// Kopplar ihop varje fältnamn med sin valideringsregel.
// live: true betyder att fältet kontrolleras medan man skriver.
const FIELD_RULES = [
    { name: "name",   check: panel => validateName(getField(panel, "name").value) },
    { name: "email",  check: panel => validateEmail(getField(panel, "email").value) },
    { name: "date",   check: panel => validateDate(getField(panel, "date").value) },
    { name: "guests", live: true, check: panel => validateGuests(getField(panel, "guests").value, getServiceKey(panel)) },
    { name: "time",   check: panel => validateTime(getField(panel, "time").value) },
    { name: "age",    check: panel => validateAge(getField(panel, "age").checked) }
];
 
// Bara de regler vars fält faktiskt finns i den här panelen
function getRulesFor(panel) {
    return FIELD_RULES.filter(rule => getField(panel, rule.name) !== null);
}
 
/* =====================================================================
   5. UPPDATERA SIDAN – visa/dölj fel, sammanfattning, bekräftelse
   ===================================================================== */
function showError(panel, name, message) {
    const input = getField(panel, name);
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    // Symbolen ⚠ gör att felet syns även utan färg.
    getErrorBox(panel, name).textContent = "⚠ " + message;
}
 
function clearError(panel, name) {
    const input = getField(panel, name);
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
    getErrorBox(panel, name).textContent = "";
}
 
function errorIsShown(panel, name) {
    return getErrorBox(panel, name).textContent !== "";
}
 
// Validerar ETT fält. Returnerar true om det är OK.
function validateField(panel, rule) {
    const message = rule.check(panel);
    if (message) {
        showError(panel, rule.name, message);
        return false;
    }
    clearError(panel, rule.name);
    return true;
}
 
// Validerar hela formuläret. Det användaren skrivit finns kvar, bara felen visas.
function validateForm(panel) {
    let firstInvalidName = null;
    getRulesFor(panel).forEach(rule => {
        const ok = validateField(panel, rule);
        if (!ok && firstInvalidName === null) firstInvalidName = rule.name;
    });
    if (firstInvalidName) getField(panel, firstInvalidName).focus();
    return firstInvalidName === null;
}
 
function renderSummary(panel) {
    const serviceKey = getServiceKey(panel);
    const service = SERVICES[serviceKey];
    const guests = getGuests(panel);
    const extraKeys = getSelectedExtras(panel);
    const dateValue = getField(panel, "date").value;
    const timeField = getField(panel, "time");
    const guestsOk = validateGuests(getField(panel, "guests").value, serviceKey) === "";
 
    let html = '<h3 class="h5 fw-bold">Din bokning</h3><dl class="mb-0">';
    html += "<dt>Vald tjänst</dt><dd>" + service.label + "</dd>";
    html += "<dt>Datum</dt><dd>" + (dateValue || "Inte valt än") + "</dd>";
    if (timeField) html += "<dt>Tid</dt><dd>" + (timeField.value || "Inte vald än") + "</dd>";
    html += "<dt>Antal personer</dt><dd>" + (guestsOk ? guests : "Ogiltigt antal") + "</dd>";
    html += "<dt>Tillval</dt><dd>" +
        (extraKeys.length ? extraKeys.map(key => EXTRAS[key].label).join(", ") : "Inga") + "</dd>";
    html += "</dl><hr>";
 
    if (guestsOk) {
        // En rad per del av priset, så man ser hur summan räknas ut
        getPriceLines(serviceKey, guests, extraKeys).forEach(line => {
            html += '<div class="d-flex justify-content-between small"><span>' + line.label +
                "</span><span>" + formatPrice(line.amount) + "</span></div>";
        });
        html += '<hr><div class="d-flex justify-content-between fs-5 fw-bold"><span>Total kostnad</span><span>' +
            formatPrice(calculateTotal(serviceKey, guests, extraKeys)) + "</span></div>";
    } else {
        html += '<div class="text-muted">Totalpris visas när antal personer är giltigt.</div>';
    }
    panel.querySelector("[data-summary]").innerHTML = html;
 
    // Prisraden precis ovanför knappen
    panel.querySelector("[data-price-bar]").textContent = guestsOk
        ? "Total kostnad: " + formatPrice(calculateTotal(serviceKey, guests, extraKeys))
        : "Total kostnad: ange ett giltigt antal personer";
}
 
// Skyddar mot att användaren skriver HTML i namnfältet
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
 
function showConfirmation(panel) {
    const serviceKey = getServiceKey(panel);
    const guests = getGuests(panel);
    const total = calculateTotal(serviceKey, guests, getSelectedExtras(panel));
    const reference = "ATH-" + Math.floor(100000 + Math.random() * 900000);
    const timeField = getField(panel, "time");
 
    panel.querySelector("[data-summary]").innerHTML =
        '<h3 class="h5 fw-bold text-success">✔ Bokningen är mottagen</h3>' +
        "<p>Tack " + escapeHtml(getField(panel, "name").value.trim()) + "! " +
        "En bekräftelse skickas till " + escapeHtml(getField(panel, "email").value.trim()) + ".</p>" +
        "<dl><dt>Bokningsreferens</dt><dd>" + reference + "</dd>" +
        "<dt>Tjänst</dt><dd>" + SERVICES[serviceKey].label + "</dd>" +
        "<dt>Datum</dt><dd>" + getField(panel, "date").value + "</dd>" +
        (timeField ? "<dt>Tid</dt><dd>" + timeField.value + "</dd>" : "") +
        "<dt>Antal personer</dt><dd>" + guests + "</dd>" +
        "<dt>Total kostnad</dt><dd>" + formatPrice(total) + "</dd></dl>" +
        '<button type="button" class="btn btn-outline-primary" data-new-booking>Gör en ny bokning</button>';
 
    panel.querySelector("[data-new-booking]").addEventListener("click", () => resetBooking(panel));
}
 
function resetBooking(panel) {
    panel.querySelector("form").reset();
    getRulesFor(panel).forEach(rule => clearError(panel, rule.name));
    renderSummary(panel);
}
 
// Visar panelen för vald slide och döljer de andra
function showPanelFor(serviceKey) {
    getPanels().forEach(panel => {
        panel.classList.toggle("d-none", getServiceKey(panel) !== serviceKey);
    });
}
 
/* =====================================================================
   6. HÄNDELSER – här kopplas allt ihop
   ===================================================================== */
function handleSubmit(event, panel) {
    event.preventDefault(); // hindrar sidan från att laddas om (och tömma formuläret)
    if (validateForm(panel)) {
        showConfirmation(panel);
    } else {
        renderSummary(panel);
    }
}
 
// Förbereder ETT formulär: texter från SERVICES/EXTRAS, händelser och första sammanfattningen
function setupPanel(panel) {
    const serviceKey = getServiceKey(panel);
    const max = SERVICES[serviceKey].maxGuests;
 
    const guestsField = getField(panel, "guests");
    guestsField.min = 1;
    guestsField.max = max;
    panel.querySelector("[data-max-hint]").textContent = "(max " + max + ")";
 
    getField(panel, "date").min = todayAsText();
 
    panel.querySelectorAll("[data-extra-price]").forEach(span => {
        span.textContent = "+" + formatPrice(EXTRAS[span.dataset.extraPrice].pricePerPerson);
    });
 
    panel.querySelector("form").addEventListener("submit", event => handleSubmit(event, panel));
 
    getRulesFor(panel).forEach(rule => {
        const input = getField(panel, rule.name);
        input.addEventListener("blur", () => validateField(panel, rule));
        input.addEventListener("input", () => {
            // Live-fält kontrolleras medan man skriver. Övriga kontrolleras när de lämnas,
            // men när ett fel väl visas rättas det direkt när användaren åtgärdar det.
            if (rule.live || errorIsShown(panel, rule.name)) validateField(panel, rule);
            renderSummary(panel);
        });
        input.addEventListener("change", () => renderSummary(panel));
    });
 
    panel.querySelectorAll('input[name="extra"]').forEach(box =>
        box.addEventListener("change", () => renderSummary(panel)));
 
    renderSummary(panel);
}
 
function init() {
    document.getElementById("jsWarning").classList.add("d-none"); // filen laddades, så varningen göms
    getPanels().forEach(setupPanel);
 
    // När karusellen har bytt slide visas formuläret för den slidens tjänst.
    // event.relatedTarget är den nya sliden; dess data-service säger vilken tjänst det är.
    document.getElementById("carouselExample").addEventListener("slid.bs.carousel", event =>
        showPanelFor(event.relatedTarget.dataset.service));
 
    // Börja med den slide som är aktiv när sidan laddas
    showPanelFor(document.querySelector("#carouselExample .carousel-item.active").dataset.service);
}
 
init();