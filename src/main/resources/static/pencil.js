let togglePencil = false;

let pencilSwitch = document.querySelector(".toggle-pencil");
let pencilClasses = document.querySelectorAll(".pencil");
let selectedCell = null;

const addClickable = (pencilClasses) => {

    pencilClasses.forEach((pencilClass) => {
        pencilClass.style.cursor = "pointer";
        pencilClass.addEventListener("click", () => {
            selectedCell = pencilClass.id
            console.log(selectedCell);
        })
    })
}

addClickable(pencilClasses);

pencilSwitch.addEventListener("input", () => {

    togglePencil = (togglePencil == true) ? false: true;
    // changeSudokuCellDisplay(togglePencil);
})

// const changeSudokuCellDisplay = (togglePencil) => {
//     let pencilClassArray = document.querySelectorAll(".pencil");
//     let sudokuInputArray = document.querySelectorAll(".sudoku-input-cell");
//
//     if (togglePencil === true){
//         pencilClassArray.forEach((pencilClass) => {
//             pencilClass.style.position = "absolute";
//
//         })
//         sudokuInputArray.forEach((sudokuInput) => {
//             sudokuInput.style.marginTop = 0;
//             sudokuInput.style.marginLeft = 0;
//             sudokuInput.style.position= "static";
//         })
//
//
//     }else{
//         pencilClassArray.forEach((pencilClass) => {
//             pencilClass.style.position= null;
//
//         })
//         sudokuInputArray.forEach((sudokuInput) => {
//             sudokuInput.style.marginTop = "-100%";
//             sudokuInput.style.marginLeft = "-50%";
//             sudokuInput.style.position = "absolute";
//         })
//
//     }
// }
