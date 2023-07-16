let togglePencil = false;

let pencilSwitch = document.querySelector(".toggle-pencil");
let pencilClasses = document.querySelectorAll(".pencil");
let selectedCell = null;

const addClickable = (pencilClasses) => {
    pencilClasses.forEach((pencilClass) => {
        pencilClass.style.cursor = "pointer";
        pencilClass.addEventListener("click", () => {
            selectedCell = pencilClass.id
        })
    })
}

addClickable(pencilClasses);

pencilSwitch.addEventListener("input", () => {

    togglePencil = (togglePencil === true) ? false: true;
})
