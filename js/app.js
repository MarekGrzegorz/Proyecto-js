// Esperar a que el Dom este listo 
document.addEventListener("DOMContentLoaded", function () {  
    console.log("DOM is loaded");

// objeto con css predeterminado para elemento HTML
function BoxStyleX (
    width = '100px', 
    height = '100px',
    background = 'white',
    text_align = 'left',
    padding = '0px' ,
    font = 'normal normal 400 16px Arial, Helvetica, sans-serif',
    color = 'black',
    margin = '0px',
    border = '0px'
) {
    this.width = width;
    this.height = height;
    this.background = background;
    this.text_align = text_align;
    this.padding = padding;
    this.font = font;
    this.color = color;
    this.margin = margin;
    this.border = border;
    return this;
}

// crea elemento HTML
function producto(posX, posY, id, AttributProducto, msg = '', cls = 'articulo', padreId = 's_1') {
    let newElem = document.createElement("div");
    newElem.className = cls;
    newElem.id = id;
    newElem.innerHTML += msg;
    newElem.setAttribute("style",
        `
        width: ${AttributProducto.width};  
        height: ${AttributProducto.height}; 
        background: ${AttributProducto.background};
        color: ${AttributProducto.color}; 
        position: absolute; 
        top: ${posY}px; left: ${posX}px;
        border: ${AttributProducto.border};
        text-align = ${AttributProducto.text_align} ;
        padding = ${AttributProducto.padding};
        font = ${AttributProducto.font};
        margin = ${AttributProducto.margin};
        `
   );

    let elem = document.querySelector(`#${padreId}`);
    elem.appendChild(newElem);
}

// declaracion de atributos para class = articulo
let ArticuloStyle = [
    '200px',        //width
    '200px',        //height
    'green',        //background: bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;
    'left',         //text_align
    '0px' ,         //padding
    'normal normal 400 16px Arial, Helvetica, sans-serif', //font
    'black',        //color
    '0px',          //margin
    '3px solid red' //border
];
// creacion de objeto BoxStyleX para clase articulo
let x1 = new BoxStyleX( ...ArticuloStyle);

// creacion de objeto BoxStyleX para clase imagen cambiando objeto creado para articulo
let ImagenStyle = ArticuloStyle;
ImagenStyle[0] = '80px';
ImagenStyle[1] = '80px';
ImagenStyle[2] = `lightblue url("../img/fondo.jpg") no-repeat fixed center`
ImagenStyle[8] = `3px solid blue`
let x2 = new BoxStyleX( ...ImagenStyle);

producto(100, 100, id = 'prod1', x1, '<p>text</p>');

let txt1 = `<h1>Visita la Estación Espacial</h1> 
             <p>Más de 200 personas han visitado la Estación Espacial Internacional</p>`
  
producto (20,20, 'subpr1', x2, msg = txt1, cls = 'image', padreId = 'prod1');



});    
