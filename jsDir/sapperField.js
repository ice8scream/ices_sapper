class sapperField {
    constructor(rows, cells, difficult) {
        this.field = [];
        this.bombCounter = 0;
        this.diffInterp = {
            recruit: 5,
            veteran: 10,
            expert: 20
        };

        this.Reset(rows, cells);
        this.FillField(this.diffInterp[difficult]);
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
        if(this.field[i][j] == -2){
            this.GameOwer(this.GetFieldCell(node,i,j));
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
             if(this.field[a][b] == 0){
                this.field[a][b] = -3;
                fieldCell.classList.add('test');
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
        return node.querySelectorAll(".content-row")[i].querySelectorAll(".content-cell")[j];
    };

    //show near bomb cell and stop
    ShowNearbombCell(node,a,b){
        node.classList.add('bomb-near');
        node.textContent = this.field[a][b];
        this.field[a][b] = -3;
    };

    GameOwer(node){
        node.classList.add('bomb-cell');
        alert("GAME OVER");
    };

    // return field (0 - safety, 1-8 - nearbomb, -2 - bomb, -3 - checked)
    getFieldMatx(){
        return this.field;
    };

    //Returns Bombs quantity
    GetBombsCounter(){
        return this.bombCounter;
    };

    // TODO oncClickListener for RBM and LBM
        //TODO Win/loose game logic
        // TODO for RBM make counter sincronise, if allB == allF -> wingame
    
};