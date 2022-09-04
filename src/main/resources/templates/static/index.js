// var testingValue;
// for (var i = 0; i< 81; i++){
//     testingValue = ""+(i/2);
//     console.log(typeof testingValue);
    
// }

puzzle = "8,0,0,1,0,7,6,0,0,0,6,2,0,0,8,4,0,7,7,0,1,0,6,2,8,0,0,0,3,0,0,8,6,0,4,2,0,2,6,0,0,0,0,0,5,9,1,0,4,0,0,0,3,0,0,5,0,8,3,0,0,7,0,1,0,9,0,5,0,0,0,8,0,0,3,6,0,0,5,9,0";


console.log(puzzle.length)
for (var i = 0; i< puzzle.length; i+=2){

    if (puzzle[i] != '0') document.getElementById("sudoku-cell-"+(i/2)).innerText = puzzle[i];

    else document.getElementById("sudoku-cell-" + (i/2)).appendChild(createInput());
}

function createInput(){
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "number");
    newInput.setAttribute("min", "1");
    newInput.setAttribute("max", "9");
    newInput.classList.add("cell");
    return newInput;
}

// const allValues = document.querySelector(".making");

// const allValues = document.getElementsByClassName("testing-cell");
// console.log(allValues);
// Array.from(allValues).forEach(element => {
//     console.log(element);
//     // element.addEventListner("click", (e)=>
//     // console.log("HIT!"))
// })


let elementsArray = document.querySelectorAll("input");

elementsArray.forEach(function(elem) {
    elem.addEventListener("click", (e) =>{
    // console.log("HI")
    if (e.target.value != "4"){
        elem.style.border = "solid red";
    }
});
});

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