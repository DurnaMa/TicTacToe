let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle";
let isGameOver = false;

function init() {
    let isGameOver = false;
    render();
}

function render() {
    const contentDiv = document.getElementById("content");

    let tableHtml = "<table>";
    for (let i = 0; i < 3; i++) {
        tableHtml += "<tr>";
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = "";
            let onClick = `onclick="makeMove(${index})"`;
            if (fields[index] === "circle") {
                symbol = generateCircleSVG();
                onClick = "";
            } else if (fields[index] === "cross") {
                symbol = generateCrossSVG();
                onClick = "";
            }
            tableHtml += `<td ${onClick}>${symbol}</td>`;
        }
        tableHtml += "</tr>";
    }
    tableHtml += "</table>";

    contentDiv.innerHTML = tableHtml;
}

function makeMove(index) {
    if (fields[index] === null && !isGameOver) {
        // Überprüft, ob das Feld leer ist und das Spiel nicht beendet
        fields[index] = currentPlayer;
        render();
        if (checkForWin()) {
            isGameOver = true; // Setzt das Spiel als beendet, wenn ein Gewinn erkannt wird
            return; // Beendet die Funktion frühzeitig, wenn jemand gewonnen hat
        }
        currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
    }
}

function checkForWin() {
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winCombinations) {
        if (
            fields[combination[0]] !== null &&
            fields[combination[0]] === fields[combination[1]] &&
            fields[combination[0]] === fields[combination[2]]
        ) {
            console.log("Winning combination found:", combination);
            drawWinLine(combination);
            return true;
        }
    }
    return false;
}

function drawWinLine(winCombination) {
    console.log("Draw winning line for combination: ", winCombination);
}

function generateCircleSVG() {
    const color = "#00B0EF";
    const width = 50;
    const height = 50;
    const strokeWidth = 5;
    const radius = 50 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

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
    const color = "#FFC000";
    const width = 50;
    const height = 50;
    const strokeWidth = 5;
    const length = Math.sqrt(width * width + height * height);

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

function drawWinLine(winCombination) {
    const cells = document.querySelectorAll('td');
    const startCell = cells[winCombination[0]];
    const endCell = cells[winCombination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    // Zentrum der Start- und Endzelle berechnen
    const startX = startRect.left + window.scrollX + startRect.width / 2;
    const startY = startRect.top + window.scrollY + startRect.height / 2;
    const endX = endRect.left + window.scrollX + endRect.width / 2;
    const endY = endRect.top + window.scrollY + endRect.height / 2;

    // Linienlänge und Winkel berechnen
    const lineLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const lineAngle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

    // Linie erstellen und positionieren
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = '5px';
    line.style.backgroundColor = 'white';
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;
    line.style.transform = `rotate(${lineAngle}deg)`;
    line.style.transformOrigin = '0% 50%';

    document.body.appendChild(line);  // Die Linie zum Spielfeld hinzufügen
}
