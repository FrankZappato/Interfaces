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

    update(){
        this.drawBoard();
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

    getColumn(col){        
        let column = [];
        for(var i=0; i<this.boardMap.length; i++){
            column.push(this.boardMap[i][col]);
        }
        return column;         
    }
    initBoard(){
        let startingX;
        let box;        
        for (let i = 0; i < this.cantX; i++) {
            for (let j = 0; j < this.cantY; j++) {                     
                startingX = i * 70 + ((this.canvas.width/2) - ((this.cantX * 70)/2)); 
                box = new Box(startingX,j*70 + 80,70,70,'black',this.ctx);
                box.draw();                 
                this.boardMap[i][j] = box;              
            }
        }
    }

    drawBoard(){
        this.getBoardMap().forEach(col =>{
            col.forEach(box =>{
                box.draw();
            })
        })        
    }
}