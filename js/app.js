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
    '300px',        //width
    '300px',        //height
    'white',        //background: bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;
    'left',         //text_align
    '0px' ,         //padding
    'normal normal 400 16px Arial, Helvetica, sans-serif', //font
    'black',        //color
    '0px',          //margin
    '0px solid white' //border
];

// creacion de objeto BoxStyleX para clase articulo
class BoxPaginaPrincipal {
    constructor( id, imag, descripcion, precio, posicionX, posicionY){
        this.id = id;
        this.imag = imag;
        this.descripcion = descripcion;
        this.precio = precio;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.crea();
 
    }

    createSubBox(){
        let x1 = new BoxStyleX( ...ArticuloStyle);
        producto(this.posicionX, this.posicionY, `${this.id}`, x1, '');
    }
    createImageBox(){
        let ImagenStyle = ArticuloStyle;
        ImagenStyle[0] = '100%';
        ImagenStyle[1] = '67%';
        ImagenStyle[2] = `no-repeat url("${this.imag}")`
        let x2 = new BoxStyleX( ...ImagenStyle);
        producto (0,0, `${this.id}_img`, x2,  '', 'image', `${this.id}`);
    }
    createDescription(){
        let ImagenStyle = ArticuloStyle;
        ImagenStyle[0] = '200';
        ImagenStyle[1] = '80';
        ImagenStyle[2] = `white`
        let x3 = new BoxStyleX( ...ImagenStyle);
        producto ('25','220', `${this.id}_msg`, x3,`${this.descripcion}`, 'msg', `${this.id}`);
    }
    createPrecio(){
        let ImagenStyle = ArticuloStyle;
        ImagenStyle[0] = '90px';
        ImagenStyle[1] = '50px';
        ImagenStyle[2] = `white`
        let x4 = new BoxStyleX( ...ImagenStyle);
        producto ('200','250', `${this.id}_precio`, x4, `${this.precio}`, 'precio', `${this.id}`);
    }
    async crea(){
        await this.createSubBox();
        this.createImageBox();
        this.createDescription();
        this.createPrecio();
    }
}

let box1 = new BoxPaginaPrincipal('nuevo', 'img/tierra.jpg', '<h3>titel</h3><p>dlafjlsdfjlasl</p>', '50 000', 400, 400)



});    
