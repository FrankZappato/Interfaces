document.addEventListener("DOMContentLoaded",()=>{
    //Variables del canvas y su contexto
    let canvas = document.querySelector("#canvas");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let ctx = canvas.getContext("2d");    

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

    //Variables para dibujar
    let sizeView = document.querySelector('#size');
    let painting = false; 
    let pencilColor = 'black';
    let size = 5;
    sizeView.innerHTML = size;
    sizeChange.value = size;
    let restore_array = [];//array de lineas dibujadas.
    let idxRestore = -1;//index del array para poder deshacer cambios.    

     addEventClickToColors();
     addEventListenerToPicker();
     addEventToSizeRange();     
 
     ///document.querySelector('#btn-clear').addEventListener('click',clearCanvas);
     document.querySelector('#btn-undo').addEventListener('click',undoChange);
        


    function clearCanvas(){
        ctx.fillStyle  = 'white';
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillRect(0,0,canvas.width,canvas.height);

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
        pencilColor = event.target.style.background;
    }

    function changeColorWithPicker(event){        
        pencilColor = event.target.value;
    }
    function changeSizeOfPencil(event){
        size = event.target.value;
        sizeView.innerHTML = size;
    }

    function startPosition(event)
    {       
        painting = true;
        ctx.beginPath();
        ctx.moveTo(getPointerPositionX(event) - canvas.offsetLeft,
             getPointerPositionY(event) - canvas.offsetTop);
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
            restore_array.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            idxRestore ++;
        }
    }

    /**
     * Funcion para dibujar disparado el evento mousemove, solo si el boolean painting es 'true'.
     * @param {Event} event 
     * @returns void
     */
    function draw(event)
    {
        if(!painting) return;  
        //setInterval(getPointerPositionX(event), 100);      
        //setInterval(getPointerPositionY(event), 100);      
        ctx.lineTo(getPointerPositionX(event) - canvas.offsetLeft,
             getPointerPositionY(event) - canvas.offsetTop);
        ctx.strokeStyle = pencilColor;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();    
        event.preventDefault();         
    }

    function getPointerPositionX(event)
    {        
        return (event.clientX + window.scrollX);
    }
    function getPointerPositionY(event)
    {        
        return (event.clientY + window.scrollY);
    }

    //EventListeners
    canvas.addEventListener("mousedown",startPosition);
    canvas.addEventListener("mousemove",draw);
    canvas.addEventListener("mouseup",finishedPosition);
    canvas.addEventListener("mouseout",finishedPosition);

    document.addEventListener("mousemove",getPointerPositionX);
    document.addEventListener("mousemove",getPointerPositionY);


/* BOTONES
CARGAR IMAGEN:
La funcion se llama cuando se seleciona un archivo.
Creamos un variable que se asigna a un metodo javascript Image.
Si la imagen esta corectamente cargar llama la funcion draw, asignada con la imagen
en caso contrario a la funcion failed.
La funcion failed se encarga de mostrar un mensaje de error 
 */

document.getElementById('select_image').onchange = function(e) {
    let img = new Image();
    img.src = URL.createObjectURL(this.files[0]);
    img.onload = function draw(){     
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        /*let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        return imageData*/
    };
    img.onerror = function failed(){
        document.getElementById("error").innerHTML = "El archivo selecionado no se puede cargar";
    };
};

/* 
Selecionamos el boton, le agregamos el event 'click'
Convertimos el canvas en una imagen
Creamos una variable que representa el canvas
Creamos otra variable para dar una url al canvas
Llamamos a la funcion de descarga con los parametros de la url y un titulo para la imagen 
*/

document.querySelector('#btn-reset').addEventListener("click", function(e) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'blob:http://127.0.0.1:5500/627fd747-ea38-4c53-be55-b993f0b488bb', true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
    if (this.status == 200) {
        var myBlob = this.response;
        // myBlob is now the blob that the object URL pointed to.
        console.log(myBlob)
    }
    };
    xhr.send();
});

/*
Selecionamos el boton, le agregamos el event 'click'
Selecionamos el canvas
usamos la funcion clearReact para dibujar un nuevo canvas, que en este caso sera vacio
*/
document.querySelector('#btn-save').addEventListener("click", function(e) {   
    let dataURL = canvas.toDataURL("image/jpeg", 1.0);
    downloadImage(dataURL, 'file.jpeg');
});

function downloadImage(data, filename = 'untitled.jpeg') {
    let a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}

//Limpiamos el canvas utilizando clearRect.
document.querySelector('#btn-new').addEventListener("click", function(e) {  
    ctx.fillStyle  = 'white';
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(0,0,canvas.width,canvas.height);  
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
})

