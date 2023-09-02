// The puzzle and the solution are passed in by the backend via html and is linked to this.

startup()

let userName = document.querySelector("#user-name");
userName.textContent = firstName;

let streaksCounter = document.querySelector(".streak-value")
streaksCounter.textContent = streaks;

const right_border = [2, 5, 11, 14, 20, 23, 29, 32, 38, 41, 47, 50, 56, 59, 65, 68, 74, 77];
const left_border = [3, 6, 12, 15, 21, 24, 30, 33, 39, 42, 48, 51, 57, 60, 66, 69, 75, 78];
const top_border = [27, 28, 29, 30, 31, 32, 33, 34, 35, 54, 55, 56, 57, 58, 59, 60, 61, 62];
const bottom_border = [18, 19, 20, 21, 22, 23, 24, 25, 26, 45, 46, 47, 48, 49, 50, 51, 52, 53];

function startup() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/user/addattempt", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        sudoku_id: sudokuId
    }));
    createBoard();
    let runClock = true;
    boardEngine(runClock);
    solutionButton();
    resetButton();
}

function createBoard() {

    for (let i = 0; i < puzzle.length; i += 2) {

        if (puzzle[i] != '0') document.getElementById("sudoku-cell-" + (i / 2)).innerText = puzzle[i];

        else {
            const sudokuCell = document.getElementById("sudoku-cell-" + (i / 2));
            let newDiv = document.createElement("div");
            newDiv.setAttribute("id", "pencil-" + (i/2));
            newDiv.classList.add("pencil")
            for(let j = 1; j <= 9; j+=1){
                let pencilDiv = document.createElement("div");
                pencilDiv.innerText = j;
                pencilDiv.classList.add("pencil-indivisual");
                pencilDiv.classList.add("pencil-hidden");
                newDiv.appendChild(pencilDiv);
            }
            sudokuCell.appendChild(newDiv);
            document.getElementById("sudoku-cell-" + (i / 2)).appendChild(createInput(i / 2));
        }
    }
}

