class Token extends Figure {
    /**
     *@type {CanvasRenderingContext2D}
     */
    constructor(posX,posY,fill,context,radius,canvas){
        super(posX,posY,fill,context);
       // this.initFigure(posX,posY,fill,context);
        this.radius = radius;
        this.initPosX = posX;
        this.initPosY = posY;
        this.canvas = canvas;
        this.context = context; 
       // this.mouse = mouse;       
    }

    update(){
        this.draw();
    }

    getCanvas () {
        return this.canvas;
    }

    getRadius(){
        return this.radius;
    }

    getFill() {
        return this.fill;
    }

    getInitPosX(){
        return this.initPosX;
    }
    getInitPosY(){
        return this.initPosY;
    }

    draw(){
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX,this.posY,this.radius,0,2* Math.PI); 
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 10;
        this.context.stroke();               
        this.context.fill();
        this.context.closePath();
    }    
}