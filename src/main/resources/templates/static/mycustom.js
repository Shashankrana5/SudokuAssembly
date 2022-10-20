// function changeColor(newColor) {
//     const elem = document.getElementById('para');
//     elem.style.color = newColor;
//   }


//   document.querySelector('input[name="myInput"]').value = 'Whatever you want!';



// const input = document.querySelector('input');
// const log = document.getElementById('values');

// input.addEventListener('input', updateValue);

// function updateValue(e) {
//     log.textContent = e.target.value;
//     console.log(e.target.value)

// }

puzzle = "8,0,0,1,0,7,6,0,0,0,6,2,0,0,8,4,0,7,7,0,1,0,6,2,8,0,0,0,3,0,0,8,6,0,4,2,0,2,6,0,0,0,0,0,5,9,1,0,4,0,0,0,3,0,0,5,0,8,3,0,0,7,0,1,0,9,0,5,0,0,0,8,0,0,3,6,0,0,5,9,0";
// solution = "8,9,5,1,4,7,6,2,3,3,6,2,5,9,8,4,1,7,7,4,1,3,6,2,8,5,9,5,3,7,9,8,6,1,4,2,4,2,6,7,1,3,9,8,5,9,1,8,4,2,5,7,3,6,6,5,4,8,3,9,2,7,1,1,7,9,2,5,4,3,6,8,2,8,3,6,7,1,5,9,4";


// const van = document.querySelector("#cell-0").value;

// console.log(van);


for (var i = 0; i < 82*2; i++) {
    if (puzzle[i * 2] == '0'){

        var numberInString = "" + (i/2)+"";
        
        var abc = document.getElementById(numberInString);
        abc.value = "aa";

    }
}