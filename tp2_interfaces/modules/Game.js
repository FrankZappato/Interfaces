class Game {
    constructor(player1,player2,board,mouse){
        this.player1 = player1;
        this.player2 = player2;
        this.tokens = [];
        this.board = board;
        this.turn = undefined;
        this.mouse = mouse;  
        this.CONNECT = 4;      
    }

    initGame (token1,token2,board) {
        token1.draw();
        token2.draw();
        board.initBoard();
        board.drawBoard();
        let starter = Math.floor(Math.random() * (2 - 1 + 1)) + 1;        
        if(starter == 1){
            this.turn = this.player1;
        }else{
            this.turn = this.player2;
        }
        this.startTimer();
        //math random quien empieza con player
        //turno quien empieza true, el otro false
        //
    }   

    startTimer(){
        let countdownTime = new Date().getTime() + 600000;
        console.log(countdownTime)
        let x = setInterval(function (){         
            let timeNow = new Date().getTime();
            console.log(timeNow)
            let distance = countdownTime - timeNow;
            console.log(distance);
            let mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let secs = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById("timer").innerHTML = mins + "m " + secs + "s ";

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("timer").innerHTML = "EXPIRED";
            }          
        }, 1000);    
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
    /**
     * Chequea colision entre los tokens de los jugadores y los casilleros del tablero.
     * @param {*Token} circle 
     * @param {*Box} rect 
     * @returns {Boolean}
     */

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
                    box.hovered();
                }else{
                    box.clearHovered();
                }
            })
        })         
        this.board.update(this.getPlayerTurn().getToken());
    }

    resetToken (posX,posY,token) {
        token.setPos(posX,posY);
        token.update();
    }

    endGame() {
        for (let y = 0; y < this.board.getCantX(); y++) {
            for (let x = 0; x < this.board.getCantY(); x++) {
                let count = 0;
                count = this.countUp(x, y, this.turn.getToken(), this.board.getBoardMap());
                if (count >= this.CONNECT) return true;
                count = this.countRight(x, y, this.turn.getToken(), this.board.getBoardMap());
                if (count >= this.CONNECT) return true;
                count = this.countUpRight(x, y, this.turn.getToken(), this.board.getBoardMap());
                if (count >= this.CONNECT) return true;
                count = this.countDownRight(x, y, this.turn.getToken(), this.board.getBoardMap());
                if (count >= this.CONNECT) return true;
            }
        }
        return false;
    }

    countUp(x, y, player,board) {
        let startY = (y - this.CONNECT >= 0) ? y - this.CONNECT + 1 : 0;
        let counter = 0;
        for (; startY <= y; startY++) {
            if (board[startY][x].getToken() === player) {
                counter++;
            } else {
                counter = 0;
            }
        }
        return counter;
    }
    countRight(x, y, player, board) {
        let endX = (x + this.CONNECT < this.board.getCantY()) ? x + this.CONNECT- 1 : this.board.getCantY() - 1;
        let counter = 0;
        for (; x <= endX; x++) {
            if (board[y][x].getToken() === player) {
                counter++;
            } else {
                counter = 0;
            }
        }
        return counter;
    }
    countUpRight(x, y, player, board) {
        let endX = (x + this.CONNECT < this.board.getCantY()) ? x + this.CONNECT - 1 : this.board.getCantY() - 1;
        let startY = (y - this.CONNECT >= 0) ? y - this.CONNECT + 1 : 0;
        let counter = 0;
        while (x <= endX && startY <= y) {
            if (board[y][x].getToken() === player) {
                counter++;
            } else {
                counter = 0;
            }
            x++;
            y--;
        }
        return counter;
    }
    countDownRight(x, y, player, board) {
        let endX = (x + this.CONNECT < this.board.getCantY()) ? x + this.CONNECT - 1 : this.board.getCantY() - 1;
        let endY = (y + this.CONNECT < this.board.getCantX()) ? y + this.CONNECT - 1 : this.board.getCantX() - 1;
        let counter = 0;
        while (x <= endX && y <= endY) {
            if (board[y][x].getToken() === player) {
                counter++;
            } else {
                counter = 0;
            }
            x++;
            y++;
        }
        return counter;
    }
}