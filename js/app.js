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
        precioStyle[0] = '100px';
        precioStyle[1] = '50px';
        precioStyle[2] = `white`
        let x4 = new BoxStyleX( ...precioStyle);
        producto ('190','250', `${this.id}_precio`, x4, `${this.thousands_separators( this.precio[0])}${this.precio[1]}`, 'precio', `${this.id}`);
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
    thousands_separators(num){
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return num_parts.join(" ");
    }

    creaVenta (){
        this.boxViaje.setAttribute("style",
            `
            width: 850px;  
            height: 720px; 
            background: white;
            position: absolute;
            top: 0px; left: 25px;
            border: 1px solid red;
            z-index: 524;
            `
       )
       this.creaCloseWin();
       this.creaVentaSlid();
       this.creaVentaText();
       this.creaVentaPrecio();
    }
    creaCloseWin(){
        let ventClose = this.boxViaje.appendChild(document.createElement('span'))
        ventClose.setAttribute("style", `
            position: absolute; right: 2px; top: 0px;
            cursor: pointer; `)
        ventClose.id = 'closeWin';
        ventClose.innerText = '[x]';
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
        const ventText = this.boxViaje.appendChild(document.createElement('div'))
        ventText.id = `${this.idVenta}_text`
        ventText.setAttribute("style",
            `   width: 800px;  
                height: 60px; 
                line-height: 30px;
                position: absolute ;left: 25px; top: 470px;  `)
       ventText.innerHTML += (`<p style="position: absolute">${this.descripcionVenta}</p>`)
       const ventTextRest = this.boxViaje.appendChild(document.createElement('div'))
       ventTextRest.id = `${this.idVenta}_text2`
       ventTextRest.setAttribute("style",
           `   width: 600px;  
               height: 200px; 
               line-height: 30px;
               position: absolute ;left: 25px; top: 570px;  `)
        ventTextRest.innerHTML += (`
        <table>
        <tr>
            <td>Fecha de viaje:</td>
            <td style= "padding-left: 25px;">${this.fechaViaje}</td>
        </tr>
        <tr>
            <td>Periodo de preparacion:</td>
            <td style= "padding-left: 25px;">${this.periodoPreparacion}</td>
        </tr>
        <tr>
            <td>Puerto Espacial:</td>
            <td style= "padding-left: 25px;">${this.puertoSalida}</td>
        </tr>
    </table>
        `);
    }

    creaVentaPrecio (){
    let ventPrecio = this.boxViaje.appendChild(document.createElement('div'));
       ventPrecio.id = `${this.idVenta}_precio`;
    function thousands_separators(num){
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return num_parts.join(" ");
      }

       ventPrecio.setAttribute("style",
           `   width: 300px;  
               height: 200px; 
               line-height: 30px;
               position: absolute ;
               left: 480px; top: 600px;  `)
        ventPrecio.innerHTML = (`     
        <form id="cant_1">
        <label for="cant">Personas:</label>
        <select name="cant" id="cant" required>
        <option selected>1</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        </select>
        <p id="precio">Precio: <span id="PrecioCalc">${thousands_separators(this.precio[0])}</span>€<span id="PrecioUn" style="visibility: hidden;">${this.precio[0]}</span></p>
        <input id="lop" type="button" value="Submit">
        </form>  `)

        document.getElementById("cant").onchange = function() {
            let prec = document.getElementById("cant").value * parseInt(document.getElementById("PrecioUn").textContent);
            document.getElementById("PrecioCalc").innerText = thousands_separators(prec);
        };
     }
}

const text1 = ["<h3> Viaje al espacio</h3><p style='padding-top: 10px;'>China</p>",
            ["15000","€ /pers"], ['img/iss1.png','img/iss2.png','img/iss3.png'],
            "El 12 de abril de 1961 se lanzó la nave espacial Vostok 3KA-3 (Vostok 1) desde el \
            Cosmódromo de Baikonur con Yuri Gagarin a bordo, el primer humano en viajar al espacio.",
            '14 - 20 agosto 2021', '1 semanas', 'Centro de Lanzamiento de Wenchang ' ]
const text2 = ["<h3>International Space Station</h3><p style='padding-top: 10px;'>Federación de Rusia</p>",
            ["54000","€ /pers"], ['img/iss1.png','img/iss2.png','img/iss3.png'],
            "El 30 de abril de 2001, el millonario estadounidense Dennis Tito llegó a la Estación Espacial Internacional \
            (EEI) a través de un cohete ruso Soyuz, convirtiéndose en el primer turista espacial del mundo.",
            '21 - 28 octubre 2021', '2 semanas', 'Байконур' ]
const text3 = ["<h3>Voyager Station</h3><p style='padding-top: 10px;'>Estados Unidos</p>",
            ["152000","€ /pers"], ['img/spacecraft1.png','img/spacecraft2.png','img//spacecraft3.png'],
            "We're trying to make the public realize that this golden age of space travel is just around the \
            corner. It's coming. It's coming fast. Una experiencia de gran lujo y exclusiva a los primeros 400 huéspedes que disfruten su estancia.", 
            '1 - 10 agosto 2025', '2 semanas', 'Blue Origin' ]
