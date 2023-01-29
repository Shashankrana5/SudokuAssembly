// The puzzle and the solution are passed in by the backend via html and is linked to this.

startup()

function startup() {
    sendProgressRequest(sudokuId, 0, false, 0);
    createBoard();
    let runClock = true;
    boardEngine(runClock);
    solutionButton();
    resetButton();
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
    newInput.classList.add("sudoku-input-cell");
    return newInput;
}

function sendProgressRequest(sudokuId, timeSpent, solved, incorrects){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/sudoku/addprogress", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        sudoku_id: sudokuId,
        timeSpent: timeSpent,
        solved: solved,
        incorrects: incorrects

    }));
}


function boardEngine(runClock) {

    var mins = timeSpent / 60;
    var secs = timeSpent % 60;
    var incorrects = 0;
    let counterClockDiv = document.querySelector('#counter-clock');
    let clock = timeSpent;
    setInterval(function () {
        funcaa(runClock)
        }, 1000);


    function completed(elementsArray, runClock) {
        let status = true;

        elementsArray.forEach((element) => {

            if (element.value != parseInt(solution[parseInt(element.className.substring(5)) * 2]) && element.value != "Sign Out") {
                status = false;
            }
        });
        if (status === true) {

            let xhr = new XMLHttpRequest();
            xhr.open("PUT", "http://localhost:8080/addcompletion", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                sudoku_id: sudokuId
            }));

            // xhr.open("POST", "http://localhost:8080/sudoku/addprogress", true);
            // xhr.setRequestHeader('Content-Type', 'application/json');
            // xhr.send(JSON.stringify({
            //     sudoku_id: sudokuId,
            //     timeSpent: parseInt(mins) * 60 + parseInt(secs),
            //     solved: true,
            //     incorrects: incorrects
            //
            // }));
            sendProgressRequest(sudokuId, parseInt(mins) * 60 + parseInt(secs), true, incorrects);
            //This happens when the game is completed:
            document.querySelector("#actual-board").setAttribute("style", "z-index: 1; position: absolute;")
            const new_child = document.createElement("div");

            new_child.classList.add("completion-parent");
            const new_sub_child = document.createElement("div");

            //new_sub_child is what gets displayed.
            new_sub_child.classList.add("completion-child")

            const homeButtom = document.createElement("button");
            homeButtom.innerText = "Return to Home";
            homeButtom.classList.add("home-button");
            homeButtom.onclick = () => {
                window.location.href = "/home";
            }

            new_sub_child.appendChild(homeButtom);
            new_child.appendChild(new_sub_child);
            document.querySelector(".board-game").appendChild(new_child);
            runClock = false;
            return runClock;
        }
    }
    function funcaa(runClock){
        if (runClock == false) return;
        mins = parseInt(clock / 60, 10);
        secs = parseInt(clock % 60, 10);

        mins = mins < 10 ? "0" + mins : mins;
        secs = secs < 10 ? "0" + secs : secs;

        counterClockDiv.textContent = mins + ":" + secs;
        ++clock;
    }

    const right_border = [2, 5, 11, 14, 20, 23, 29, 32, 38, 41, 47, 50, 56, 59, 65, 68, 74, 77];
    const left_border = [3, 6, 12, 15, 21, 24, 30, 33, 39, 42, 48, 51, 57, 60, 66, 69, 75, 78];
    const top_border = [27, 28, 29, 30, 31, 32, 33, 34, 35, 54, 55, 56, 57, 58, 59, 60, 61, 62];
    const bottom_border = [18, 19, 20, 21, 22, 23, 24, 25, 26, 45, 46, 47, 48, 49, 50, 51, 52, 53]


    let elementsArray = document.querySelectorAll("input");
    elementsArray.forEach(function (elem) {
        let selection_arr = []

        elem.addEventListener("focus", (e) => {
            let index = elem.className.substring(5, elem.className.indexOf(" ") + 1);
            let rem = index % 9;
            let floor = (Math.floor(index / 9)) * 9;

            for (let i = 0; i < 81; i++) {
                if (i % 9 == rem) {
                    selection_arr.push(i)
                }
            }
            for (let j = floor; j < floor + 9; j++) {
                selection_arr.push(j)
            }
            for (const s of selection_arr) {
                let backgroundChange = document.querySelector("#sudoku-cell-" + s)
                if (backgroundChange.hasChildNodes()) {
                    let result = backgroundChange.firstChild;

                    if (result.size == 20) {
                        result.style.backgroundColor = "lightgrey";
                    } else {
                        backgroundChange.style.backgroundColor = "lightgrey";
                    }
                }
            }
        })

        elem.addEventListener("blur", (e) => {
            for (const s of selection_arr) {
                let backgroundChange = document.querySelector("#sudoku-cell-" + s)
                if (backgroundChange.hasChildNodes()) {
                    let result = backgroundChange.firstChild;

                    if (result.size == 20)
                        result.style.backgroundColor = "white";
                    else {
                        backgroundChange.style.backgroundColor = "white";
                    }
                }

            }
        })

        elem.addEventListener("input", function (e) {
            let resultFromCompletionCheck = completed(elementsArray, runClock);
            if (resultFromCompletionCheck == false) runClock = false;
            let cellNumber = elem.className.substring(5, elem.className.indexOf(" "));
            let sudokuCellId = "#sudoku-cell-" + cellNumber;
            let tempCell = document.querySelector(sudokuCellId);
            if (e.target.value == "") {
                tempCell.style.border = "solid black 3px"
                if (right_border.includes(parseInt(sudokuCellId.substring(13)))){
                    tempCell.style.borderRight = "solid black .5vh"
                }
                if (left_border.includes(parseInt(sudokuCellId.substring(13)))){
                    tempCell.style.borderLeft = "solid black .5vh"
                }
                if (top_border.includes(parseInt(sudokuCellId.substring(13)))){
                    tempCell.style.borderTop = "solid black .5vh"
                }
                if (bottom_border.includes(parseInt(sudokuCellId.substring(13)))){
                    tempCell.style.borderBottom = "solid black .5vh"
                }
                    }
            //
            else if (e.target.value !== solution[parseInt(elem.className.substring(5)) * 2]){

                // if ([2, 5, 11].includes(parseInt(sudokuCellId.substring(13)))) {
                //     tempCell.style.border = "solid red 4px";
                //     tempCell.style.borderRight = "3px solid red";
                // } else {
                //     tempCell.style.border = "solid red 4px";
                // }
                // tempCell.style.border = "solid red 4px"

                tempCell.style.border = "solid red 5px"
                incorrects++;
                if (right_border.includes(parseInt(sudokuCellId.substring(13)))){
                    tempCell.style.borderRight = "solid red .5001vh"
                }
                if (left_border.includes(parseInt(sudokuCellId.substring(13)))){
                    tempCell.style.borderLeft = "solid red .59vh"
                }
                if (top_border.includes(parseInt(sudokuCellId.substring(13)))){
                    tempCell.style.borderTop = "solid red .5001vh"
                }
                if (bottom_border.includes(parseInt(sudokuCellId.substring(13)))){
                    tempCell.style.borderBottom = "solid red .5001vh"
                }

            }
            else {
                //Changes the box shape after getting the correct value: needs to change the borders of 2, 5, 11 and so on.
                //document.querySelector("#sudoku-cell-" + elem.className.substring(5)).style.border = "solid black";
                let cell = document.querySelector("#sudoku-cell-" + cellNumber);
                cell.style.border = "solid black";
                if (bottom_border.includes(parseInt(elem.className.substring(5)))) {
                    cell.style.borderBottom = "0.5vh solid black";
                }
                if (top_border.includes(parseInt(elem.className.substring(5)))) {
                    cell.style.borderTop = "0.5vh solid black";
                }
                if (right_border.includes(parseInt(elem.className.substring(5)))) {
                    cell.style.borderRight = "0.5vh solid black";
                }
                if (left_border.includes(parseInt(elem.className.substring(5)))) {
                    cell.style.borderLeft = "0.5vh solid black";
                }
            }
        });
    });

    window.addEventListener("beforeunload", e => {

        e.preventDefault();
        sendProgressRequest(sudokuId, parseInt(mins) * 60 + parseInt(secs), false, incorrects);

    })
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

function resetButton(){
    let resetButton =  document.querySelector("#clear-button");

    resetButton.addEventListener("click", (e) =>{
        let elementArray = document.querySelectorAll(".sudoku-input-cell");
        elementArray.forEach( (element) =>{
            element.value = "";
        })
    })
}


// window.addEventListener("blur", (e) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", "http://localhost:8080/testswitching", true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify({
//         message: "this is user has changed their tab."
//
//     }));
// })

// function startTimer(mins, secs, counterClockDiv, runClock) {
//     let clock = 0;
//     setInterval(function () {
//         if (runClock == false) return ;
//         mins = parseInt(clock / 60, 10);
//         secs = parseInt(clock % 60, 10);
//
//         mins = mins < 10 ? "0" + mins : mins;
//         secs = secs < 10 ? "0" + secs : secs;
//
//         counterClockDiv.textContent = mins + ":" + secs;
//         ++clock;
//     }, 1000);
//
// }

// window.onload = function () {
//
// };