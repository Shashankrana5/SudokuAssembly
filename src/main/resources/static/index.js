// The puzzle and the solution are passed in by the backend via html and is linked to this.

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
    const newInput = document.createElement("input");
    newInput.setAttribute("type", "number");
    newInput.setAttribute("min", "1");
    newInput.setAttribute("max", "9");
    newInput.classList.add("cell-" + index);
    return newInput;
}

function completed(elementsArray){
    let status = true;
    elementsArray.forEach((element) => {

            if (element.value != parseInt(solution[parseInt(element.className.substring(5)) * 2])) {
                console.log("unsuccessful");
                status = false;
            }

        }
    );
    if (status == true){
        alert("completed!");
    }
    console.log(status);
}


function boardEngine() {

    const right_border = [2, 5, 11, 14, 20, 23, 29, 32, 38, 41, 47, 50, 56, 59, 65, 68, 74, 77];
    const left_border = [3, 6, 12, 15, 21, 24, 30, 33, 39, 42, 48, 51, 57, 60, 66, 69, 75, 78];
    const top_border = [27, 28, 29, 30, 31, 32, 33, 34, 35, 54, 55, 56, 57, 58, 59, 60, 61, 62];
    const bottom_border = [18, 19, 20, 21, 22, 23, 24, 25, 26, 45, 46, 47, 48, 49, 50, 51, 52, 53]


    let elementsArray = document.querySelectorAll("input");
    elementsArray.forEach(function (elem) {
        let selection_arr = []
        elem.addEventListener("focus", (e) =>{
            let index= elem.className.substring(5);
            let rem = index % 9;
            let floor = (Math.floor(index/9)) * 9;

            for (let i =0; i< 81; i++){
                if (i % 9 == rem){
                    selection_arr.push(i)
                }
            }
            for (let j = floor; j< floor +9; j++){
                selection_arr.push(j)
            }
            for (const s of selection_arr){
                let backgroundChange= document.querySelector("#sudoku-cell-" + s)
                if (backgroundChange.hasChildNodes()){
                    let result = backgroundChange.firstChild;

                    if( result.size == 20) {
                        result.style.backgroundColor = "lightgrey";
                    }
                    else{
                        console.log("HERE");
                        console.log(backgroundChange);
                        backgroundChange.style.backgroundColor = "lightgrey";
                    }
                }
            }

        })

        elem.addEventListener("blur", (e) =>{
            for (const s of selection_arr){
                let backgroundChange= document.querySelector("#sudoku-cell-" + s)
                if (backgroundChange.hasChildNodes()) {
                    let result = backgroundChange.firstChild;
                    if(result.size == 20)
                        result.style.backgroundColor = "white";
                    else{
                        backgroundChange.style.backgroundColor = "white";
                    }
                }

            }
        })


        elem.addEventListener("input", (e) => {
            completed(elementsArray);
            let sudokuCellId = "#sudoku-cell-" + elem.className.substring(5);
            if (e.target.value == "") {
                let tempCell = document.querySelector(sudokuCellId);

                if ([2, 5, 11].includes(parseInt(sudokuCellId.substring(13)))) {
                    tempCell.style.border = "solid black";
                    tempCell.style.borderRight = "3px solid black";
                }
                else{
                tempCell.style = "solid black"

                }

            }
            else if (e.target.value != parseInt(solution[parseInt(elem.className.substring(5)) * 2])) { // The value here has to be an integer.
                let tempCell = document.querySelector(sudokuCellId);


                if ([2, 5, 11].includes(parseInt(sudokuCellId.substring(13)))) {
                    tempCell.style.border = "solid red 2px";
                    tempCell.style.borderRight = "3px solid red";
                } else {
                    tempCell.style.border = "solid red 2px";
                }

            } else {
                //Changes the box shape after getting the correct value: needs to change the borders of 2, 5, 11 and so on.
                //document.querySelector("#sudoku-cell-" + elem.className.substring(5)).style.border = "solid black";
                let cell = document.querySelector("#sudoku-cell-" + elem.className.substring(5));
                cell.style.border = "solid black";
                if (bottom_border.includes(parseInt(elem.className.substring(5)))){
                    cell.style.borderBottom = "3px solid black";
                }
                if (top_border.includes(parseInt(elem.className.substring(5)))){
                    cell.style.borderTop = "3px solid black";
                }
                if (right_border.includes(parseInt(elem.className.substring(5)))){
                    cell.style.borderRight = "3px solid black";
                }
                if (left_border.includes(parseInt(elem.className.substring(5)))){
                    cell.style.borderLeft = "3px solid black";
                }
                let childCell = cell.firstChild;
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