document.addEventListener("DOMContentLoaded",()=>{
    let canvas = document.querySelector("#canvas");
    let ctx = canvas.getContext("2d");


/* BOTONES
CARGAR IMAGEN:
La funcion se llama cuando se seleciona un archivo.
Creamos un variable que se asigna a un metodo javascript Image.
Si la imagen esta corectamente cargar llama la funcion draw, asignada con la imagen
en caso contrario a la funcion failed.
La funcion failed se encarga de mostrar un mensaje de error 
 */

document.getElementById('select_image').onchange = function(e) {
    var img = new Image();
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
    var xhr = new XMLHttpRequest();
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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


/* FILTROS*/ 
document.getElementById('filtros').addEventListener('change', function() {
    if(this.value == "brillo"){
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(canvas, 0, 0);
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // invert colors
        var i;
        for (i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255 + imgData.data[i];
            imgData.data[i+1] = 255 + imgData.data[i+1];
            imgData.data[i+2] = 255 + imgData.data[i+2];
            imgData.data[i+3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
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
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(canvas, 0, 0);
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

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
