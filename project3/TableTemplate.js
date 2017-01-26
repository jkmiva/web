'use strict';
function TableTemplate() {}

TableTemplate.fillIn = function(id, dict, columnName) {
    var table = document.getElementById(id);
    var tbody = table.tBodies[0];
    var row = tbody.firstChild;
    var columnNumber = row.cells.length;
    var markedCol = -1;
    if (columnName !== undefined) {
        for (var c = 0; c < columnNumber; c++) {
            var hdtp = new Cs142TemplateProcessor(row.cells[c].textContent);
            row.cells[c].textContent = hdtp.fillIn(dict);
            if (row.cells[c].textContent === columnName) {
                markedCol = c;
            }
        }
    }
    while(row !== null) {
        for (var i = 0; i < columnNumber; i++) {
            if (columnName === undefined) {
                var tp = new Cs142TemplateProcessor(row.cells[i].textContent);
                row.cells[i].textContent = tp.fillIn(dict);
            } else {
                var tp = new Cs142TemplateProcessor(row.cells[markedCol].textContent);
                row.cells[markedCol].textContent = tp.fillIn(dict);
                break;
            }
        }
        row = row.nextElementSibling;
    }
    if(table.style.visibility === "hidden"){
        table.style.visibility = "visible";
    }
};
