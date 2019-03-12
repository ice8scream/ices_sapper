//TODO think about structure for add elements
//TODO Game menu

let createElem = function(elemType, elemClass) {
    let elem = document.createElement(elemType);
    elem.classList.add(elemClass);
    return elem;
}
let fieldRows = 12, fieldCells = 12, fieldDifficult = "recruit";
var field = new sapperField(fieldRows,fieldCells,fieldDifficult);



console.log(field.getFieldMatx());
// alert(field.getFieldMatx());
let bombMatx = field.getFieldMatx();

let sapper = createElem('section', 'content');
let sapperDiscr = createElem('div', 'content-caption');
sapperDiscr.textContent = "Bombs quantity: " + field.GetBombsCounter();
sapper.appendChild(sapperDiscr);
for(let i=0; i< fieldRows; i++){
    let tRow = createElem('div', 'content-row');
    for(let j=0; j< fieldCells; j++){
        let tCell = createElem('div', 'content-cell');
        tCell.onclick = function() {
             field.LeftClickDetected(sapper,i,j);
        };
        /*if(bombMatx[i][j] == 0){
            // tCell.classList.add('bomb-cell');
            tCell.onclick = function() {
                // alert('you');
                tCell.classList.add('bomb-cell');
            };
        } else {

        }*/

        /*if(bombMatx[i][j] == -2) {
            tCell.classList.add('bomb-cell');
        }else if(bombMatx[i][j] > 0){
            tCell.classList.add('bomb-near');
            tCell.textContent = bombMatx[i][j];
        }
        if(i == fieldRows-1 && j == fieldCells-1){
            tCell.onclick = function(){
                document.body.removeChild(sapper);
                let button = createElem('div', 'content-cell');
                button.onclick = function() {
                    document.body.removeChild(button);
                    document.body.appendChild(sapper);
                };
                document.body.appendChild(button);
            };
        }*/
        tRow.appendChild(tCell);
    }    
    sapper.appendChild(tRow);
}
document.body.appendChild(sapper);

//TODO norm algorytm
// TODO onclick widesearch and detect bombs and disable onckick
// TODO Create fieald with user preferences and think to Random bomb position
