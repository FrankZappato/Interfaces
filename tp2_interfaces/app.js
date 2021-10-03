document.addEventListener("DOMContentLoaded",()=>{    
      
    let board = new Board(6,7);
    
    let canvas = document.querySelector('#default-board');
    let ctx = canvas.getContext("2d");

    canvas.setAttribute("width",board.getCantX() * 80);
    canvas.setAttribute("height",board.getCantY() * 80);

    board.drawBoard(ctx);  
    

});