// let mappedSudokus = new Object();
//
// for (const index in allSuokus){
//
//     if (allSuokus[index]["date"] in mappedSudokus){
//         mappedSudokus[allSuokus[index]["date"]][allSuokus[index]["level"]] = allSuokus[index];
//     }
//     else{
//         mappedSudokus[allSuokus[index]["date"]] = new Object();
//         mappedSudokus[allSuokus[index]["date"]][allSuokus[index]["level"]] = allSuokus[index];
//     }
// }
// const sudoku_list = document.querySelector(".sudoku-list")
//
// const loadSudokuOnRender = (index) =>{
//     let totalHeight = 0;
//     for (const date in mappedSudokus){
//         const details = document.createElement("details");
//         const summary = document.createElement("summary");
//         summary.classList.add("sudoku-summary")
//         summary.textContent = date
//         details.appendChild(summary);
//         const pContainer = document.createElement("div");
//         for (const level in mappedSudokus[date]){
//         const link = document.createElement("a");
//         link.text = level;
//         link.href = "/sudoku/" + date + "-" + level;
//         link.classList.add("difficulty")
//         if (level === "easy"){
//             link.classList.add("easy");
//         }
//         else if (level === "medium"){
//             link.classList.add("medium");
//         }
//         else{
//             link.classList.add("hard");
//         }
//         pContainer.appendChild(link);
//     }
//     pContainer.classList.add("difficulty-container");
//     details.appendChild(pContainer);
//     sudoku_list.appendChild(details);
//     index = index + 1;
//     totalHeight += summary.clientHeight;
//     if (totalHeight + summary.clientHeight > main_content_height){
//         break;
//     }
//     }
//
//     return index
// }
// let index = 0;
// const main_content = document.querySelector(".main-content");
// const main_content_height = main_content.clientHeight;
// index = loadSudokuOnRender(index)
//
// const addSudoku = (index)=>{
//     let counter = 0;
//     let initialIndex = index;
//     for (const date in mappedSudokus){
//
//         if (counter >= index && counter < initialIndex + 5){
//             // console.log(date);
//             const details = document.createElement("details");
//             const summary = document.createElement("summary");
//             summary.classList.add("sudoku-summary")
//             summary.textContent = date
//             details.appendChild(summary);
//             const pContainer = document.createElement("div");
//             for (const level in mappedSudokus[date]){
//                 const link = document.createElement("a");
//                 link.text = level;
//                 link.href = "/sudoku/" + date + "-" + level;
//                 link.classList.add("difficulty")
//                 if (level === "easy"){
//                     link.classList.add("easy");
//                 }
//                 else if (level === "medium"){
//                     link.classList.add("medium");
//                 }
//                 else{
//                     link.classList.add("hard");
//                 }
//                 pContainer.appendChild(link);
//             }
//             pContainer.classList.add("difficulty-container");
//             details.appendChild(pContainer);
//             sudoku_list.appendChild(details);
//
//
//             index++;
//         }
//         else if (counter > index + 5){
//             break;
//         }
//         counter++;
//     }
//     return index;
// }
//
// // const selectedFooter = document.querySelector(".footer");
// const infiniteScroll = () => {
//     const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
//
//     if (endOfPage){
//         index = addSudoku(index)
//     }
// }
// window.addEventListener("scroll", infiniteScroll);
//
