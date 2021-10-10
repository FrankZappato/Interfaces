class Box extends Figure{
     /**
     *@type {CanvasRenderingContext2D}
     */

     constructor(posX,posY,width,height,fill,context){
         super(posX,posY,fill,context);
         //this.posX = posX;
         //this.posY = posY;
         this.width = width;
         this.height = height;
         this.isFilled = false;
         //this.fill = fill;
         //this.context = context;
     }

     update(){
         this.draw();
     }
     getWidth(){
         return this.width;
     }

     getHeight(){
         return this.height;
     }
     getPosX(){
         return this.posX;
     }
     getPosY(){
         return this.posY;
     }

    filled(){
        this.isFilled = true;
    }
    clearFilled(){
        this.isFilled = false;
    }



     draw(){
        super.draw();
        this.context.beginPath();       
        this.context.lineWidth = 2;
        this.context.fillStyle = 'red';
        this.context.strokeStyle = this.fill;        
        this.context.strokeRect(this.posX,this.posY,this.width,this.height); 
        if(this.isFilled){       
            this.context.fillRect(this.posX,this.posY,this.width,this.height);  
        }  
        this.context.closePath();
     }
}