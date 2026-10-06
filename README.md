README - Aten Turisbyrå Bokningswebbplats

### OM PROJEKTET ###

Aten Turisbyrå är en bokningswebbplats för resor och upplevelser i Aten, Grekland. Webbplatsen låter turister se erbjudanden, beräkna priser och skicka bokningsförfrågningar för olika aktiviteter och tjänster.

Delvis Inspirerad av: https://www.thisisathens.org/


# Ni får uppdatera detta själva :D #
Ansvarsfördelning:
Namn		Bokningsområde			Ansvar
Viktor? 	Aktiviteter				HTML, CSS, JavaScript för Activity-sida
Daniel		Historia				HTML, CSS, JavaScript för History-sida
Alexander?	Planera resan			HTML, CSS, JavaScript för Plan your trip-sida
William?	Mat & Dryck/Resort		HTML, CSS, JavaScript för både Eat & Drink/Resort-sida


## Gemensamma designbeslut ##
- Vi använder Bootstrap som grund.
- Vi använder en gemensam färgpalett inspirerad av Grekland.
- Vi använder samma navigation på alla sidor.
- Vi använder samma typ av bokningskort och formulär.
- Vi använder samma knappstil på hela webbplatsen.
- Den gemensamma CSS-filen finns i `shared/css/style.css`.
- Varje bokningssida har en egen HTML-fil och JavaScript-fil.


## FILTRÄD ##
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
│   ├── eat-and-drink.js
│
├── shared/
│   └── css/
│       └── style.css
│
├── images/
│
└── README.md




## Tekniska krav (från uppgiften) ##

Varje bokningssida måste innehålla:

[] Erbjudanden – Minst 3 erbjudanden i JavaScript-array med id, namn, beskrivning, pris 
[] Val av erbjudande – Radio-knappar eller liknande 
[] Prisberäkning – Multiplicerar pris × antal (1-5) 
[] Formulär – Namn, email, erbjudande, antal 
[] Egen validering – JavaScript-validering (INTE webbläsarens inbyggda) 
[] Bekräftelse – Visar sammanfattning utan omladdning 
[] Återställning – "Börja om"-knapp tömmer allt


## GEMENSAMA REGLER ##
Git Commits:

docs: → kommentarer, README och dokumentation
feat: → ny funktion
fix: → buggfix
style: → CSS/Bootstrap/layout utan ändrad funktionalitet
refactor: → ändrar kodstruktur utan att ändra funktionaliteten
Tema: Vanilla bootstrap (För nu)


Saker att testa:
TEST:									Förväntat resultat:
Skicka tomt formulär					Egna felmeddelanden visas
Namn är endast blanksteg				Namnfel visas
E-post saknar @							E-postfel visas
E-post innehåller blanksteg				E-postfel visas
E-post är a@b.se						Godkänns
Inget erbjudande är valt				Felmeddelande visas
Antal är 0								Felmeddelande visas
Antal är 2.5							Felmeddelande visas
Antal är 1								Godkänns
Erbjudande med pris 300 och antal 2		Totalpris blir 600 kr
Bekräfta giltigt formulär				Sammanfattning visas utan omladdning
Klicka på Börja om						Alla värden och meddelanden återställs

#### Personliga antecknignar ####


## Aktiviteter ##

## Historia - Daniel ## 

## Planera resan ## 	

## Mat & Dryck/Resort ## 










