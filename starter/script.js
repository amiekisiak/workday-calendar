const currentDay = document.querySelector("#currentDay");
const now = new Date();
currentDay.innerHTML = now.toLocaleDateString() + " " + now.toLocaleTimeString();
const timeBlocks = document.querySelectorAll('.time-block-container');



// Load tasks from local storage when page is loaded
window.onload = function() {
    timeBlocks.forEach(block => {
        const hour = parseInt(block.querySelector(".hour span").textContent);
        block.querySelector(".time-block-description").value = localStorage.getItem(hour);
    });
}

// Save task to local storage when save button is clicked
timeBlocks.forEach(block => {
    block.querySelector('.time-block-saveBtn').addEventListener('click', e => {
        const textValue = e.target.parentNode.querySelector('.time-block-description').value;
        const hour = block.querySelector(".hour span").textContent;
        localStorage.setItem(hour, textValue);
    });
});

// Load tasks from local storage when page is loaded
window.onload = function() {
    timeBlocks.forEach(block => {
        const hour = block.querySelector(".hour span").textContent;
        let hourValue = parseInt(hour.split(/[^\d]/)[0]) % 12;
        if(hour.includes("PM")) hourValue += 12;
        block.querySelector(".time-block-description").value = localStorage.getItem(hourValue);
    });
}



// Add class to time blocks based on current time and update color
function updateTimeBlocks() {
    const currentHour = now.getHours();
    timeBlocks.forEach(block => {
        const hour = block.querySelector(".hour span").textContent;
        let hourValue = parseInt(hour.split(/[^\d]/)[0]) % 12;
        if(hour.includes("PM")) hourValue += 12;
        block.classList.remove("past", "present","future");
        if (hourValue < currentHour) {
            block.classList.add("past");
        } else if (hourValue === currentHour) {
            block.classList.add("present");
        } else if (hourValue > currentHour) {
            block.classList.add("future");
        }
    });
}


updateTimeBlocks();
setInterval(updateTimeBlocks, 60000);


//clear content inside the block
const clearBlocksBtn = document.querySelector("#clearBlocksBtn");

clearBlocksBtn.addEventListener('click', () => {
    timeBlocks.forEach(block => {
        block.querySelector(".time-block-description").value = "";
        localStorage.removeItem(block.parentNode.id.split("-")[1]);
    });
});
