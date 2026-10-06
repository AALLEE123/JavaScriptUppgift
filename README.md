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
| **Alexander?** | Aktiviteter | HTML, CSS och JavaScript för Activity-sidan |
| **Daniel** | Historia | HTML, CSS och JavaScript för History-sidan |
| **Viktor** | Planera resan | HTML, CSS och JavaScript för Plan Your Trip-sidan |
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
├── Alexander/
│   ├── activities.html
│   └── activities.js
│
├── Daniel/
│   ├── history.html
│   └── history.js
│
├── Viktor/
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

## Tekniska krav på JAVASCRIPT (från uppgiften)
 
Varje bokningssida måste innehålla:
 
  - [ ] **Erbjudanden** – Minst 3 erbjudanden i en JavaScript-array av objekt med unikt `id`, `namn`, kort `beskrivning` och `pris` per enhet. De ska visas på sidan med JavaScript och iteration (t.ex. `forEach`), inte skrivas för hand i HTML.
  - [ ] **Val av erbjudande** – Radio-knappar eller liknande. Det valda erbjudandet ska synas tydligt.
  - [ ] **Prisberäkning** – En funktion som multiplicerar `pris × antal`, där antal är ett **heltal** `1–5`. Etiketten visar enheten (t.ex. personer eller timmar). Priset uppdateras när erbjudande eller antal ändras till giltiga värden. Om priset inte kan beräknas visas ett begripligt meddelande, **aldrig** `NaN`. Moms, rabatter och datum ingår inte.
  - [ ] **Formulär** – Namn, e-post, erbjudande och antal, alla med tydliga etiketter.
  - [ ] **Egen validering** – JavaScript-validering, **inte** webbläsarens inbyggda (`novalidate`). Följande ska kontrolleras:
  - [ ] Namn är ifyllt och inte bara blanksteg.
  - [ ] E-post är ifylld, saknar blanksteg och har exakt ett `@` med text före och efter. Domänen har minst en punkt med text på båda sidor.
  - [ ] Ett giltigt erbjudande är valt.
  - [ ] Antal är ett heltal `1–5`.
  - [ ] Egna felmeddelanden förklarar vilket fält som är fel och varför, och tas bort eller uppdateras när felet rättas.
  - [ ] **Bekräftelse** – Visar en sammanfattning utan att sidan laddas om, men bara när alla uppgifter är giltiga. Sammanfattningen innehåller namn, e-post, valt erbjudande, antal med enhet och totalpris, och stämmer med den bekräftade förfrågan. Efter bekräftelsen går uppgifterna **inte** att redigera.
  - [ ] **Återställning** – En **"Börja om"**-knapp som finns både under ifyllnaden och efter bekräftelsen och som:
  - [ ] Tömmer namn och e-post.
  - [ ] Tar bort valt erbjudande och visuella markeringar.
  - [ ] Sätter antal till **1**.
  - [ ] Tar bort felmeddelanden och bekräftelse.
  - [ ] Återställer prisvisningen till ett meddelande om att ett erbjudande måste väljas.
  - [ ] Gör att flödet kan köras igen utan kvarvarande uppgifter eller dubblerade bekräftelser.


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

**Ansvarig:** Alexander?

- 
- 
- 

### Historia – Daniel

**Ansvarig:** Daniel

- 
- 
- 

### Planera resan - Viktor

**Ansvarig:** Viktor

- 
- 
- 

### Mat & Dryck / Resort

**Ansvarig:** William?

- 
- 
- 











