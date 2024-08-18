# Make it POP!

[<img src="insert img" alt="name" width="800">](https://vimeo.com/1000127063?share=copy)<br>
 (klik op de afbeelding om een video te zien)

### What is Make it POP! ?

Dit is een teken uitdaging dat is geinspireerd door een tekentechniek dat ik heb gebruikt tijdens modeltekenen.<br>
<img src="img/artist.jpeg" alt="open hand" width="400"> <br>

Hier bij daag ik u uit. Start de code (see "How to Use) en ga met uw hand 1m ongeveer van de webcam staan. Klik op spatie om te starten en maak een lijn tekening met één hand zichtbaar voor de camera. En als je het duft maak een vuist "to Make it POP!"<br>
<img src="img/openhand.jpeg" alt="open hand" width="200"> <img src="img/imgfist.jpeg" alt="fist" width="300"> <br>

Ik heb dit gamaakt om mijzelf met 2 dingen te helpen arm en schouderbeweging en om weer terug creatief bezig te zijn. Daardoor heb ik hiervan een simpel mini game van gemaakt dat u creatief uitdaagt en dat bijna iedereen kan doen.

### How to Use

Het opstarten van de code is vrij simpel. Als eerste is natuurlijk de code clonen van github. <br>
`git clone https://github.com/Bannos77/make.it.POP.git`

Dan lijkt het mij handig om hiervan een vite project te maken. <br>
`npm create vite@lates`

Als je dat hebt gedaan ga je nog een drie dingen copy pasten voor de python code. <br>
`pip install opencv-pytho` `pip install pyautogui` `pip install mediapipe`

Eenmaal je dit hebt gedaan kan je zegmaar de code gebruike. Dit ga ga je doen door bij de terminal of powershell `npm run dev` in te zetten voor een locale host te maken. Dan ga je de python code open in Visual Studio Code en klik je op de play button rechts bovenaan voor de python te activeren. En als laatste open je de localhost link je gekozen webbrowser.

<ul>Mogelijke problemen dat je kan tegen komen:<br>
<li>Zie dat je kan connecten aan een webcam om de python code te gebruiken.</li>
<li>Volgende is kijken hoe ver je de camera sensor wil gebruiken en verander in de code als het moet (standaard staat op +/- 1m) Anders zal het clicken met je hand moeilijk gaan. (bekijk Python om te zien hoe je dit moet veranderen)</li>
<li>Zorg ervoor dat de camera maar een hand ziet anders weet hij niet welke hand hij moet gebruiken als muis en flipt die een beetje.</li>
</ul>

## The Code

De code is ingedeeld in 4 hoofdstukken. Ik ga bij elke hoofstuk uitleggen wat ze doen en code eruit highlighten dat extra uitleg nodig heeft.

### HTML

De html is is niet al te ingewikkeld en bijna spreekt voorzich. Toch ga ik het een beetje uitleggen. De `<div id="overlay">` is vooral u start pagina en legt uit wat je hoe je het spel moet spelen. Daarna komt de `<div id="canvas">` en deze zocht voor de animaties en draw functies.<br>
Natuurlijk komt de 2 scripts hierna. De eerste is is voor de animatie en de tweede is de script waar wij aan kunnen knoeien en werken.

<img src="img/html.jpeg" alt="html" width="400">
<br>
<br>

### CSS

De css is vooral voor de start pagina. Dit gaat vooral over de `overlay` overgang animatie en hoe de tekst en startknop eruitziet.<br>
Dat is niet alles er is een klein stukje voor de `canvas` en dat is de canvas size.<br>
Hier kan je vooral knoeie aan de font size, welke font de tekst aantoont en de knop om het persoonlijker te maken.
<br>
<br>

### JAVASCRIPT

Nu komt de grote stuk van de code. Deze heb ik al voor jullie zelfs in de code zelf ingedeeld in hoofdstukken dat titels heeft met wat wat doet om dit geen info dump te worden.<br>
Toch ga ik er een paar stukjes eruithalen dat toch extra info nodig heeft.<br>
Als eerste zal ik de hoofstuk 6. Event Handling bespreken.<br>
Ik haal deze naarboven omdat het niet echt voorzich spreekt wat het doet maar simpel weg dit zorgt voor de pop animaties dat de lijn tekening weghaalt en alles van kleur laat veranderen.

<img src="img/handeling.jpeg" alt="handeling" width="400"> <br>

Volgende zal ik hoofstuk 12. Animation Loop naarboven halen.<br>
Deze zegt ook niet echt wat het doet. Dit is de lijn dat vormt nadat je je muis od hand beweegt. Hier kan je ook de dikte van de lijn veranderen als je `ctx.lineWidth = 5;` groter of kleiner maakt.

<img src="img/animatie.jpeg" alt="name" width="400"> <br>

Deze hoofstuk heb ik er iets bij extra gezet om de gemak te verbeteren 14. Start Button Handling<br>
En dat is de manier om op de spatiebalk te drukken als het niet lukt om met uw hand de startknop te drukken.

<img src="img/refresh.jpeg" alt="refresh" width="400"> <br>

En als laatste haal ik naarboven hoofdstuk 16. Inactivity Check.<br>
deze zit erin als de persoon klaar is en weg is. Gaat de webpagina na 30 seconden inactiviteit heropladen. Dit zorgt ervoor dat mensen niet binnen komen bij een blanko scherm of een scherm met lijnen.<br>

<img src="img/control_refresh.jpeg" alt="control" width="400"> <br>

Als je de lengte van inactivety wilt veranderen doet dat aan de top van de code bij `var inactivityTimeout = 30000;`. Hier kan je de lengte korter of langer maken.

<img src="img/var.jpeg" alt="var" width="400">
<br>
<br>

### PYTHON

Bij de python code heb ik hetzelfde gedaan als bij de javascript. Elke gedeelte van de code dat iets doet heb ik een titel gegeven. Dus ik ga een beetje hetzelfde doen als bij de vorige gedeeldte en ga stukken code eruithalen dat ik een beetje extra uitlag wil geven.<br>
Als eerste zullen we een belangrijke naarvoren halen en dat heeft de titel: Distance threshold for detecting a fist.<br>
Deze stuk code zorgt ervoor dat je met een vuist kan klikken. En hoe groter de nummer de dischterbij de camera je moet zijn.

<img src="img/0.05.jpeg" alt="0.05" width="400"> <br>

Volgende is misschien handig om te weten op voorand en dat heeft de titel: Track thumb tip and control mouse movement.<br>
Dit stukje code is hoe we onze muis kunnen laten bewegen. Ik heb ervoor gekozen dat de muis de duim volgt. Dit kan je altijd vervangen door de `id == 4:` van 4 naar een andere punt te veranderen.

<img src="img/fist.jpeg" alt="code fist" width="400"> <br>

Ook wil ik iets kort uitleggen bij: Check for fist gesture.<br>
In dit stukje code heb ik het zo gezet dat als de vuist dicht is gaat hij klikken. Om te voorkomen dat dat heel snel gebeurt heb ik er nog een soort van conofrmation systeem bijgezet. Dit komt door frames controleren.

<img src="img/duim.jpeg" alt="duil" width="400"> <br>

Dit kan je ook veranderen in de hoofdstuk: Number of consecutive frames to confirm a fist gesture. Hier kan je de nummer hogerzetten als het klikken te snel gaat of lager als het te traag gebeurt.

<img src="img/frames.jpeg" alt="frame control" width="400"> <br>


### Codes used to make this code

[Video handgesture mouse control](https://www.youtube.com/watch?v=nOoKjMvvvXU&pp=ygUmcHl0aG9uIGNvZGUgZm9yIGhhbmQgZ2VzdHVyZSB0byBtb3VzZSA%3D)<br>
[Codepen for canvas code](https://codepen.io/alexzaworski/pen/mEZvrG)
