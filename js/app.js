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
    sliders = '';
    descripcionVenta = this.descripcion;
    terminoViaje = '';
    periodoPreparacion = '';
    puertoSalida = '';
    ventaFinal = '';
    clicked() {
        let Elem = document.createElement("div");
        Elem.id = 'vent1';
    
        Elem.setAttribute("style",
            `
            width: 850px;  
            height: 850px; 
            background: green;
            position: absolute; 
            top: 40px; left: 25px;
            border: 1px solid red;
            z-index: 524;
            `
       );
    
       let ele = document.querySelector(`#s_1`);
       ele.appendChild(Elem);
    }
  
    constructor( id, imag, descripcion, precio, posicionX, posicionY, slid ,descripcionVenta = '',
     fechaViaje = '',periodoPreparacion = '',puertoSalida = '',ventaFinal = ''){
    // ventana pagina principal
        this.boxViaje = document.querySelector('#viaje');
        this.id = id;
        this.imag = imag;
        this.descripcion = descripcion;
        this.precio = precio;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.creaVentana();
     // ventana venta
        this.sliders = slid;
        this.descripcionVenta = descripcionVenta;
        this.fechaViaje = fechaViaje;
        this.periodoPreparacion = periodoPreparacion;
        this.puertoSalida = puertoSalida;
        this.ventaFinal = ventaFinal;
    }

    // ventana principal
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
        let desStyle = ArticuloStyle;
        desStyle[0] = '200';
        desStyle[1] = '80';
        desStyle[2] = `white`
        let x3 = new BoxStyleX( ...desStyle);
        producto ('25','220', `${this.id}_msg`, x3,`${this.descripcion}`, 'msg', `${this.id}`);
    }
    createPrecio(){
        let precioStyle = ArticuloStyle;
        precioStyle[0] = '90px';
        precioStyle[1] = '50px';
        precioStyle[2] = `white`
        let x4 = new BoxStyleX( ...precioStyle);
        producto ('200','250', `${this.id}_precio`, x4, `${this.precio}`, 'precio', `${this.id}`);
    }
    async creaVentana(){
        await this.createSubBox();
        await this.createImageBox();
        await this.createDescription();
        await this.createPrecio();
    }
    // ventana de venta ---------------------------
     set setSliders (slider){ this.sliders = slider;  }
     set setTerminoViaje (tv){ this.terminoViaje = tv; }
     set setPeriodoPreparacion (pP) { this.periodoPreparacion = pP; }
     set setPuertoSalida (puerto) { this.puertoSalida = puerto; }
     set setDescVenta (msgVenta){  this.descripcionVenta = msgVenta; } 
     get getVentaFinal (){ return this.ventaFinal; }
     get getSliders () {return this.sliders; }

//-------ventana de venta metodos -----------------------

    creaVenta (){
        this.boxViaje.setAttribute("style",
            `
            width: 850px;  
            height: 700px; 
            background: white;
            position: absolute;
            top: 0px; left: 25px;
            border: 1px solid red;
            z-index: 524;
            `
       )
       this.creaVentaSlid();
       this.creaVentaText();
       this.creaVentaPrecio();
    }
    creaVentaSlid (){
       let ventSlid = this.boxViaje.appendChild(document.createElement('div'))
       ventSlid.setAttribute("style",
           `
               width: 800px;  
               height: 450px; 
               position: relative;left: 25px;
               background-image: url('${this.sliders[0]}'),
               url('${this.sliders[1]}'),
               url('${this.sliders[2]}');
               background-repeat: no-repeat;
               animation: videoBox 30s infinite alternate;      
               `)
    }
    creaVentaText (){
        let ventText = this.boxViaje.appendChild(document.createElement('div'))
       ventText.id = `${this.idVenta}_text`
       ventText.setAttribute("style",
           `   width: 400px;  
               height: 200px; 
               line-height: 30px;
               position: absolute ;left: 25px; top: 500px;  `)
        ventText.innerHTML += (`<p>${this.descripcionVenta}</p>
        <p>Fecha de viaje: ${this.fecha}</p>
        <p>Periodo de preparacion: ${this.periodoPreparacion}</p>
        <p>Puerto Espacial: ${this.puertoSalida}</p>
        `);
    }

    creaVentaPrecio (){
    let ventPrecio = this.boxViaje.appendChild(document.createElement('div'))
       ventPrecio.id = `${this.idVenta}_precio`
       ventPrecio.setAttribute("style",
           `   width: 400px;  
               height: 200px; 
               line-height: 30px;
               position: absolute ;
               left: 425px; top: 500px;  `)
        ventPrecio.innerHTML = (`     
        <form id="cant_1">
        <label for="cant">Cantidad:</label>
        <input id="cant" name="cant" type="number" value="1">
        <input id="lop" type="button" value="Submit">
        </form>  `)
     }

}

