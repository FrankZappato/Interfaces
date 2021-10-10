class Token extends Figure {
    /**
     *@type {CanvasRenderingContext2D}
     */
    constructor(posX,posY,fill,context,radius,canvas,mouse){
        super(posX,posY,fill,context);
       // this.initFigure(posX,posY,fill,context);
        this.radius = radius;
        this.canvas = canvas;
        this.context = context; 
        this.mouse = mouse;       
    }

    update(){
        this.draw();
    }

    getRadius(){
        return this.radius;
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