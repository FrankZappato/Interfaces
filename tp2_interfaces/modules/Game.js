class Game {
    constructor(player1,player2,board,mouse){
        this.player1 = player1;
        this.player2 = player2;
        this.tokens = [];
        this.board = board;
        this.turn = player1;
        this.mouse = mouse;        
    }

    game () {
        //math random quien empieza con player
        //turno quien empieza true, el otro false
        //
    }   

    getPlayerTurn (){
        return this.turn;
    }

    getTokens () {
        return this.tokens;
    }

    getBoard () {
        return this.board;
    }

    setPlayerTurn (player) {
        if(this.getPlayerTurn() === this.player1){
            this.turn = player2;
        }else{
            this.turn = player1;
        }
    }

    setTokens (token) {
        this.tokens.push(token);
    }

    getDistance(x1,x2,y1,y2){
        let xD = x2 - x1;
        let yD = y2 - y1;

        return Math.sqrt(Math.pow(xD,2) + Math.pow(yD,2));
    }

    boxTokenColliding(circle, rect) {
        let distX = Math.abs(circle.getPosX() - rect.getPosX() - rect.getWidth() / 2);
        let distY = Math.abs(circle.getPosY() - rect.getPosY() - rect.getHeight() / 2);
    
        if (distX > (rect.getWidth() / 2 + circle.getRadius())) {
            return false;
        }
        if (distY > (rect.getHeight() / 2 + circle.getRadius())) {
            return false;
        }
    
        if (distX <= (rect.getWidth() / 2)) {
            return true;
        }
        if (distY <= (rect.getHeight() / 2)) {
            return true;
        }
    
        let dx = distX - rect.getWidth() / 2;
        let dy = distY - rect.getHeight() / 2;
        return (dx * dx + dy * dy <= (circle.getRadius() * circle.getRadius()));
    }

    updateGame(posX,posY) {        
        this.tokens.forEach(token => {
            if(this.getPlayerTurn().getToken() === token){
                token.setPos(posX,posY);                
            }
                token.update();            
        });       
        this.board.getBoardMap().forEach(col =>{
            col.forEach(box =>{
                if(this.boxTokenColliding(this.getPlayerTurn().getToken(),box)){
                    box.filled();
                }else{
                    box.clearFilled();
                }
            })
        })         
        this.board.update();
    }
}