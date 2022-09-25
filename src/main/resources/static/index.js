for (let i = 0; i< puzzle.length; i+=2){

    if (puzzle[i] != '0') document.getElementById("sudoku-cell-"+(i/2)).innerText = puzzle[i];

    else document.getElementById("sudoku-cell-" + (i/2)).appendChild(createInput(i/2));
}

function createInput(index){
    let newInput = document.createElement("input");
    newInput.setAttribute("type", "number");
    newInput.setAttribute("min", "1");
    newInput.setAttribute("max", "9");
    newInput.classList.add("cell-" + index);
    return newInput;
}

let elementsArray = document.querySelectorAll("input");

elementsArray.forEach(function(elem) {
    elem.addEventListener("input", (e) =>{
    if (e.target.value != parseInt(solution[parseInt(elem.className.substring(5))*2])){ // The value here has to be an integer.
        let sudokuCellId = "#sudoku-cell-"+elem.className.substring(5);
        let tempCell = document.querySelector(sudokuCellId);
        if ([2, 5, 11].includes(parseInt(sudokuCellId.substring(13)))){
            tempCell.style.border = "solid red";
            tempCell.style.borderRight = "4px solid red";
        }
        else{
            tempCell.style.border = "solid red";
        }

        }   
    else{
        //Changes the box shape after getting the correct value: needs to change the borders of 2, 5, 11 and so on.
        document.querySelector("#sudoku-cell-"+ elem.className.substring(5)).style.border = "solid black";
    }
});
});

let showSolutionButton = document.querySelector("#solve-button");

showSolutionButton.addEventListener("click", (e)=>{
    for (let i = 0; i< solution.length; i+=2){
        if (puzzle[i] == "0")
        document.querySelector(".cell-" + (i/2)).value = solution[i];
    }
}
    
);