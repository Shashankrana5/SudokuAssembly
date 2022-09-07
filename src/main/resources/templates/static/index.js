puzzle = "8,0,0,1,0,7,6,0,0,0,6,2,0,0,8,4,0,7,7,0,1,0,6,2,8,0,0,0,3,0,0,8,6,0,4,2,0,2,6,0,0,0,0,0,5,9,1,0,4,0,0,0,3,0,0,5,0,8,3,0,0,7,0,1,0,9,0,5,0,0,0,8,0,0,3,6,0,0,5,9,0";
solution = "8,9,5,1,4,7,6,2,3,3,6,2,5,9,8,4,1,7,7,4,1,3,6,2,8,5,9,5,3,7,9,8,6,1,4,2,4,2,6,7,1,3,9,8,5,9,1,8,4,2,5,7,3,6,6,5,4,8,3,9,2,7,1,1,7,9,2,5,4,3,6,8,2,8,3,6,7,1,5,9,4";


console.log(puzzle.length)
for (var i = 0; i< puzzle.length; i+=2){

    if (puzzle[i] != '0') document.getElementById("sudoku-cell-"+(i/2)).innerText = puzzle[i];

    else document.getElementById("sudoku-cell-" + (i/2)).appendChild(createInput(i/2));
}

function createInput(index){
    var newInput = document.createElement("input");
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
        document.querySelector("#sudoku-cell-"+elem.className.substring(5)).style.border = "solid red";
    }
    else{
        document.querySelector("#sudoku-cell-"+ elem.className.substring(5)).style.border = "solid black";
    }
});
});

var showSolutionButton = document.querySelector("#solve-button");

showSolutionButton.addEventListener("click", (e)=>{
    document.querySelector(".cell-2").value = 3;
}
    
);






// Array.from(allValues).forEach(element => {
//     console.log(element);
//   });

// allValues.forEach(console.log("hi"));





// const cellInput = document.querySelector(".cell");

// cellInput.addEventListener("click", thisfuc);

// function thisfuc(e){
//     console.log(e.target.value)
// }













// cellInput.addEventListener("input", inputValidator);

// function inputValidator(e){

//     if (e.target.value != "4"){
//         cellInput.style.border= "red";
//     }
//     console.log(e.target.value);
// }


// const inp = document.querySelector("input");

// inp.addEventListener("input", thisFunc);

// function thisFunc(e){
//     console.log(e.target.value)
// }





// var testingValue = document.querySelector("#testing-right");
// console.log(testingValue.value);
// testingValue.appendChild(document.createElement("input"));

// var anotherTesting = document.getElementById("another-testing");
// anotherTesting.innerText = "This is the printeirn ";