let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

let collectionSudoku = new Object();

for(const sudoku of allSuokus){
    if(!(sudoku["date"] in collectionSudoku)){
        collectionSudoku[sudoku["date"]] = new Object();
    }
    collectionSudoku[sudoku["date"]][sudoku["level"]] = sudoku;
}

const day = document.querySelector(".calendar-dates");

const currdate = document.querySelector(".calendar-current-date");

const prenexIcons = document.querySelectorAll(".calendar-navigation span");

let selectedDate = null;

const numberToMonth = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
};

const handleModalClick = (e) => {

    let currYear = year;
    let currMonth = ((month + 1)< 10) ? "0" + (month + 1): month + 1;
    let currDay = (e.innerText < 10) ? "0" + e.innerText: e.innerText;

    selectedDate = numberToMonth[month + 1] + ` ${e.innerText}, ${year}`;
    `${year}-${day}`
    const selectedHeader = document.querySelector("#selectedDate");
    const diffContainer = document.querySelector(".modal-body-diff-container");
    const easyAnchorTag = diffContainer.children[0];
    const mediumAnchorTag = diffContainer.children[1];
    const hardAnchorTag = diffContainer.children[2];
    mediumAnchorTag.setAttribute("href", `/sudoku/${currYear}-${currMonth}-${currDay}-medium`);
    hardAnchorTag.setAttribute("href", `/sudoku/${currYear}-${currMonth}-${currDay}-hard`);
    easyAnchorTag.setAttribute("href", `/sudoku/${currYear}-${currMonth}-${currDay}-easy`);

    selectedHeader.innerText = selectedDate;
};

// Array of month names
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// Function to generate the calendar
const manipulate = () => {
    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();

    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();

    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    // Variable to store the generated calendar HTML
    let lit = "";

    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
        // Check if the current date is today
        let isToday =
            i === date.getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()
                ? "active"
                : "";

        if(!(("" + year + "-" + ((month + 1) < 10 ? "0" + (month + 1): (month + 1)) + "-" +  (i < 10 ? "0" + i: i)) in collectionSudoku)){
            lit += `<li class="indivisual-date ${isToday} no-puzzle-container">
		<button
      type="button"
      class="no-puzzle"
    >
    
	${i}
    </button>
	<div class = "difficulty-container not-visible-difficulty-container"><div class = "easy"></div><div class = "medium"></div><div class = "hard"></div></div>
    
		</li>`;
        }
        else{
            lit += `<li class="indivisual-date ${isToday}">
		<button
		onclick="handleModalClick(this)"
      type="button"
      class="modal-opener"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
	${i}
    </button>
	<div class = "difficulty-container"><div class = "easy"></div><div class = "medium"></div><div class = "hard"></div></div>
		</li>`;
        }


    }


    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
        lit += `<li class="inactive">${i - dayend + 1}</li>`;
    }

    // Update the text of the current date element
    // with the formatted current month and year
    currdate.innerText = `${months[month]} ${year}`;
    day.innerHTML = lit;
};

manipulate();

// Attach a click event listener to each icon
prenexIcons.forEach((icon) => {
    // When an icon is clicked
    icon.addEventListener("click", () => {
        // Check if the icon is "calendar-prev"
        // or "calendar-next"
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;

        // Check if the month is out of range
        if (month < 0 || month > 11) {
            // Set the date to the first day of the
            // month with the new year
            date = new Date(year, month, new Date().getDate());

            // Set the year to the new year
            year = date.getFullYear();

            // Set the month to the new month
            month = date.getMonth();
        } else {
            // Set the date to the current date
            date = new Date();
        }

        // Call the manipulate function to
        // update the calendar display
        manipulate();
    });
});
