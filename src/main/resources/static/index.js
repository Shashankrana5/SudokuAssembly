// The puzzle and the solution is passed in by the the backend via html and is linked to this.

startup()
function startup(){
    createBoard()
    boardEngine()
    solutionButton()

}

function createBoard() {
    for (let i = 0; i < puzzle.length; i += 2) {

        if (puzzle[i] != '0') document.getElementById("sudoku-cell-" + (i / 2)).innerText = puzzle[i];

        else document.getElementById("sudoku-cell-" + (i / 2)).appendChild(createInput(i / 2));
    }
}

function createInput(index) {
    let newInput = document.createElement("input");
    newInput.setAttribute("type", "number");
    newInput.setAttribute("min", "1");
    newInput.setAttribute("max", "9");
    newInput.classList.add("cell-" + index);
    return newInput;
}


function boardEngine() {
    let elementsArray = document.querySelectorAll("input");
    elementsArray.forEach(function (elem) {
        elem.addEventListener("input", (e) => {
            if (e.target.value != parseInt(solution[parseInt(elem.className.substring(5)) * 2])) { // The value here has to be an integer.
                let sudokuCellId = "#sudoku-cell-" + elem.className.substring(5);
                let tempCell = document.querySelector(sudokuCellId);
                if ([2, 5, 11].includes(parseInt(sudokuCellId.substring(13)))) {
                    tempCell.style.border = "solid red";
                    tempCell.style.borderRight = "4px solid red";
                } else {
                    tempCell.style.border = "solid red";
                }

            } else {
                //Changes the box shape after getting the correct value: needs to change the borders of 2, 5, 11 and so on.
                document.querySelector("#sudoku-cell-" + elem.className.substring(5)).style.border = "solid black";
            }
        });
    });
}

function solutionButton() {
    let showSolutionButton = document.querySelector("#solve-button");

    showSolutionButton.addEventListener("click", (e) => {
            for (let i = 0; i < solution.length; i += 2) {
                if (puzzle[i] == "0")
                    document.querySelector(".cell-" + (i / 2)).value = solution[i];
            }
        }
    );
}

function startTimer(counterClockDiv) {
    let clock = 0;
    let mins;
    let secs
    setInterval(function () {
        mins = parseInt(clock / 60, 10);
        secs = parseInt(clock % 60, 10);

        mins = mins < 10 ? "0" + mins : mins;
        secs = secs < 10 ? "0" + secs : secs;

        counterClockDiv.textContent = mins + ":" + secs;
        ++clock;
    }, 1000);
}

window.onload = function () {
    let counterClockDiv = document.querySelector('#counter-clock');
    startTimer(counterClockDiv);
};