"use strict";

function DatePicker(id, fn_callback) {
    this.id = id;
    this.fn_callback = fn_callback;
}

DatePicker.prototype.render = function(date) {
    createTable(document.getElementById(this.id), date, this.fn_callback);

    function createTable(div, date, fn_callback) {
        // Date(year,month,0) means last day of previous month
        var dayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
        var lastMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        var nextMonth = new Date(date.getFullYear(), date.getMonth()+2, 0).getDate();
        // 0:Sunday, 1:Monday,...6:Saturday
        var startDayInWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        var endDayInWeek = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();

        var rows = (dayOfMonth + startDayInWeek + 6 - endDayInWeek) / 7;
        var headerRow = ["Su","Mo","Tu","We","Th","Fr","Sa"];

        var table = document.createElement("TABLE");
        var day = 0;

        createControlRow(div, table, date, fn_callback);
        for(var i = 0; i <= rows; i++) {
            // insert a row at bottom
            var row = table.insertRow(table.rows.length);
            for(var j = 0; j < 7; j++) {
                var cell = row.insertCell(j);
                if (i === 0) {
                    cell.innerHTML = headerRow[j];
                    continue;
                }
                day++;
                if (day <= startDayInWeek) {    // previous month
                    cell.innerHTML = lastMonth - startDayInWeek + day;
                    cell.className = "dayInLastMonth";
                } else if (day <= dayOfMonth + startDayInWeek) {
                    cell.innerHTML = day - startDayInWeek;
                    cell.className = div.id;
                    cell.addEventListener("click", function() {
                        resetStyle();
                        this.style.backgroundColor = "blue";
                        this.style.color = "white";
                        var fixedDate = {
                            month : date.getMonth()+1,
                            day : this.textContent,
                            year : date.getFullYear()
                        };
                        fn_callback(div.id, fixedDate);
                    });
                } else if ((6-endDayInWeek) > 0) {
                    cell.innerHTML = day - startDayInWeek - dayOfMonth;
                    cell.className = "dayInNextMonth";
                }
            }
        }
        if (div.hasChildNodes()) {
            div.removeChild(div.childNodes[0]);
        }
        div.appendChild(table);
        table.style.borderCollapse = "collapse";
    }

    function createControlRow(div, table, date, fn_callback) {
        var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var controlRow = table.insertRow();
        controlHelper(div, controlRow, '<', -1, date, fn_callback);
        var title = controlRow.insertCell();
        title.colSpan = '5';
        title.textContent = month[date.getMonth()] + " - " + date.getFullYear();
        title.className = "currentTime";
        controlHelper(div, controlRow, '>', +1, date, fn_callback);
    }

    function controlHelper(div, controlRow, symbol, offset, date, fn_callback) {
        var control = controlRow.insertCell();
        control.textContent = symbol;
        control.className = "clickable";
        control.idWrapper = div.id;
        control.addEventListener("click", function() {
            var target = event.target;
            var newMonth = new DatePicker(target.idWrapper, fn_callback);
            return newMonth.render(new Date(target.getAttribute('Date')));
        });
        control.setAttribute('Date', new Date(date.getFullYear(), date.getMonth() + offset, 1));
    }

    function resetStyle() {
        var elem = document.getElementsByClassName(event.target.className);
        for (var i = 0; i < elem.length; i++) {
            elem[i].style.color = "";
            elem[i].style.backgroundColor = "";
        }
    }

};
