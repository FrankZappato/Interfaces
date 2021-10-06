class Board {
    /**
     *@type {CanvasRenderingContext2D}
     */
    constructor(cantX,cantY){
        this.cantX = cantX;
        this.cantY = cantY; 
        this.boardMap = [];       
    }

    getCantX(){
        return this.cantX;
    }

    getCantY(){
        return this.cantY;
    }

    drawBoard(ctx){
        for (let i = 0; i < this.cantX; i++) {
            for (let j = 0; j < this.cantY; j++) {
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.strokeRect(i * 80, j * 80, 80, 80);
                ctx.closePath();
            }
        }
    }
}