// constructor( id, imag, descripcion, precio, posicionX, posicionY, sliders = '',descripcionVenta = '',
//      fechaViaje = '',periodoPreparacion = '',puertoSalida = '',ventaFinal = '')
let text = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, veniam. Odio quae modi sequi corrupti beatae, '
let box1 = new BoxPaginaPrincipal('nuevo1', 'img/tierra.jpg', '<h3>titel</h3><p>dlafjlsdfjlasl</p>', '50 000', 25, 50)
let box2 = new BoxPaginaPrincipal('nuevo2', 'img/iss.png', '<h3>titel</h3><p>dlafjlsdfjlasl</p>', '50 000', 350, 50,['img/iss1.png','img/iss2.png','img/iss3.png'])
let box3 = new BoxPaginaPrincipal('nuevo3', 'img/spacecraft.png', '<h3>titel</h3><p>dlafjlsdfjlasl</p>', '50 000', 675, 50,['img/spacecraft1.png','img/spacecraft2.png','img//spacecraft3.png'],
text, '14 mayo 2023', '4 semanas'  )
let box4 = new BoxPaginaPrincipal('nuevo4', 'img/moon.png', '<h3>titel</h3><p>dlafjlsdfjlasl</p>', '50 000', 25, 400,['img/moon1.png','img/moon2.png','img/moon3.png'])
let box5 = new BoxPaginaPrincipal('nuevo5', 'img/mars.png', '<h3>titel</h3><p>dlafjlsdfjlasl</p>', '50 000', 350, 400,['img/mars1.png','img/mars2.png','img/mars3.png'])
let box6 = new BoxPaginaPrincipal('nuevo6', 'img/tierra.jpg', '<h3>titel</h3><p>dlafjlsdfjlasl</p>', '50 000', 675, 400)

function deleteVentana(){
    let v_x =  document.querySelector('#viaje');

    if(v_x !== null){
       while (v_x.hasChildNodes()){
           v_x.removeChild(v_x.lastChild);
       }
    v_x.setAttribute("style", 'visibility: hidden')   
   }
}

document.getElementById(box1.id).addEventListener ('dblclick' , viaje1)
document.getElementById(box2.id).addEventListener ('dblclick' , viaje2)
document.getElementById(box3.id).addEventListener ('dblclick' , viaje3) 
async function viaje1 (){
    await box1.creaVenta();
    const button = document.querySelector('#lop');
    button.addEventListener('click', function(){
    console.log(`Cantidad: ${document.forms.cant_1[0].value}, precio: ${box1.precio},descripcion: ${box1.descripcion} `)
    deleteVentana();
    });
}
async function viaje2 (){
    await box2.creaVenta();
    const button = document.querySelector('#lop');
    button.addEventListener('click', function(){
    console.log(`Cantidad: ${document.forms.cant_1[0].value}, precio: ${box2.precio},descripcion: ${box2.descripcion} `)
    deleteVentana();
    });
}
async function viaje3 (){
    await box3.creaVenta();
    const button = document.querySelector('#lop');
    button.addEventListener('click', function(){
    console.log(`Cantidad: ${document.forms.cant_1[0].value}, precio: ${box3.precio},descripcion: ${box3.descripcion} `)
    deleteVentana();
    });
}
});    