const text4 = ["<h3>Luna</h3><p style='padding-top: 10px;'>Estados Unidos</p>",
            ["91000","€ /pers"], ['img/moon1.png','img/moon2.png','img/moon3.png'],
            "Apolo 11 fue una misión espacial tripulada de Estados Unidos.El comandante Armstrong fue el primer ser humano que pisó la superficie del \
            satélite terrestre el 21 de julio de 1969 al sur del Mar de la Tranquilidad, seis horas y media después de haber alunizado.",
            '15 - 27 febrero 2022', '2 semanas', 'NASA' ]
const text5 = ["<h3>Marte</h3><p style='padding-top: 10px;'>Estados Unidos</p>",
            ["220000","€ /pers"], ['img/mars1.png','img/mars2.png','img/mars3.png'],
            "El primer estudio técnico detallado de un viaje a Marte fue de Wernher von Braun, quien publicó El Proyecto Marte en el año 1952. La idea era \
            enviar una flota de diez naves con 70 tripulantes cada una, que llevarían tres aeronaves con alas que aterrizarían en Marte tal cual un avión comercial",
            '27 diciembre 2022', '1 año', 'SpaceX' ]    
const text6 = ["<h3>Titulo</h3><p style='padding-top: 10px;'>Unión Europea</p>",
            ["50000","€ /pers"], ['img/iss1.png','img/iss2.png','img/iss3.png'],
            "",
            '27 mayo 2022', '1 año', 'European Space Agency' ]         
// constructor( id, imag, descripcion, precio, posicionX, posicionY, sliders = '',descripcionVenta = '',
//      fechaViaje = '',periodoPreparacion = '',puertoSalida = '',ventaFinal = '')
const box1 = new BoxPaginaPrincipal('nuevo1', 'img/tierra.jpg', text1[0], text1[1], 25, 50,text1[2], text1[3], text1[4], text1[5], text1[6]);
const box2 = new BoxPaginaPrincipal('nuevo2', 'img/iss.png', text2[0], text2[1], 350, 50,text2[2], text2[3], text2[4], text2[5], text2[6]);
const box3 = new BoxPaginaPrincipal('nuevo3', 'img/spacecraft.png', text3[0], text3[1], 675, 50,text3[2], text3[3], text3[4], text3[5], text3[6]);
const box4 = new BoxPaginaPrincipal('nuevo4', 'img/moon.png', text4[0], text4[1], 25, 400,text4[2], text4[3], text4[4], text4[5], text4[6]);
const box5 = new BoxPaginaPrincipal('nuevo5', 'img/mars.png', text5[0], text5[1], 350, 400,text5[2], text5[3], text5[4], text5[5], text5[6]);
const box6 = new BoxPaginaPrincipal('nuevo6', 'img/tierra.jpg', text6[0], text6[1], 675, 400,text6[2], text6[3], text6[4], text6[5], text6[6]);

let VentanaAbierta = false;

function deleteVentana(){
    let v_x =  document.querySelector('#viaje');
    if(v_x !== null){
       while (v_x.hasChildNodes()){
           v_x.removeChild(v_x.lastChild);
       }
    v_x.setAttribute("style", 'visibility: hidden')   
   }
   VentanaAbierta = false;
}
function viaje (box){
    VentanaAbierta = true
    document.getElementById('closeWin').addEventListener ('click' , deleteVentana)
    const button = document.querySelector('#lop');
    button.addEventListener('click', function(){
    console.log(`Cantidad: ${document.forms.cant_1[0].value}, precio: ${box.precio},descripcion: ${box.descripcion} `)
    deleteVentana();
    });
}

document.getElementById(box1.id).addEventListener ('click' , viaje1)
document.getElementById(box2.id).addEventListener ('click' , viaje2)
document.getElementById(box3.id).addEventListener ('click' , viaje3) 
document.getElementById(box4.id).addEventListener ('click' , viaje4) 
document.getElementById(box5.id).addEventListener ('click' , viaje5) 
document.getElementById(box6.id).addEventListener ('click' , viaje6) 

async function viaje1 (){ if (VentanaAbierta){await deleteVentana();}; await box1.creaVenta(); viaje(box1); }
async function viaje2 (){ if (VentanaAbierta){await deleteVentana();}; await box2.creaVenta(); viaje(box2); }
async function viaje3 (){ if (VentanaAbierta){await deleteVentana();}; await box3.creaVenta(); viaje(box3); }
async function viaje4 (){ if (VentanaAbierta){await deleteVentana();}; await box4.creaVenta(); viaje(box4); }
async function viaje5 (){ if (VentanaAbierta){await deleteVentana();}; await box5.creaVenta(); viaje(box5); }
async function viaje6 (){ if (VentanaAbierta){await deleteVentana();}; await box6.creaVenta(); viaje(box6); }


});    
