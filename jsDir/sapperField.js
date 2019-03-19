class sapperField {  
    constructor(node, rows, cells, difficult) {
        this.SetFieldParams(node, rows, cells, difficult);
        this.CreateFieldDocument(this.node);
        this.GameStart();
    }; 

    ClearField(node) {
        let rows = this.fieldParams.rows;
        let cells = this.fieldParams.cells;
        
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cells; j++){
                this.CellRemove(this.GetFieldCell(node,i,j));
            }
        }
    };

    CellRemove(node) {
        node.classList.remove('bomb-cell',  'safe-cell', 'bomb-near', 'bomb-explode', 'gray-cell');
        node.textContent = null;
    };

    SetFieldParams(node, rows, cells, difficult) {
        this.node = node;
        this.fieldParams.rows = rows;
        this.fieldParams.cells = cells;
        this.fieldParams.difficult = difficult;
    };

    GameStart() {
        let fp = this.fieldParams;
        this.Reset(fp.rows, fp.cells);
        this.FillField(this.diffInterp[fp.difficult]);
        this.UpdateFieldCellClick(this.node);
        this.SetCaptionText(this.node, this.GetBombsCounter());
    };



    CreateFieldDocument(node){
        let fp = this.fieldParams
        for(let i=0; i< fp.rows; i++){
            let tRow = createElem('div', 'content-row');
            for(let j=0; j< fp.cells; j++){
                let tCell = createElem('div', 'content-cell');
                tRow.appendChild(tCell);
            }    
            node.appendChild(tRow);
        }
        document.body.appendChild(node);
    };

    

    UpdateFieldCellClick(node){
        let fp = this.fieldParams
        for(let i=0; i< fp.rows; i++){
            for(let j=0; j< fp.cells; j++){
                let tCell = this.GetFieldCell(node, i, j);
                let cFunc = function() {
                    this.LeftClickDetected(this.node,i,j);
                };
                tCell.onclick = cFunc.bind(this);
            }
        }
    };

    SetCaptionText(node, message) {
        let cap = node.querySelector('.content-caption');
        cap.textContent = message;
    };

    //reset field
    Reset(rows, cells) {
        this.field = [];
        for(let i = 0; i < rows; i++) {
            let fieldRow = [];
            for(let j = 0; j < cells; j++) {
                fieldRow.push(0);
            }
            this.field.push(fieldRow);
        }
        this.bombCounter = 0;
    };

    //fill field with bombs
    FillField(difficult){
        let rows = this.field.length;
        let cells = this.field[0].length;
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cells; j++) {
                let seed = Math.random() * 100;
                if(seed <=  difficult){
                    this.SetBomb(i,j);
                }
            }
        }          
    };

    //set bomb in fildcell [a][b]
    SetBomb(a,b) {
        this.field[a][b] = -2;
        this.bombCounter++;
        let localField = this.GetLocalField(a,b);
        for( let i = localField.i; i <= localField.bottom; i++){
            for( let j = localField.j; j <= localField.right; j++){
                this.UpdateNearBombs(i,j);
            }    
        }
    };

    //update cells near bombs (increment value on field [a][b])
    UpdateNearBombs(a,b) {
        if(this.field[a][b] < 0) {
            return;
        }
        this.field[a][b]++;
    };


    // local field with 4-9 cells to avaid mass errors 
    GetLocalField(a,b) {
        let i = a - 1 > 0 ? a - 1 : 0;
        let j = b - 1 > 0 ? b - 1 : 0;
        let bottom = a + 1 < this.field.length ? a + 1 : this.field.length - 1;
        let right = b + 1 < this.field[a].length ? b + 1 : this.field[a].length - 1;
        let fieldAxis = {
            i: i,
            j: j,
            bottom: bottom,
            right: right
        };
        return fieldAxis;
    };

    // OnClickListener for LKM (TODO check it) 
    LeftClickDetected(node,i,j){
        if(this.field[i][j] === -2){
            this.GameOwer(node,i,j);
        }else if(this.field[i][j]>=0){
            this.SafeFieldExpansion(node,i,j);
        }
    };

    //field and position
    SafeFieldExpansion(node,a,b){
        let fieldCell = this.GetFieldCell(node,a,b);
        if(this.field[a][b] > 0){
            this.ShowNearbombCell(fieldCell,a,b);
        }else{
             if(this.field[a][b] === 0){
                this.field[a][b] = -3;
                fieldCell.classList.add('safe-cell');
                let localField = this.GetLocalField(a,b);
                
                for( let i = localField.i; i <= localField.bottom; i++){
                    for( let j = localField.j; j <= localField.right; j++){
                        if(i != a || j != b){
                            this.SafeFieldExpansion(node,i,j);
                        }
                    }    
                }              
             }
        }
    };

    //return element in a,b position
    GetFieldCell(node,i,j){
        return node.querySelectorAll('.content-row')[i].querySelectorAll('.content-cell')[j];
    };

    //show near bomb cell and stop
    ShowNearbombCell(node,a,b){
        node.classList.add('bomb-near');
        node.textContent = this.field[a][b];
             node.style.color = this.nearColor[this.field[a][b]];
        this.field[a][b] = -3;
    };
    // return field (0 - safety, 1-8 - nearbomb, -2 - bomb, -3 - checked)
    get GetFieldMatx(){
        return this.field;
    };

    //Returns Bombs quantity
    GetBombsCounter(){
        return this.bombCounter;
    };

    GameOwer(node, a, b){
        for(let i = 0; i < this.field.length; i++){
            for(let j = 0; j < this.field[0].length; j++){
                if(this.field[i][j] === -2){
                    if(i != a || j != b){
                        this.GetFieldCell(node,i,j).classList.add('bomb-cell');   
                    }
                }

                if (this.field[i][j] >= 0) {
                    this.GetFieldCell(node,i,j).classList.add('gray-cell');   
                }
                
                this.GetFieldCell(node,a,b).classList.add('bomb-explode');   
                this.GetFieldCell(node,i,j).onclick = null;
            }
        }
        let cap = node.querySelector('.content-caption');
        cap.textContent = 'Retry';
        /*let tempF = function() {
            console.log(this);
        };
        cap.addEventListener('click',tempF);*/
        let tempF = function(){
            this.ClearField(node);
            this.GameStart();
            cap.onclick = null;
        };

        cap.onclick = tempF.bind(this);
    //    GameOwer
        alert('GAME OVER');
    };

    // TODO oncClickListener for RBM and LBM
        //TODO Win/loose game logic
        // TODO for RBM make counter sincronise, if allB == allF -> wingame

    /*====================PROPERTIES=====================*/
    node = null;   
    field = [];
    bombCounter = 0;
    diffInterp = {
        recruit: 5,
        veteran: 10,
        expert: 20
    };

    fieldParams = {
        rows: 1,
        cols: 1,
        difficult: "recruit"
    }

    nearColor = [null, 'blue', 'green', 'red', '#0000ff', 'brown', 'cayan', 'crimson', 'crimson'];
};