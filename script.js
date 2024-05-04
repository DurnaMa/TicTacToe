let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle"; // Startet mit Kreis

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById("content");

    // Generate table HTML
    let tableHtml = "<table>";
    for (let i = 0; i < 3; i++) {
        tableHtml += "<tr>";
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = "";
            let onClick = `onclick="makeMove(${index})"`; // Hinzufügen des onclick Handlers
            if (fields[index] === "circle") {
                symbol = generateCircleSVG();
                onClick = ""; // Entfernt den onclick Handler, wenn das Feld besetzt ist
            } else if (fields[index] === "cross") {
                symbol = generateCrossSVG();
                onClick = ""; // Entfernt den onclick Handler, wenn das Feld besetzt ist
            }
            tableHtml += `<td ${onClick}>${symbol}</td>`; // Hinzufügen des onclick Attributes
        }
        tableHtml += "</tr>";
    }
    tableHtml += "</table>";

    // Set table HTML to contentDiv
    contentDiv.innerHTML = tableHtml;
}

function makeMove(index) {
    if (fields[index] === null) {
        // Überprüft, ob das Feld leer ist
        fields[index] = currentPlayer; // Setzt den aktuellen Spieler in das Feld
        render(); // Neuzeichnen des Spielbretts

        // Wechselt den Spieler
        currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
    }
}

function generateCircleSVG() {
    const color = "#00B0EF"; // Farbe des Kreises
    const width = 50; // Breite des SVG-Elements
    const height = 50; // Höhe des SVG-Elements
    const strokeWidth = 5; // Stärke der Linie des Kreises
    const radius = 50 - strokeWidth / 2; // Radius des Kreises, angepasst um die Linienstärke
    const circumference = 2 * Math.PI * radius; // Umfang des Kreises

    // Erzeugen des SVG-HTML-Codes als String mit Template-Literal
    const svgHtml = `
      <svg width="${width}" height="${height}" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="${radius}" fill="none" stroke="${color}"
                stroke-width="${strokeWidth}" stroke-dasharray="${circumference}"
                stroke-dashoffset="${circumference}">
          <animate attributeName="stroke-dashoffset" from="${circumference}" to="0"
                   begin="0s" dur="125ms" fill="freeze" />
        </circle>
      </svg>
    `;

    return svgHtml;
}

function generateCrossSVG() {
    const color = "#FFC000"; // Farbe des Kreuzes
    const width = 50; // Breite des SVG-Elements
    const height = 50; // Höhe des SVG-Elements
    const strokeWidth = 5; // Stärke der Linie des Kreuzes
    const length = Math.sqrt(width * width + height * height); // Diagonale des SVG-Elements

    // Erzeugen des SVG-HTML-Codes als String mit Template-Literal
    const svgHtml = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <line x1="0" y1="0" x2="${width}" y2="${height}"
              stroke="${color}" stroke-width="${strokeWidth}" stroke-dasharray="${length}"
              stroke-dashoffset="${length}">
          <animate attributeName="stroke-dashoffset" from="${length}" to="0"
                   begin="0s" dur="125ms" fill="freeze" />
        </line>
        <line x1="${width}" y1="0" x2="0" y2="${height}"
              stroke="${color}" stroke-width="${strokeWidth}" stroke-dasharray="${length}"
              stroke-dashoffset="${length}">
          <animate attributeName="stroke-dashoffset" from="${length}" to="0"
                   begin="0s" dur="125ms" fill="freeze" />
        </line>
      </svg>
    `;

    return svgHtml;
}
