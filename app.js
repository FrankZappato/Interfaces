document.addEventListener("DOMContentLoaded",()=>{
    //Variables del canvas y su contexto
    let canvas = document.querySelector("#canvas");
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
        console.log(event);
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
        ctx.moveTo(event.clientX - canvas.offsetLeft,
             event.clientY - canvas.offsetTop);
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
    function draw(event)
    {
        if(!painting) return;
        ctx.lineTo(event.clientX - canvas.offsetLeft,
             event.clientY - canvas.offsetTop);
        ctx.strokeStyle = pencilColor;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();    
        event.preventDefault();         
    }

    //EventListeners
    canvas.addEventListener("mousedown",startPosition);
    canvas.addEventListener("mousemove",draw);
    canvas.addEventListener("mouseup",finishedPosition);
    canvas.addEventListener("mouseout",finishedPosition);


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
       // var canvas = document.getElementById('canvas');
        //var ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
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
    var dataURL = canvas.toDataURL("image/jpeg", 1.0);
    downloadImage(dataURL, 'file.jpeg');
});

function downloadImage(data, filename = 'untitled.jpeg') {
    var a = document.createElement('a');
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

//OPCIONAL
document.querySelector("#btn-small").addEventListener("click", function(e){    
    canvas.style.width = "30%";
})

document.querySelector("#btn-medium").addEventListener("click", function(e){    
    canvas.style.width = "60%";
})
document.querySelector("#btn-standard").addEventListener("click", function(){    
    canvas.style.width = "100%";
    canvas.style.margin = "0 0"
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
        //let avg = ( imgData.data[f + 0] + imgData.data[f + 1] + imgData.data[f + 2]) / avgFilter;       
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

    // function filterSobel(){
    //     let img = ctx.getImageData(0,0,canvas.width,canvas.height);
    //     for (let y = 1, i = (img.width + 1) * 4; y < img.height - 1; ++y, i += 8) {
    //         for (let x = 1; x < img.width - 1; ++x, i += 4) {
    //             filterPixelSobel(img,x,y, i);
    //         }
    //     }
    //     ctx.putImageData(img,0, 0, 0, 0, img.width, 1);
    // }

    // function filterPixelSobel(imgData,x,y,i){
    //     let Kx = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
    //     let Ky = [-1, -2, -1, 0, 0, 0, +1, +2, +1]
    //     let cx = 0, cy = 0;
    //     for (let yk = y - 1, j = 0; yk <= y + 1; ++yk) {
    //         for (let xk = x - 1; xk <= x + 1; ++xk, ++j) {
    //         let i = (yk * imgData.width + xk) << 2;
    //         cx += imgData.data[i] * Kx[j];
    //         cy += imgData.data[i] * Ky[j];
    //         }
    //     }
    //     // let f = (x + y * imgData.width) * 4; 
    //     imgData.data[i + 0] = 
    //     imgData.data[i + 1] = 
    //     imgData.data[i + 2] = 255 + imgData.data[i + 2] - Math.hypot(cx, cy);
    //     imgData.data[i + 3] = 255;
    // }

    function filterSobel(){
        let img = ctx.getImageData(0,0,canvas.width,canvas.height);
        for(let x = 0; x < img.width; x++ ){
            for(let y = 0; y < img.height; y++){
                filterPixelSobel(img,x,y);
            }
        }
        ctx.putImageData(img,0,0);
    }

    function filterPixelSobel(imgData,x,y){
        for (var i = 0; i < imgData.length; i += 4) {
            var r = imgData[i]; 
            var g = imgData[i + 1];
            var b = imgData[i + 2];
            var gray = 0.2989*r + 0.5870*g + 0.1140*b; //weights from CCIR 601 spec
            imgData[i] = -gray * x + imgData[i] * (1+x);
            imgData[i] = -gray * y + imgData[i] * (1+y);
            imgData[i+1] = -gray * x + imgData[i+1] * (1+x);
            imgData[i+1] = -gray * y + imgData[i+1] * (1+y);
            imgData[i+2] = -gray * x + imgData[i+2] * (1+x);
            imgData[i+2] = -gray * y + imgData[i+2] * (1+y);
            //normalize over- and under-saturated values
            if(imgData[i] > 255) imgData[i] = 255;
            if(imgData[i+1] > 255) imgData[i] = 255;
            if(imgData[i+2] > 255) imgData[i] = 255;
            if(imgData[i] < 0) imgData[i] = 0;
            if(imgData[i+1] < 0) imgData[i] = 0;
            if(imgData[i+2] < 0) imgData[i] = 0;
        }
    }


/* FILTROS*/ 
document.getElementById('filtros').addEventListener('change', function() {
    if(this.value == "brillo"){        
        ctx.drawImage(canvas, 0, 0);
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // invert colors
        let i;
        for (i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255 + imgData.data[i];
            imgData.data[i+1] = 255 + imgData.data[i+1];
            imgData.data[i+2] = 255 + imgData.data[i+2];
            imgData.data[i+3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
    } 
    if(this.value == "sobel"){
        filterSobel();
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
        var px = imgData.data;
        var tmpPx = new Uint8ClampedArray(px.length);

        for (var i = 0, len = px.length; i < len; i++) {
            tmpPx[i] = px[i]
        }
        
        for (var i = 0, len = px.length; i < len; i++) {
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
});
