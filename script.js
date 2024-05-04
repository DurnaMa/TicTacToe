let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle";

function init() {
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
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        if (checkForWin()) {
            drawWinLine();
            return; // Beendet die Funktion frühzeitig, wenn jemand gewonnen hat
        }
        render();

        currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
    }
}

function checkForWin() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Zeilen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
        [0, 4, 8], [2, 4, 6]            // Diagonalen
    ];

    for (const combination of winCombinations) {
        if (fields[combination[0]] !== null && 
            fields[combination[0]] === fields[combination[1]] && 
            fields[combination[0]] === fields[combination[2]]) {
            drawWinLine(combination); // Stelle sicher, dass die korrekte Kombination übergeben wird
            return true;
        }
    }
    return false;
}

function drawWinLine(winCombination) {
    // Bestimme die Koordinaten der Gewinnlinie basierend auf der Gewinnkombination
    console.log('Draw winning line for combination: ', winCombination);
    // Implementierung der Linienzeichnung hier...
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
    if (!winCombination) {
        console.error('Invalid win combination');
        return;
    }

    const table = document.querySelector("#content table");
    if (!table) {
        console.error('Table not found');
        return;
    }
    const rect = table.getBoundingClientRect();

    // Berechnungen wie zuvor beschrieben
    const startCellIndex = winCombination[0];
    const endCellIndex = winCombination[2];
    const cellWidth = rect.width / 3;
    const cellHeight = rect.height / 3;
    const startX = (startCellIndex % 3) * cellWidth + cellWidth / 2;
    const startY = Math.floor(startCellIndex / 3) * cellHeight + cellHeight / 2;
    const endX = (endCellIndex % 3) * cellWidth + cellWidth / 2;
    const endY = Math.floor(endCellIndex / 3) * cellHeight + cellHeight / 2;

    const svg = document.createElement("svg");
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = `${rect.width}px`;
    svg.style.height = `${rect.height}px`;
    svg.innerHTML = `<line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="white" stroke-width="5"/>`;
    document.getElementById("content").appendChild(svg);
}
