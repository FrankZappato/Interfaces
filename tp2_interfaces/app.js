document.addEventListener("DOMContentLoaded",()=>{    
      
    /**
     *@type {CanvasRenderingContext2D}
     */

    let mouse = {
        x : innerWidth/2,
        y : innerHeight/2
    }

    let posxToken1 = 100;
    let posyToken1 = 500;
    let posxToken2 = 100;
    let posyToken2 = 300;    

    let canvas = document.querySelector('#default-board');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");
    let board = new Board(6,7,canvas);
    
    canvas.addEventListener('mousemove',function(event){
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        //console.log(mouse)
    });

    isMoving = false;
    token1 = new Token(posxToken1,posyToken1,'red',ctx,30,canvas,mouse);
    token2 = new Token(posxToken2,posyToken2,'blue',ctx,30,canvas,mouse);

    player1 = new Player(token1,"Rojo");
    player2 = new Player(token2,"Azul");

    jueguito = new Game (player1,player2,board,mouse);

    jueguito.setTokens(player1.getToken());
    jueguito.setTokens(player2.getToken());

    token1.draw();
    token2.draw();
    board.initBoard();
    board.drawBoard();
    ctx.font = '25px serif';
    ctx.fillStyle = 'black';
    ctx.strokeText ("Turno del jugador " + jueguito.getPlayerTurn().getName(),mouse.x+ token1.getRadius(),mouse.y); 
    ctx.strokeText("Cuatro en Linea ", 20, 40);   

    jueguito.endGame();
    
    function animate(){
        if (isMoving) {
            turn = jueguito.getPlayerTurn();
            requestAnimationFrame(animate);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            jueguito.updateGame(mouse.x,mouse.y);
            //ctx.strokeStyle = 'black';
            ctx.font = '25px serif';
            ctx.fillStyle = 'black';
            ctx.fillText ("Turno del jugador " + turn.getName(),mouse.x+ token1.getRadius(),mouse.y); 
            ctx.fillText("Cuatro en Linea ", 20, 40);                                        
            
        }
         else {            
            jueguito.resetToken(turn.getToken().getInitPosX(),turn.getToken().getInitPosY(),turn.getToken());
        } 
    }
    console.log(board.getBoardMap());
    console.log(board.getColumn(0));    

    //canvasDrw.addEventListener("mousedown",startPosition);
    //canvasDrw.addEventListener("mousemove",draw);
    //canvasDrw.addEventListener("mouseup",finishedPosition);

    
    canvas.addEventListener('mousedown',playerMove);
        
        
    function playerMove(){
        turn = jueguito.getPlayerTurn();
        isMoving = true;
        if(mouse.x -  turn.getToken().getPosX() < 50 && mouse.x - turn.getToken().getPosX() > - 50
        && mouse.y - turn.getToken().getPosY() < 50 && mouse.y - turn.getToken().getPosY() > - 50){

           animate();
       }
    }

     canvas.addEventListener('mouseup',function(){
        isMoving = false;
        let checkDrop = board.tokenDrop(board.checkFilledColumn(),turn.getToken());
        if(checkDrop) {
            if(jueguito.endGame()) {
                window.alert("Terminó el juego ganó el jugador : " + turn.getName());
            }
            jueguito.setPlayerTurn();

        }
    })     
});