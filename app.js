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
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
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
    var canvas = document.querySelector('#canvas');
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

document.querySelector('#btn-new').addEventListener("click", function(e) {
    var canvas = document.querySelector('#canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
})

//OPCIONAL
document.querySelector("#btn-small").addEventListener("click", function(e){
    var canvas = document.querySelector('#canvas');
    canvas.style.width = "30%";
})

document.querySelector("#btn-medium").addEventListener("click", function(e){
    var canvas = document.querySelector('#canvas');
    canvas.style.width = "60%";
})
document.querySelector("#btn-standard").addEventListener("click", function(){
    var canvas = document.querySelector('#canvas');
    canvas.style.width = "100%";
    canvas.style.margin = "0 0"
})



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
    } if(this.value == "negative"){
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(canvas, 0, 0);
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        //negative
        var i;
        for (i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255 - imgData.data[i];
            imgData.data[i+1] = 255 - imgData.data[i+1];
            imgData.data[i+2] = 255 - imgData.data[i+2];
            imgData.data[i+3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
    } if(this.value == "blur"){
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

