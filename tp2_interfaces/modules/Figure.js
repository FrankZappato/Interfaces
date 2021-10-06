class Figure{
    /**
     *@type {CanvasRenderingContext2D}
     */
    constructor(posX,posY,fill,context){
        this.posX = posX;
        this.posY = posY;        
        this.fill = fill;
        this.context = context;
    }
    getCoordinates(){
        return {
            x : this.posX,
            y : this.posY
        }
    }
    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }

    draw(){
        this.context.fillStyle = this.fill;        
    }

    
}