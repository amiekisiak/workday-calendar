const currentDay = document.querySelector("#currentDay");
let now = moment();
currentDay.innerHTML = now.format("dddd, MMMM Do YYYY, h:mm:ss a");
const timeBlocks = document.querySelectorAll('.time-block-container');

// Save task to local storage when save button is clicked
timeBlocks.forEach(block => {
    block.querySelector('.time-block-saveBtn').addEventListener('click', e => {
        const textValue = e.target.parentNode.querySelector('.time-block-description').value;
        const hour = block.querySelector(".hour span").textContent;
        let hourValue = moment(hour, "h:mm A").format("HH");
        localStorage.setItem(hourValue, textValue);
    });
});


// Load tasks from local storage and update color of blocks based on time


function updateTimeBlocks() {
    now = moment();
    currentDay.innerHTML = now.format("dddd, MMMM Do YYYY, h:mm:ss a");
    timeBlocks.forEach(block => {
        const hour = block.querySelector(".hour span").textContent;
        let hourValue = moment(hour, "h:mm A").format("HH");
        let hourMoment = moment(hourValue, "HH");
        block.classList.remove("past", "present", "future");
        if (hourMoment.isBefore(now, 'hour')) {
            block.classList.add("past");
        } else if (hourMoment.isSame(now, 'hour')) {
            block.classList.add("present");
        } else if (hourMoment.isAfter(now, 'hour')) {
            block.classList.add("future");
        }
    });
}


window.onload = function () {
    timeBlocks.forEach(block => {
        const hour = block.querySelector(".hour span").textContent;
        let hourValue = moment(hour, "h:mm A").format("HH");
        block.querySelector(".time-block-description").value = localStorage.getItem(hourValue);
    });
    updateTimeBlocks();
}

// Add a clear button
    
    $("#clearBlocksBtn").click(function(event) {
        event.preventDefault;
        $("textArea").val("");
        localStorage.clear();
    });

setInterval(updateTimeBlocks, 60000);