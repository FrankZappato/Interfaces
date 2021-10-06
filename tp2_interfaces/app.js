document.addEventListener("DOMContentLoaded",()=>{    
      
    /**
     *@type {CanvasRenderingContext2D}
     */
    let board = new Board(10,8);
    
    let canvas = document.querySelector('#default-board');
    let ctx = canvas.getContext("2d");

    canvas.setAttribute("width",board.getCantX() * 80);
    canvas.setAttribute("height",board.getCantY() * 80);

    board.drawBoard(ctx);  

    let canvasP1 = document.querySelector("#p1-token");
    let ctxP1 = canvasP1.getContext("2d");

    let canvasP2 = document.querySelector("#p2-token");
    let ctxP2 = canvasP2.getContext("2d");
    
    let tokenP1 = new Token(150,75,"red",ctxP1,40);
    let tokenP2 = new Token(150,75,"blue",ctxP2,40);

    tokenP1.draw();    
    tokenP2.draw();

});