# Make it POP!

[<img src="insert name" alt="name" width="x">](insert link)<br>
 (klik op de afbeelding om een video te zien)

### What is Make it POP! ?

Dit is een teken uitdaging dat is geinspireerd door een tekentechniek dat ik heb gebruikt tijdens modeltekenen.<br>
<img src="inset name" alt="name" width="x"> <br>

Hier bij daag ik u uit. Start de code (see "How to Use) en ga met uw hand 1m ongeveer van de webcam staan. Klik op spatie om te starten en maak een lijn tekening en als je het duft maak een vuist met de duim vooraan "to Make it POP!"<br>
<img src="inset name" alt="name" width="x"> <br>

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
<li>Volgende is kijken hoe ver je de camera sensor wil gebruiken en verander in de code als het moet (standaard staat op +/- 1m) Anders zal het clicken met je hand moeilijk gaan. (bekijk Javascript om te zien hoe je dit moet veranderen)</li>
<li>Zorg ervoor dat de camera maar een hand ziet anders weet hij niet welke hand hij moet gebruiken als muis en flipt die een beetje.</li>
</ul>

## The Code

De code is ingedeeld in 4 hoofdstukken. Ik ga bij elke hoofstuk uitleggen wat ze doen en code eruit highlighten dat extra uitleg nodig heeft.

### HTML

De html is is niet al te ingewikkeld en bijna spreekt voorzich. Toch ga ik het een beetje uitleggen. De `<div id="overlay">` is vooral u start pagina en legt uit wat je hoe je het spel moet spelen. Daarna komt de `<div id="canvas">` en deze zocht voor de animaties en draw functies.<br>
Natuurlijk komt de 2 scripts hierna. De eerste is is voor de animatie en de tweede is de script waar wij aan kunnen knoeien en werken.

### CSS

### JAVASCRIPT

### PYTHON