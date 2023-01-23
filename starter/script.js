const currentDay = document.querySelector("#currentDay");
const now = new Date();
currentDay.innerHTML = now.toLocaleDateString() + " " + now.toLocaleTimeString();
const timeBlocks = document.querySelectorAll('.time-block-container');

//This saves the tasks to local storage when the save button is clicked
timeBlocks.forEach(block => {
    block.querySelector('.time-block-saveBtn').addEventListener('click', e => {
        const textValue = e.target.parentNode.querySelector('.time-block-description').value;
        const hour = block.querySelector(".hour span").textContent;
        let hourValue = parseInt(hour.split(/[^\d]/)[0]) % 12;
        if (hour.includes("PM")) hourValue += 12;
        localStorage.setItem(hourValue.toString(), textValue);
    });
});

// Tasks are loadaded from local storage when page is refreshed
window.onload = function () {
    timeBlocks.forEach(block => {
        const hour = block.querySelector(".hour span").textContent;
        let hourValue = parseInt(hour.split(/[^\d]/)[0]) % 12;
        if (hour.includes("PM")) hourValue += 12;
        block.querySelector(".time-block-description").value = localStorage.getItem(hourValue.toString());
    });
    updateTimeBlocks();
    setInterval(updateTimeBlocks, 60000);
}

// Class is added to time blocks, which is based on current time also color of blocks is updated
function updateTimeBlocks() {
    const currentHour = now.getHours();
    timeBlocks.forEach(block => {
        const hour = block.querySelector(".hour span").textContent;
        let hourValue = parseInt(hour.split(/[^\d]/)[0]) % 12;
        if (hour.includes("PM")) hourValue += 12;
        block.classList.remove("past", "present", "future");
        if (hourValue < currentHour) {
            block.classList.add("past");
        } else if (hourValue === currentHour) {
            block.classList.add("present");
        } else if (hourValue > currentHour) {
            block.classList.add("future");
        }
    });
}
//clears all tasks after clicking on the button and removes from local storage
clearBlocksBtn.addEventListener('click', () => {
    timeBlocks.forEach(block => {
        const hour = block.querySelector(".hour span").textContent;
        let hourValue = parseInt(hour.split(/[^\d]/)[0]) % 12;
        if (hour.includes("PM")) hourValue += 12;
        block.querySelector(".time-block-description").value = "";
        localStorage.removeItem(hourValue.toString());
    });
});
