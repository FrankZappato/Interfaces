class Token extends Figure {
    /**
     *@type {CanvasRenderingContext2D}
     */
    constructor(posX,posY,fill,context,radius){
        super(posX,posY,fill,context);
        this.radius = radius;
    }

    getRadius(){
        return this.radius;
    }

    draw(){
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX,this.posY,this.radius,0,2* Math.PI);        
        this.context.fill();
        this.context.closePath();
    }
}