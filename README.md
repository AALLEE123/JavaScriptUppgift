# Aten Turisbyrå – Bokningswebbplats

En bokningswebbplats för resor, aktiviteter och upplevelser i **Aten, Grekland**.

Webbplatsen låter turister utforska erbjudanden, beräkna priser och skicka bokningsförfrågningar för olika aktiviteter och tjänster.

> **Delvis inspirerad av:** [This is Athens](https://www.thisisathens.org/)

---

## Innehåll

- [Om projektet](#om-projektet)
- [Ansvarsfördelning](#ansvarsfördelning)
- [Gemensamma designbeslut](#gemensamma-designbeslut)
- [Projektstruktur](#projektstruktur)
- [Tekniska krav](#tekniska-krav)
- [Gemensamma regler](#gemensamma-regler)
- [Testfall](#testfall)
- [Personliga anteckningar](#personliga-anteckningar)
- [Status](#status)

---

## Om projektet

**Aten Turisbyrå** är en bokningswebbplats för turister som vill upptäcka Aten, Grekland.

Webbplatsen ska låta användaren:

- Utforska aktiviteter och sevärdheter
- Lära sig mer om Atens historia
- Planera sin resa
- Upptäcka mat, dryck och resort-alternativ
- Beräkna pris utifrån valt erbjudande och antal personer
- Skicka en bokningsförfrågan
- Få en bekräftelse utan att sidan laddas om

---

## Ansvarsfördelning

| Namn | Bokningsområde | Ansvar |
|---|---|---|
| **Viktor?** | Aktiviteter | HTML, CSS och JavaScript för Activity-sidan |
| **Daniel** | Historia | HTML, CSS och JavaScript för History-sidan |
| **Alexander?** | Planera resan | HTML, CSS och JavaScript för Plan Your Trip-sidan |
| **William?** | Mat & Dryck / Resort | HTML, CSS och JavaScript för Eat & Drink / Resort-sidan |

> Namn markerade med `?` behöver uppdateras när ansvarsfördelningen är bekräftad.

---

## Gemensamma designbeslut

- Vi använder **Bootstrap** som grund.
- Vi använder en gemensam färgpalett inspirerad av Grekland.
- Vi använder samma navigation på alla sidor.
- Vi använder samma typ av bokningskort och formulär.
- Vi använder samma knappstil på hela webbplatsen.
- Den gemensamma CSS-filen finns i `shared/css/style.css`.
- Varje bokningssida har en egen HTML-fil och JavaScript-fil.
- Projektet använder **Vanilla JavaScript + Bootstrap**.

---

## Projektstruktur

```text
JavaScriptUppgift/
│
├── index.html
│
├── viktor/
│   ├── activities.html
│   └── activities.js
│
├── daniel/
│   ├── history.html
│   └── history.js
│
├── alexander/
│   ├── plan-your-trip.html
│   └── plan-your-trip.js
│
├── william/
│   ├── eat-and-drink.html
│   └── eat-and-drink.js
│
├── shared/
│   └── css/
│       └── style.css
│
├── images/
│
└── README.md
```

## Tekniska krav (från uppgiften)

Varje bokningssida måste innehålla:

- [ ] **Erbjudanden** – Minst 3 erbjudanden i en JavaScript-array med `id`, `namn`, `beskrivning` och `pris`.
- [ ] **Val av erbjudande** – Radio-knappar eller liknande.
- [ ] **Prisberäkning** – Multiplicerar `pris × antal` där antal är mellan `1–5`.
- [ ] **Formulär** – Namn, e-post, erbjudande och antal.
- [ ] **Egen validering** – JavaScript-validering, **inte** webbläsarens inbyggda validering.
- [ ] **Bekräftelse** – Visar en sammanfattning utan att sidan laddas om.
- [ ] **Återställning** – En **"Börja om"**-knapp som tömmer allt.



## Gemensamma regler

### Git Commits

Vi använder följande prefix för våra Git commits:

| Prefix | Beskrivning |
|---|---|
| `docs:` | Kommentarer, README och dokumentation |
| `feat:` | Ny funktion |
| `fix:` | Buggfix |
| `style:` | CSS, Bootstrap eller layout utan ändrad funktionalitet |
| `refactor:` | Ändrar kodstruktur utan att ändra funktionaliteten |

### Tema

**Vanilla JavaScript + Bootstrap**

---

## Saker att testa

Följande testfall ska kontrolleras på varje bokningssida:

| Test | Förväntat resultat |
|---|---|
| Skicka tomt formulär | Egna felmeddelanden visas |
| Namn är endast blanksteg | Namnfältsfel visas |
| E-post saknar `@` | E-postfel visas |
| E-post innehåller blanksteg | E-postfel visas |
| E-post är `a@b.se` | Godkänns |
| Inget erbjudande är valt | Felmeddelande visas |
| Antal är `0` | Felmeddelande visas |
| Antal är `2.5` | Felmeddelande visas |
| Antal är `1` | Godkänns |
| Erbjudande med pris 300 och antal 2 | Totalpris blir **600 kr** |
| Bekräfta giltigt formulär | Sammanfattning visas utan omladdning |
| Klicka på "Börja om" | Alla värden och meddelanden återställs |

---

## Personliga anteckningar

Detta avsnitt används för personliga anteckningar, idéer och uppgifter för respektive bokningsområde.

### Aktiviteter

**Ansvarig:** Viktor?

- 
- 
- 

### Historia – Daniel

**Ansvarig:** Daniel

- 
- 
- 

### Planera resan

**Ansvarig:** Alexander?

- 
- 
- 

### Mat & Dryck / Resort

**Ansvarig:** William?

- 
- 
- 











