const currentDay = document.querySelector("#currentDay");
const now = new Date();

currentDay.innerHTML = now.toLocaleDateString() + " " + now.toLocaleTimeString();
const timeBlocks = document.querySelectorAll('.time-block-container');


// Save task to local storage when save button is clicked
timeBlocks.forEach(block => {
    block.querySelector('.time-block-saveBtn').addEventListener('click', e => {
        // this line of code should be here
        const textValue = e.target.parentNode.querySelector('.time-block-description').value;
        const hour = block.querySelector(".hour").id;
        localStorage.setItem(hour, textValue);
    });
});


// Load tasks from local storage
timeBlocks.forEach(block => {
    const hour = parseInt(block.querySelector(".hour span").textContent);
    block.querySelector(".time-block-description").value = localStorage.getItem(hour);
});

// Add class to time blocks based on current time and update color
function updateTimeBlocks() {
    const currentHour = now.getHours();
    timeBlocks.forEach(block => {
        const hour = parseInt(block.querySelector(".hour").id);
        block.classList.remove("past", "present","future");
        if (hour < currentHour) {
            block.classList.add("past");
        } else if (hour === currentHour) {
            block.classList.add("present");
        } else {
            block.classList.add("future");
        }
    });
}


updateTimeBlocks();
setInterval(updateTimeBlocks, 60000);