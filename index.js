const tableBody = document.querySelector('#running-log-table tbody');

// Create an empty array to store the logs
let runningLogs = [];

if (localStorage.getItem('runningLogs')) {
    runningLogs = JSON.parse(localStorage.getItem('runningLogs'));
}
renderLogRows();

// Function to add a new log row
function addLogRow(date, distance, time, index) {
    // Create a new table row
    const newRow = document.createElement('tr');

    // Create table cells for date, distance, and time
    const dateCell = document.createElement('td');
    dateCell.textContent = date;

    const distanceCell = document.createElement('td');
    distanceCell.textContent = distance;

    const timeCell = document.createElement('td');
    timeCell.textContent = time;

    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        removeLog(index);
    });
    actionCell.appendChild(deleteButton);

    // Append cells to the row
    newRow.appendChild(dateCell);
    newRow.appendChild(distanceCell);
    newRow.appendChild(timeCell);
    newRow.appendChild(actionCell);

    // Append the row to the table body
    tableBody.appendChild(newRow);
}

function removeLog(index) {
    runningLogs.splice(index, 1);

    // Render the updated log rows
    renderLogRows();

    // Save logs to localStorage
    saveLogs();
}

function renderLogRows() {
    // Clear the table body
    tableBody.innerHTML = '';

    // Iterate over the runningLogs array and add log rows
    runningLogs.forEach((log, index) => {
        addLogRow(log.date, log.distance, log.time, index);
      });
}

function addLog() {
    var dateInput = document.getElementById('dateInput');
    var distanceInput = document.getElementById('distanceInput');
    var timeInput = document.getElementById('timeInput');

    var date = dateInput.value;
    var distance = distanceInput.value;
    var time = timeInput.value;

    runningLogs.push({
        date,
        distance,
        time
    });

    saveLogs();

    console.log(runningLogs);

    dateInput.value = '';
    distanceInput.value = '';
    timeInput.value = '';

    // Render the updated log rows
    renderLogRows();
}

function saveLogs() {
    localStorage.setItem('runningLogs', JSON.stringify(runningLogs));
}

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addLog);