function createInput(index) {
    const newInput = document.createElement("input");
    newInput.setAttribute("type", "number");
    newInput.setAttribute("min", "1");
    newInput.setAttribute("max", "9");
    newInput.classList.add("cell-" + index);
    newInput.classList.add("sudoku-input-cell");
    newInput.style = "position: absolute";
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
        startClock(runClock)
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
            sendProgressRequest(sudokuId, parseInt(mins) * 60 + parseInt(secs), true, incorrects);
            document.querySelector(".completion-parent").style["visibility"] = "visible";
            const homeButton = document.querySelector("#redirect-home-completed");
            homeButton.onclick = () => {
                window.location.href = "/";
            }
            runClock = false;
            return runClock;

        }
    }

    function startClock(runClock) {
        if (runClock == false) return;
        mins = parseInt(clock / 60, 10);
        secs = parseInt(clock % 60, 10);

        mins = mins < 10 ? "0" + mins : mins;
        secs = secs < 10 ? "0" + secs : secs;

        counterClockDiv.textContent = mins + ":" + secs;
        ++clock;
    }


    const rows = {
        0: new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]),
        1: new Set([16, 17, 9, 10, 11, 12, 13, 14, 15]),
        2: new Set([18, 19, 20, 21, 22, 23, 24, 25, 26]),
        3: new Set([32, 33, 34, 35, 27, 28, 29, 30, 31]),
        4: new Set([36, 37, 38, 39, 40, 41, 42, 43, 44]),
        5: new Set([48, 49, 50, 51, 52, 53, 45, 46, 47]),
        6: new Set([54, 55, 56, 57, 58, 59, 60, 61, 62]),
        7: new Set([64, 65, 66, 67, 68, 69, 70, 71, 63]),
        8: new Set([80, 72, 73, 74, 75, 76, 77, 78, 79]),
    }
    const cols = {
        0: new Set([0, 18, 36, 54, 72, 9, 27, 45, 63]),
        1: new Set([64, 1, 19, 37, 55, 73, 10, 28, 46]),
        2: new Set([65, 2, 20, 38, 56, 74, 11, 29, 47]),
        3: new Set([48, 66, 3, 21, 39, 57, 75, 12, 30]),
        4: new Set([49, 67, 4, 22, 40, 58, 76, 13, 31]),
        5: new Set([32, 50, 68, 5, 23, 41, 59, 77, 14]),
        6: new Set([33, 51, 69, 6, 24, 42, 60, 78, 15]),
        7: new Set([16, 34, 52, 70, 7, 25, 43, 61, 79]),
        8: new Set([80, 17, 35, 53, 71, 8, 26, 44, 62]),
    }
    const boxes = {
        0: new Set([0, 1, 2, 18, 19, 20, 9, 10, 11]),
        1: new Set([3, 4, 5, 21, 22, 23, 12, 13, 14]),
        2: new Set([16, 17, 6, 7, 8, 24, 25, 26, 15]),
        3: new Set([36, 37, 38, 27, 28, 29, 45, 46, 47]),
        4: new Set([32, 48, 49, 50, 39, 40, 41, 30, 31]),
        5: new Set([33, 34, 35, 51, 52, 53, 42, 43, 44]),
        6: new Set([64, 65, 54, 55, 56, 72, 73, 74, 63]),
        7: new Set([66, 67, 68, 57, 58, 59, 75, 76, 77]),
        8: new Set([80, 69, 70, 71, 60, 61, 62, 78, 79]),
    }
    let elementsArray = document.querySelectorAll(".sudoku-input-cell");
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

                if (togglePencil === false) {
                    let tempCell = document.querySelector(sudokuCellId);

                    if (e.target.value.length > 1) {
                        e.target.value = e.target.value.charAt(e.target.value.length - 1);
                    }

                    if (e.target.value === "") {
                        tempCell.style.border = "solid black 0.25vh";
                        if (right_border.includes(parseInt(sudokuCellId.substring(13)))) {
                            tempCell.style.borderRight = "solid black .5vh";
                        }
                        if (left_border.includes(parseInt(sudokuCellId.substring(13)))) {
                            tempCell.style.borderLeft = "solid black .5vh";
                        }
                        if (top_border.includes(parseInt(sudokuCellId.substring(13)))) {
                            tempCell.style.borderTop = "solid black .5vh";
                        }
                        if (bottom_border.includes(parseInt(sudokuCellId.substring(13)))) {
                            tempCell.style.borderBottom = "solid black .5vh"
                        }
                    } else if (e.target.value !== solution[parseInt(elem.className.substring(5)) * 2]) {
                        if (tempCell) {

                            tempCell.style.borderBottom = "solid red 0.40vh"
                            tempCell.style.borderTop = "solid red 0.40vh"
                            tempCell.style.borderLeft = "solid red 0.40vh"
                            tempCell.style.borderRight = "solid red 0.40vh"
                            incorrects++;
                            if (right_border.includes(parseInt(sudokuCellId.substring(13)))) {
                                tempCell.style.borderRight = "solid red .6vh"
                            }
                            if (left_border.includes(parseInt(sudokuCellId.substring(13)))) {
                                tempCell.style.borderLeft = "solid red .6vh"
                            }
                            if (top_border.includes(parseInt(sudokuCellId.substring(13)))) {
                                tempCell.style.borderTop = "solid red .6vh"
                            }
                            if (bottom_border.includes(parseInt(sudokuCellId.substring(13)))) {
                                tempCell.style.borderBottom = "solid red .6vh"
                            }
                        }
                    } else {
                        //Changes the box shape after getting the correct value: needs to change the borders of 2, 5, 11 and so on.
                        //document.querySelector("#sudoku-cell-" + elem.className.substring(5)).style.border = "solid black";
                        let cell = document.querySelector("#sudoku-cell-" + cellNumber);
                        cell.style.border = "solid black 0.25vh";
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

                        const currentVal = parseInt(e.target.value);

                        for(let val of rows[Math.floor((cellNumber) / 9)]){
                            let pencilDiv = document.querySelector("#pencil-" + val);
                            if(pencilDiv !== null) {
                                pencilDiv.children[currentVal - 1].classList.add("pencil-hidden");
                            }
                        }
                        for(let val of cols[(cellNumber) % 9]){
                            let pencilDiv = document.querySelector("#pencil-" + val);
                            if(pencilDiv !== null){
                                pencilDiv.children[currentVal - 1].classList.add("pencil-hidden");
                            }
                        }
                        let colPtr = cellNumber % 9;
                        let rowPtr = Math.floor(cellNumber / 9);

                        for(let val of boxes[Math.floor(Math.floor(colPtr/3) + (3 * (Math.floor(rowPtr /3))))]){
                            let pencilDiv = document.querySelector("#pencil-" + val);
                            if(pencilDiv !== null){
                                pencilDiv.children[currentVal - 1].classList.add("pencil-hidden");
                            }
                        }

                    }
                } else {
                    let selectedPencilCell = document.querySelector("#pencil-" + cellNumber);
                    if (e.target.value === "") {

                    } else if (selectedPencilCell) {
                        const pencilCell = selectedPencilCell.children[parseInt(e.target.value) - 1];
                        if (pencilCell.classList.contains("pencil-hidden")) {
                            pencilCell.classList.remove("pencil-hidden");
                            e.target.value = "";
                        } else {
                            pencilCell.classList.add("pencil-hidden");
                            e.target.value = "";
                        }
                    }
                }
            });

        }
    );

    window.addEventListener("beforeunload", e => {

        e.preventDefault();
        sendProgressRequest(sudokuId, parseInt(mins) * 60 + parseInt(secs), false, incorrects);

    })
}