//Funciones de filtros
function filterNegative()
{
    let img = ctx.getImageData(0,0,canvas.width,canvas.height);         
        for(let x = 0; x < img.width; x++){
            for(let y = 0; y < img.height; y++){
                avgFilter = 3;
                filterPixelNegative(img,x,y);
                }
        }  
        ctx.putImageData(img,0,0);  
}
function filterPixelNegative(imgData,x,y)
    {
        let f = (x + y * imgData.width) * 4;               
        imgData.data[f + 0] = 255 - imgData.data[f + 0];
        imgData.data[f + 1] = 255 - imgData.data[f + 1];
        imgData.data[f + 2] = 255 - imgData.data[f + 2];
        imgData.data[f + 3] = 255; 
    }

    function filterSepia(){
        let img = ctx.getImageData(0,0,canvas.width,canvas.height);
        for(let x = 0; x < img.width; x++ ){
            for(let y = 0; y < img.height; y++){
                filterPixelSepia(img,x,y);
            }
        }
        ctx.putImageData(img,0,0);
    }
    function filterPixelSepia(imgData,x,y){
        let f = (x + y * imgData.width) * 4; 
        let avg = ( imgData.data[f + 0] + imgData.data[f + 1] + imgData.data[f + 2]);       
        imgData.data[f + 0] = avg * 0.46;
        imgData.data[f + 1] = avg * 0.37;
        imgData.data[f + 2] = avg * 0.17;
    }

    function filterBinary(){
        let img = ctx.getImageData(0,0,canvas.width,canvas.height);
        for(let x = 0; x < img.width; x++ ){
            for(let y = 0; y < img.height; y++){
                filterPixelBinary(img,x,y);
            }
        }
        ctx.putImageData(img,0,0);
    }

    function filterPixelBinary(imgData,x,y){
        let f = (x + y * imgData.width) * 4; 
        let avg = ( imgData.data[f + 0] + imgData.data[f + 1] + imgData.data[f + 2]) / 3;      
        if(avg < 127.5) {
            imgData.data[f + 0] = 0;
            imgData.data[f + 1] = 0;
            imgData.data[f + 2] = 0;
        }else{
            imgData.data[f + 0] = 255;
            imgData.data[f + 1] = 255;
            imgData.data[f + 2] = 255;
        }
    }


/* APLICACION DE  FILTROS*/ 
document.getElementById('filtros').addEventListener('change', function() {
    if(this.value == "brillo"){        
        filterBrillo();
    } 
    if(this.value == "negative"){
        filterNegative();
    } 
    if(this.value == "sepia"){
        filterSepia();
    }
    if(this.value == "binary"){
        filterBinary();
    } 
    if(this.value == "blur"){        
        ctx.drawImage(canvas, 0, 0);
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        //blurr
        let px = imgData.data;
        let tmpPx = new Uint8ClampedArray(px.length);

        for (let i = 0, len = px.length; i < len; i++) {
            tmpPx[i] = px[i]
        }
        
        for (let i = 0, len = px.length; i < len; i++) {
            if(i % 3 === 4){
                continue;
            }
            px[i] = (tmpPx[i]
                + (tmpPx[i - 4] || tmpPx[i])
                + (tmpPx[i + 4] || tmpPx[i])
                + (tmpPx[i - 4 * imgData.width] || tmpPx[i])
                + (tmpPx[i + 4 * imgData.width] || tmpPx[i])
                + (tmpPx[i - 4 * imgData.width - 4] || tmpPx[i])
                + (tmpPx[i + 4 * imgData.width + 4] || tmpPx[i])
                + (tmpPx[i - 4 * imgData.width - 4] || tmpPx[i])
                + (tmpPx[i + 4 * imgData.width + 4] || tmpPx[i])
            ) / 9;
        }
        ctx.putImageData(imgData, 0, 0);
        delete(tmpPx)
    }
  }); 
   
  /**
   * Variables y funciones para el filtro brillo mediante el input range.
   */
  let brillo = 50;
  let brilloChange = document.querySelector("#brillo");
  function addEventToBrillo(){
      brilloChange.addEventListener("change",changeBrillo,);
  }
  let brilloNumber = document.querySelector("#brillo-number");
  brilloNumber.innerHTML = brillo; 
  function changeBrillo(event)
  {
      brillo = event.target.value;           
      brilloNumber.innerHTML = brillo; 
      filterBrillo();      
  }  

  addEventToBrillo();  

  function filterBrillo()
  {      
    let img = ctx.getImageData(0,0,canvas.width,canvas.height);
        for(let x = 0; x < img.width; x++ ){
            for(let y = 0; y < img.height; y++){
                filterPixelBrillo(img,x,y);
            }
        }
        ctx.putImageData(img,0,0);
  }
  /**
   * Utilizamos un rango de brillo de 255/100 = 2.55 para que al ajustar los valores de brillo 
   * esten entre el rango de (0,255) inicializando con 50(brillo range) como el 0 en cantidad de brillo agregado.
   */

  function filterPixelBrillo(imgData,x,y)
  {
    let f = (x + y * imgData.width) * 4;      
    if(brillo >= 50){         
        imgData.data[f + 0] =  imgData.data[f + 0] + (brillo - 50) * 2.55 ;
        imgData.data[f + 1] =  imgData.data[f + 1] + (brillo - 50) * 2.55 ; 
        imgData.data[f + 2] =  imgData.data[f + 2] + (brillo - 50) * 2.55 ;
        imgData.data[f + 3] = 255;     
    }else{
        imgData.data[f + 0] =  imgData.data[f + 0] - (50 - brillo) * 2.55 ;
        imgData.data[f + 1] =  imgData.data[f + 1] - (50 - brillo) * 2.55 ; 
        imgData.data[f + 2] =  imgData.data[f + 2] - (50 - brillo) * 2.55 ;
        imgData.data[f + 3] = 255;    
    }
  }

  /*function filterBlur()
  {
    let img = ctx.getImageData(0,0,canvas.width,canvas.height);
    for(let x = 0; x < img.width; x++ ){
        for(let y = 0; y < img.height; y++){
            filterPixelBinary(img,x,y);
        }
    }
    ctx.putImageData(img,0,0);
  }
  function filterPixelBlur(imgData,x,y){
    let f = (x + y * imgData.width) * 4; 
    let avg = ( imgData.data[f + 0] + imgData.data[f + 1] + imgData.data[f + 2]) / 3;      
    if(avg < 127.5) {
        imgData.data[f + 0] = 0;
        imgData.data[f + 1] = 0;
        imgData.data[f + 2] = 0;
    }else{
        imgData.data[f + 0] = 255;
        imgData.data[f + 1] = 255;
        imgData.data[f + 2] = 255;
    }
}*/
});
