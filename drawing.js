document.addEventListener("DOMContentLoaded",()=>{
    /**
     *@type {CanvasRenderingContext2D}
     */
    let canvasDrw = document.querySelector("#canvas-drw");
    canvasDrw.width = canvasDrw.offsetWidth;
    canvasDrw.height = canvasDrw.offsetHeight;
    let ctx = canvasDrw.getContext("2d");

    //Preset de funciones y variables para agregar eventos al menú.
    function addEventListenerToPicker(){
       let color_picker = document.querySelector("#color_picker");
       color_picker.addEventListener("change",changeColorWithPicker);       
    }

    let sizeChange = document.querySelector("#pencil_range");
    function addEventToSizeRange(){
        sizeChange.addEventListener("change",changeSizeOfPencil);
    }

    function addEventClickToColors(){
        let colors = document.querySelectorAll(".color-field");        
        colors.forEach(col => {
            col.addEventListener("click",changeColor);
        });
    }

    document.querySelector('#btn-clear').addEventListener('click',clearCanvas);
    document.querySelector('#btn-undo').addEventListener('click',undoChange);
    let sizeView = document.querySelector('#size');
    

    addEventClickToColors();
    addEventListenerToPicker();
    addEventToSizeRange();
    
    
    //Boolean para trackear si estoy apretando el click o no.
    let painting = false; 
    let color = 'black';
    let size = 5;
    sizeView.innerHTML = size;
    sizeChange.value = size;
    let restore_array = [];//array de lineas dibujadas.
    let idxRestore = -1;//index del array para poder deshacer cambios.

    //Functions    
    function clearCanvas(){
        ctx.fillStyle  = 'white';
        ctx.clearRect(0,0,canvasDrw.width,canvasDrw.height);
        ctx.fillRect(0,0,canvasDrw.width,canvasDrw.height);

        restore_array = [];
        idxRestore = -1;
    }

    function undoChange(){
        if(idxRestore <=0){
            clearCanvas();
        }else{
            idxRestore --;
            restore_array.pop();
            ctx.putImageData(restore_array[idxRestore],0,0);
        }
    }

    function changeColor(event){
        color = event.target.style.background;
    }

    function changeColorWithPicker(event){
        console.log(event);
        color = event.target.value;
    }
    function changeSizeOfPencil(event){
        size = event.target.value;
        sizeView.innerHTML = size;
    }

    function startPosition(event)
    {       
        painting = true;
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvasDrw.offsetLeft,
             event.clientY - canvasDrw.offsetTop);
        event.preventDefault();
        draw(event);
    }
    function finishedPosition(event)
    {
        if(painting){
            ctx.stroke();
            ctx.closePath();
            painting = false;           
        }
        event.preventDefault();

        if(event.type != 'mouseout'){
            restore_array.push(ctx.getImageData(0,0,canvasDrw.width,canvasDrw.height));
            idxRestore ++;
        }
    }
    function draw(event)
    {
        if(!painting) return;
        ctx.lineTo(event.clientX - canvasDrw.offsetLeft,
             event.clientY - canvasDrw.offsetTop);
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();    
        event.preventDefault();         
    }

    //EventListeners
    canvasDrw.addEventListener("mousedown",startPosition);
    canvasDrw.addEventListener("mousemove",draw);
    canvasDrw.addEventListener("mouseup",finishedPosition);
    canvasDrw.addEventListener("mouseout",finishedPosition);
});