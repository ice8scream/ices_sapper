//TODO think about structure for add elements
//TODO Game menu

let createElem = function(elemType, elemClass) {
    let elem = document.createElement(elemType);
    elem.classList.add(elemClass);
    return elem;
}
let fieldRows = 20, fieldCells = 20, fieldDifficult = "recruit";




// console.log(field.GetFieldMatx);
// // alert(field.FieldMatx());
// let bombMatx = field.GetFieldMatx;

//push to class
let sapper = createElem('section', 'content');
let sapperDiscr = createElem('div', 'content-caption');
//sapperDiscr.textContent = "Bombs quantity: " + field.GetBombsCounter();
sapper.appendChild(sapperDiscr);

var field = new sapperField(sapper, fieldRows,fieldCells,fieldDifficult);
//push to class
// for(let i=0; i< fieldRows; i++){
//     let tRow = createElem('div', 'content-row');
//     for(let j=0; j< fieldCells; j++){
//         let tCell = createElem('div', 'content-cell');
//         tCell.onclick = function() {
//              field.LeftClickDetected(sapper,i,j);
//         };
       
//         tRow.appendChild(tCell);
//     }    
//     sapper.appendChild(tRow);
// }
// document.body.appendChild(sapper);

//TODO norm algorytm
// TODO onclick widesearch and detect bombs and disable onckick
// TODO Create fieald with user preferences and think to Random bomb position
