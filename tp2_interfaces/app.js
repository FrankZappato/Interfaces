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
    });

    isMoving = false;
    token1 = new Token(posxToken1,posyToken1,'red',ctx,30,canvas,mouse);
    token2 = new Token(posxToken2,posyToken2,'blue',ctx,30,canvas,mouse);    
    player1 = new Player(token1,"Rojo");
    player2 = new Player(token2,"Azul");
    player1.setName("Rojo");
    player2.setName("Azul");

    jueguito = new Game (player1,player2,board,mouse);

    jueguito.setTokens(player1.getToken());
    jueguito.setTokens(player2.getToken());

    let btnStart = document.querySelector("#btn-start");
    btnStart.addEventListener("click",startGame);

    let btnRestart = document.querySelector("#btn-restart");
    btnRestart.addEventListener("click",restartGame)


    function startGame(event){
        event.preventDefault();
        jueguito.initGame(token1,token2,board);
        updatePlayerTurn();
    }   

    function restartGame(event){
        event.preventDefault();
        jueguito.resetGame(token1,token2,board);
    }
    
    function animate(){
        if (isMoving) {
            turn = jueguito.getPlayerTurn();
            updatePlayerTurn();
            requestAnimationFrame(animate);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            jueguito.updateGame(mouse.x,mouse.y);    
        }
         else {            
            jueguito.resetToken(turn.getToken().getInitPosX(),turn.getToken().getInitPosY(),turn.getToken());
        } 
    }     


    
    canvas.addEventListener('mousedown',playerMove);


    let playerTurn = document.querySelector("#player-turn");
    /**
     * Muestra el turno de cada jugador al realizar una jugada correcta lo cambia.
     */
    function updatePlayerTurn(){
        playerTurn.innerHTML = "Es el turno del jugador: " + jueguito.getPlayerTurn().getName();
    }
        
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
            animate();
            updatePlayerTurn();
        }
    })     
});