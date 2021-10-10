document.addEventListener("DOMContentLoaded",()=>{    
      
    /**
     *@type {CanvasRenderingContext2D}
     */

    let mouse = {
        x : innerWidth/2,
        y : innerHeight/2
    }
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
    token1 = new Token(100,500,'red',ctx,30,canvas,mouse);
    token2 = new Token(1200,500,'blue',ctx,30,canvas,mouse);

    player1 = new Player(token1,"mari");
    player2 = new Player(token2,"fran");

    jueguito = new Game (player1,player2,board,mouse);

    jueguito.setTokens(player1.getToken());
    jueguito.setTokens(player2.getToken());

    token1.draw();
    token2.draw();
    board.initBoard();
    board.drawBoard();  
    
    function animate(){
        if (isMoving) {
            turn = jueguito.getPlayerTurn();
            requestAnimationFrame(animate);
            ctx.clearRect(0,0,canvas.width,canvas.height);                     
            jueguito.updateGame(mouse.x,mouse.y);
        }
    }
    console.log(board.getBoardMap());
    console.log(board.getColumn(0));

    function getDistance(x1,x2,y1,y2){
        let xD = x2 - x1;
        let yD = y2 - y1;

        return Math.sqrt(Math.pow(xD,2) + Math.pow(yD,2));
    }
    

    //canvasDrw.addEventListener("mousedown",startPosition);
    //canvasDrw.addEventListener("mousemove",draw);
    //canvasDrw.addEventListener("mouseup",finishedPosition);

    
    canvas.addEventListener('mousedown',playerMove);
        
        
    function playerMove(){
        turn = jueguito.getPlayerTurn();
        isMoving = true;
        if(mouse.x -  turn.getToken().getPosX() < 30 && mouse.x - turn.getToken().getPosX() > - 30
        && mouse.y - turn.getToken().getPosY() < 30 && mouse.y - turn.getToken().getPosY() > - 30){

           animate();
       }
    }

     canvas.addEventListener('mouseup',function(){
        isMoving = false;
        jueguito.setPlayerTurn();     
    }) 

    /*(mouse.x - this.x < 50 && mouse.x - this.x > -50
        && mouse.y - this.y < 50 && mouse.y - this.y > -50)*/
    //board.addEventClick();

    /* let canvasP1 = document.querySelector("#p1-token");
    let ctxP1 = canvasP1.getContext("2d");

    let canvasP2 = document.querySelector("#p2-token");
    let ctxP2 = canvasP2.getContext("2d");
    
    let tokenP1 = new Token(150,75,"red",ctxP1,40);
    let tokenP2 = new Token(150,75,"blue",ctxP2,40); */

    
    
       
    /* tokenP1.draw();
    tokenP2.draw();  */  
});