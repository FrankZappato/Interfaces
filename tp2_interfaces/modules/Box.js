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
         this.token = null;
         this.isHover = false;
         //this.fill = fill;
         //this.context = context;
     }

     update(){
         this.draw();
     }
     getWidth(){
         return this.width;
     }

     getToken() {
         return this.token;
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

     hovered(){
         this.isHover = true;
     }
     clearHovered(){
         this.isHover = false;
     }

    filled(token){
        this.isFilled = true;
        this.token = token;
    }
    clearFilled(){
        this.isFilled = false;
    }
    getIsFilled(){
        return this.isFilled;
    }
    getIsHovered(){
        return this.isHover;
    }



     draw(movedToken){
        super.draw();
        this.context.beginPath();       
        this.context.lineWidth = 2;
        //this.context.fillStyle = 'red';
        this.context.strokeStyle = this.fill;        
        this.context.strokeRect(this.posX,this.posY,this.width,this.height); 
        if (this.isHover) {
            let token = new Token(this.posX+this.width/2,this.posY+this.height/2,
                movedToken.getFill(),this.context,30,movedToken.getCanvas());
            token.draw();
        }
        if(this.isFilled){       
            let token = new Token(this.posX+this.width/2,this.posY+this.height/2,
                this.token.getFill(),this.context,30,this.token.getCanvas())
            token.draw();
        }  
        this.context.closePath();
     }
}