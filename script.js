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
        render();

        currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
    }
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