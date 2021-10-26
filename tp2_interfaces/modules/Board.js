class Board {
    /**
     *@type {CanvasRenderingContext2D}
     */      
    constructor(cantX,cantY,canvas){
        this.cantX = cantX;
        this.cantY = cantY; 
        this.boardMap = new Array(cantX).fill(new Figure()).map(() => new Array(cantY).fill(new Figure()));
        this.canvas =  canvas;
        this.ctx = this.canvas.getContext("2d");       
    }

    update(color){
        this.drawBoard(color);
    }

    getCantX(){
        return this.cantX;
    }

    getCantY(){
        return this.cantY;
    }

    getBoardMap(){
        return this.boardMap;
    }
    checkFilledColumn(){
        let boxFilled;
        let filledColumn = [];
        this.getBoardMap().forEach(col =>{
            col.forEach(box =>{
                if(box.getIsHovered()){
                    filledColumn =  col;
                }
            })
        }) 
        return filledColumn;
    }

    tokenDrop(col,token){
        let i = col.length - 1; 
        let finish = false;     
        if(i != 0){
            while((i >= 0 ) && (!finish)){
                if (col[0].getIsFilled())
                    finish = true;
                if (!col[i].getIsFilled()) {
                    col[i].filled(token);
                    finish = true;                    
                }
                i--;
                
            }
        }
        return finish;
    }

    getBox(x,y){
        return this.boardMap[x][y];
    }

    getColumn(col){        
        let column = [];
        for(var i=0; i<this.boardMap.length; i++){
            column.push(this.boardMap[col][i]);
        }
        return column;         
    }
    /**
     * Inicializo el tablero con sus respectivos casilleros y lo dibujo.
     */
    initBoard(){
        let startingX;
        let box;
        let distX = 80;        
        for (let i = 0; i < this.cantX; i++) {
           // distX = 80;
            for (let j = 0; j < this.cantY; j++) {                     
                startingX = i * distX + ((this.canvas.width/2) - ((this.cantX * 70)/2)); 
                box = new Box(startingX,j*70 + 80,70,70,'black',this.ctx);
                box.draw('white');                 
                this.boardMap[i][j] = box;                              
            }
        }
    }
    /**
     * Recorro los casilleros del tablero para redibujarlos en su estado actual.
     */
    drawBoard(color){
        this.getBoardMap().forEach(col =>{
            col.forEach(box =>{
                box.draw(color);
            })
        })        
    }
}