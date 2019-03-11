class sapperField {
    constructor(rows, cells, difficult) {
        
        this.Reset(rows, cells, difficult);
    };    
    Reset(rows, cells, difficult) {
        this.field = [];
        for(let i = 0; i < rows; i++) {
            let fieldRow = [];
            for(let j = 0; j < cells; j++) {
                fieldRow.push(0);
                //TODO rand,
                // if rand < 20 * difficult set bomb,
                // increment nearBombsCounter
                // increment bombs counter
            }
            this.field.push(fieldRow);
        }
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