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
    /* initFigure(posX,posY,fill,context){
    } */

    update(){
        this.draw();
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

    setPosX(posX){
        this.posX = posX;        
    }
    setPosY(posY){
        this.posY = posY;
    }

    setPos(posX,posY){
        this.posX = posX;
        this.posY = posY;
    }

    draw(){
        this.context.fillStyle = this.fill;        
    }

    
}