function resetPencil() {
    const allPencilDivs = document.querySelectorAll(".pencil");
    for(let pencilDiv of allPencilDivs){
        if(pencilDiv !== null){
            for(let indivisual of pencilDiv.children){
                if(indivisual){
                    indivisual.classList.add("pencil-hidden");
                }
            }
        }
    }
}
function resetBorders (){
    const allTableDivs = document.querySelectorAll(".sudoku-cell-single");
    allTableDivs.forEach((element) => {

        let cellNumber = parseInt(element.id.substring(12));

        let cell = document.querySelector("#sudoku-cell-" + cellNumber);

        cell.style.borderTop ="solid black 0.25vh";
        cell.style.borderRight ="solid black 0.25vh";
        cell.style.borderLeft = "solid black 0.25vh";
        cell.style.borderBottom = "solid black 0.25vh";
        if (bottom_border.includes(cellNumber)) {
            cell.style.borderBottom = "0.5vh solid black";
        }
        if (top_border.includes(cellNumber)) {
            cell.style.borderTop = "0.5vh solid black";
        }
        if (right_border.includes(cellNumber)) {
            cell.style.borderRight = "0.5vh solid black";
        }
        if (left_border.includes(cellNumber)) {
            cell.style.borderLeft = "0.5vh solid black";
        }

    })
}

function solutionButton() {
    let showSolutionButton = document.querySelector("#solve-button");

    showSolutionButton.addEventListener("click", (e) => {
            for (let i = 0; i < solution.length; i += 2) {
                if (puzzle[i] == "0")
                    document.querySelector(".cell-" + (i / 2)).value = solution[i];
            }
            resetPencil();
            resetBorders();
        }
    );
}

function resetButton() {
    let resetButton = document.querySelector("#clear-button");

    resetButton.addEventListener("click", (e) => {
        let elementArray = document.querySelectorAll(".sudoku-input-cell");
        elementArray.forEach((element) => {
            element.value = "";
        })
        resetPencil();
        resetBorders();
    })
}