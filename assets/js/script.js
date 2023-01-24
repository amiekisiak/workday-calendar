const currentDay = document.querySelector("#currentDay");
let now = moment();
currentDay.innerHTML = now.format("dddd, MMMM Do YYYY, h:mm:ss a");
const timeBlocks = document.querySelectorAll('.time-block-container');

// Save task to local storage when save button is clicked
timeBlocks.forEach(block => {
    block.querySelector('.time-block-saveBtn').addEventListener('click', e => {
        // Get the text value of the task
        const textValue = e.target.parentNode.querySelector('.time-block-description').value;
        // Get the hour value of the block
        const hour = block.querySelector(".hour span").textContent;
        // Format the hour value to HH format
        let hourValue = moment(hour, "h:mm A").format("HH");
        // Save the text value and hour value to local storage
        localStorage.setItem(hourValue, textValue);
    });
});


// Load tasks from local storage and update color of blocks based on time

function updateTimeBlocks() {
    now = moment();
    currentDay.innerHTML = now.format("dddd, MMMM Do YYYY, h:mm:ss a");
    timeBlocks.forEach(block => {
        // Get the hour value of the block
        const hour = block.querySelector(".hour span").textContent;
        // Format the hour value to HH format
        let hourValue = moment(hour, "h:mm A").format("HH");
        let hourMoment = moment(hourValue, "HH");
        // Remove all past, present and future classes
        block.classList.remove("past", "present", "future");
        // Add class based on current time
        if (hourMoment.isBefore(now, 'hour')) {
            block.classList.add("past");
        } else if (hourMoment.isSame(now, 'hour')) {
            block.classList.add("present");
        } else if (hourMoment.isAfter(now, 'hour')) {
            block.classList.add("future");
        }
    });
}

// Load tasks from local storage and update color of blocks when the page loads

window.onload = function () {
    timeBlocks.forEach(block => {
        // Get the hour value of the block
        const hour = block.querySelector(".hour span").textContent;
        // Format the hour value to HH format
        let hourValue = moment(hour, "h:mm A").format("HH");
        // Load the text value from local storage and set it to the text area
        block.querySelector(".time-block-description").value = localStorage.getItem(hourValue);
    });
    updateTimeBlocks();
}

// Add a clear button

$("#clearBlocksBtn").click(function (event) {
    event.preventDefault;
    // Clear the text area and local storage
    $("textArea").val("");
    localStorage.clear();


});

setInterval(updateTimeBlocks, 60000);
