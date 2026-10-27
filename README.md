# Aten Turisbyrå – Bokningswebbplats

En bokningswebbplats för resor, aktiviteter och upplevelser i **Aten, Grekland**.

Webbplatsen låter turister utforska erbjudanden, beräkna priser och skicka bokningsförfrågningar för olika aktiviteter och tjänster.

> **Delvis inspirerad av:** [This is Athens](https://www.thisisathens.org/)

---

## Innehåll

- [Om projektet](#om-projektet)
- [Ansvarsfördelning](#ansvarsfördelning)
- [Gemensamma designbeslut](#gemensamma-designbeslut)
- [Git commits](#git-commits)
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
- Beräkna pris utifrån valt erbjudande och antal av enhet
- Skicka en bokningsförfrågan
- Få en bekräftelse utan att sidan laddas om

---

## Ansvarsfördelning

| Namn | Bokningsområde | Ansvar |
|---|---|---|
| **Alexander** | Aktiviteter | HTML, CSS och JavaScript för Activity-sidan |
| **Daniel** | Historia | HTML, CSS och JavaScript för History-sidan |
| **Viktor** | Planera resan | HTML, CSS och JavaScript för Plan Your Trip-sidan |
| **William?** | Mat & Dryck / Resort | HTML, CSS och JavaScript för Eat & Drink / Resort-sidan |

---

## Gemensamma designbeslut

- Vi använder **Bootstrap** som grund.
- Vi använder en gemensam färgpalett inspirerad av Grekland.
- Vi använder samma navigation på alla sidor.
- Vi använder samma typ karusell.
- Vi använder samma knappstil på hela webbplatsen.
- Erbjudanden, formulär och bokningsbekräftelse är upp till var och en.

---

## Git commits

Vi använder följande prefix för våra Git commits:

| Prefix | Beskrivning |
|---|---|
| `docs:` | Kommentarer, README och dokumentation |
| `feat:` | Ny funktion |
| `fix:` | Buggfix |
| `style:` | CSS, Bootstrap eller layout utan ändrad funktionalitet |
| `refactor:` | Ändrar kodstruktur utan att ändra funktionaliteten |

---

## Github branches

| Branch-namn | Del | Ansvar |
|---|---|---|
| landing | Landing page | alla för sin del |
| Historia | Ta dig runt | Daniel |
| upplevelser | Upplevelser | Alexander |
| fare | Mat & Dryck | William |
| travel | Ta dig runt | Viktor |

---

## Personliga anteckningar

Detta avsnitt används för personliga anteckningar, idéer och uppgifter för respektive bokningsområde.

### Upplevelser

**Ansvarig:** Alexander

- 
- 
- 

### Historia – Daniel

**Ansvarig:** Daniel

- 
- 
- 

### Mat & Dryck / Resort

**Ansvarig:** William?

- 
- 
- 

### Ta dig runt - Viktor

**Ansvarig:** Viktor

- Valde att inte ha ifyllt "1" på antal dagar, då jag inte vill att man kan råka skicka formuläret innan man har valt vad man faktiskt vill ha.
- Valde också type=text input på antal dagar för att jag inte ville ha pilarna som kom med type=number.
- 










