/* CARGAR IMAGEN:
La funcion se llama cuando se seleciona un archivo.
Creamos un variable que se asigna a un metodo javascript Image.
Si la imagen esta corectamente cargar llama la funcion draw, asignada con la imagen
en caso contrario a la funcion failed.
 */

document.getElementById('select_image').onchange = function(e) {
    var img = new Image();
    var canvas = document.getElementById('canvas');
    img.width = canvas.width
    img.height = canvas.height
    img.onload = draw;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
};

/*
La funcion draw se encarga de selecionar el canvas, adaptar el ancho y el alto, 
*/

function draw() {
var canvas = document.getElementById('canvas');
// // set size proportional to image
// canvas.height = canvas.width * (img.height / img.width);

// // step 1 - resize to 50%
// var oc = document.createElement('canvas'),
//     octx = oc.getContext('2d');

// oc.width = img.width * 0.5;
// oc.height = img.height * 0.5;
// octx.drawImage(img, 0, 0, oc.width, oc.height);

// // step 2
// octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

// // step 3, resize to final size
// ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
// 0, 0, canvas.width, canvas.height);
var ctx = canvas.getContext('2d');
ctx.drawImage(this, 0,0);
}

/*
La funcion failed se encarga de mostrar un mensaje de error 
*/
function failed() {
document.getElementById("error").innerHTML = "El archivo selecionado no se puede cargar"
}


/* 
Selecionamos el boton, le agregamos el event 'click'
Convertimos el canvas en una imagen
Creamos una variable que representa el canvas
Creamos otra variable para dar una url al canvas
Llamamos a la funcion de descarga con los parametros de la url y un titulo para la imagen */

document.querySelector('#btn-save').addEventListener("click", function(e) {
    var canvas = document.querySelector('#canvas');
    var dataURL = canvas.toDataURL("image/jpeg", 1.0);

    downloadImage(dataURL, 'my-canvas.jpeg');
});

function downloadImage(data, filename = 'untitled.jpeg') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}

/*
Selecionamos el boton, le agregamos el event 'click'
Selecionamos el canvas
usamos la funcion clearReact para dibujar un nuevo canvas, que en este caso sera vacio
*/
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

