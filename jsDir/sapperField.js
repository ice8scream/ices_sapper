class sapperField {
    constructor(rows, cells, difficult) {
        this.field = [];
        this.diffInterp = {
            recruit: 15,
            veteran: 30,
            expert: 45
        };

        this.Reset(rows, cells);
        this.FillField(this.diffInterp[difficult]);
    }; 


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
             //TODO rand,
                // if rand < 20 * difficult set bomb,
                // increment nearBombsCounter
                // increment bombs counter
    };

    SetBomb(a,b) {
        this.field[a][b] = -2;
        /*let localField = getLocalField(a,b);
        for( let i = localField.i; i < localField.bottom; i++){
            for( let j = localField.j; j < localField.right; j++){
                
            }    
        }*/
    };

    getLocalField(a,b) {
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

    getFieldMatx(){
        return this.field;
    };


    // TODO oncClickListener for RBM and LBM
        //TODO for LBM if bomb -> loose, 
            // else checkNearBombs
            // if hearBombs == 0
            //     return   checkNearBombs for 4 axis
            // if nearbombs && !checked ->
            //     return nearBombsCounter
        // TODO for LBM make counter sincronise, if allB == allF -> wingame
    
};