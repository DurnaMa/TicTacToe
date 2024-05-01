let fields = [null, null, null, null, null, null, null, null, null];
let currentSymbol = "circle"; // Startsymbol

function init() {
    render();
}

function render() {
    const container = document.getElementById("content");

    // HTML-Code für die Tabelle
    let tableHTML = "<table>";
    for (let i = 0; i < 3; i++) {
        tableHTML += "<tr>";
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = "";
            if (fields[index] === "circle") {
                symbol += generateCircleSVG();
            } else if (fields[index] === "cross") {
                symbol += generateAnimatedCrossSVG();
            }
            // Falls weder Kreis noch Kreuz, füge ein leeres Symbol hinzu
            tableHTML += `<td onclick="placeSymbol(${index}, this)">${symbol}</td>`;
        }
        tableHTML += "</tr>";
    }
    tableHTML += "</table>";

    // Tabelle in den Container einfügen
    container.innerHTML = tableHTML;
}

function placeSymbol(index, cell) {
    if (fields[index] === null) {
        // Abwechselnd "circle" oder "cross" einfügen
        fields[index] = currentSymbol;
        // HTML-Code für das eingefügte Symbol generieren
        const symbolHTML =
            currentSymbol === "circle"
                ? generateCircleSVG()
                : generateAnimatedCrossSVG();
        // HTML-Code in das angeklickte <td>-Element einfügen
        cell.innerHTML = symbolHTML;
        // onclick-Funktion von dem angeklickten <td>-Element entfernen
        cell.removeAttribute("onclick");
        // Das Symbol wechseln
        currentSymbol = currentSymbol === "circle" ? "cross" : "circle";
    }
}

init();

function generateCircleSVG() {
    const color = "#00B0EF";
    const width = 150;
    const height = 150;

    const svgHtml = `
      <svg width="${width}" height="${height}" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <circle cx="45" cy="45" r="40" fill="none" stroke="${color}" stroke-width="5">
          <animateTransform 
            attributeName="transform" 
            attributeType="XML" 
            type="rotate" 
            from="0 45 45" 
            to="360 45 45" 
            dur="50s" 
            repeatCount="1" 
          />
          <animate attributeName="r" from="0" to="40" dur="1s" fill="freeze" />
          <animate attributeName="stroke-dasharray" from="0 251" to="251 0" dur="1s" fill="freeze" />
        </circle>
      </svg>
    `;

    return svgHtml;
}

function generateAnimatedCrossSVG() {
    const color = "#FFC000";
    const width = 150;
    const height = 150;

    const svgHtml = `
      <svg width="${width}" height="${height}" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${color}" stroke-width="8">
          <animate attributeName="x2" values="0; ${width}" dur="1s" fill="freeze" />
          <animate attributeName="y2" values="0; ${height}" dur="1s" fill="freeze" />
        </line>
        <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="${color}" stroke-width="8">
          <animate attributeName="x2" values="${width}; 0" dur="1s" fill="freeze" />
          <animate attributeName="y2" values="0; ${height}" dur="1s" fill="freeze" />
        </line>
      </svg>
    `;

    return svgHtml;
}
