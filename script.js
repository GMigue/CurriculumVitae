//Variables de control
let stackD = [...document.querySelectorAll("div.menu")];
let stackI = [];
let stackDT = [...document.querySelectorAll("div.tit")];
let stackIT = [];
let stackDTT = [...document.querySelectorAll("p.titP")];
let stackITT = [];
let anc = window.innerWidth;
const cerrado = 5;
const abierto = 40;
const aniDuracion = 800;
let estadoTarDer = false;
let estadoTarIzq = false;


//Agrega las posiciones iniciales a la derecha 
stackD.forEach((em, i )=> {
  if(i<6){
    em.style.left = (anc-(cerrado*(i+1)))+"px";
    em.style.zIndex = 7-i;
  }
});

//Divide en grupos
stackI.push(stackD.pop());
stackIT.push(stackDT.pop());
stackITT.push(stackDTT.pop());

//Agrega las posiciones iniciales a la izquierda 
stackI.forEach((em, i )=> {
    em.style.left = (i*5)+"px";
});

//Funcion de animacion
function animate({duration, draw, timing}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      let progress = timing(timeFraction)
  
      draw(progress);
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
}

//Funcion evento pasar mouse tarjetas Derecha
function EventoMouseOverDer (event){
  try {
    let band = true;
    for (let index = 0; index < stackD.length; index++) {
      if (event.relatedTarget.id == stackD[index].id || event.relatedTarget.id == stackDT[index].id || event.relatedTarget.id == stackDTT[index].id) {
        band = false;
      }
    }

    if(band && estadoTarDer == false){
      AbreDerecha();
    }
  } catch (e) {
    if (e instanceof TypeError) {
    } else{
      console.error(e.name + ': ' + e.message)
    }
  } 
}

//Animacion de abrir tarjetas Derecha
function AbreDerecha() {
  let posAct = [];
  let pixAgr = [];

  stackD.forEach((em, i)=> {
    posAct.push(parseInt(em.style.left.slice(0, -2)));
  });
  
  posAct.forEach((em, i)=> {
    pixAgr.push(em - (anc-(abierto*(i+1))));
  });

  animate({
    duration: aniDuracion,
    timing: function(timeFraction) {
      return timeFraction;
    },
    draw: function(progress) {
      stackD.forEach((em, i)=> {
        em.style.left = ((posAct[i])-(progress*(pixAgr[i])) ) + 'px';
      });
    }
  });
  estadoTarDer = true;
}

//Funcion evento quitar mouse tarjetas Derecha
function EventoMouseOutDer (event){
  try {
    let band = true;
    for (let index = 0; index < stackD.length; index++) {
      if (event.relatedTarget.id == stackD[index].id || event.relatedTarget.id == stackDT[index].id || event.relatedTarget.id == stackDTT[index].id) {
        band = false;
      }
    }
  
    if(band && estadoTarDer == true){
      CierraDerecha();
    }
  } catch (e) {
    if (e instanceof TypeError) {
    } else{
      console.error(e.name + ': ' + e.message)
    }
  }
  
  
}

//Anmacion cerrar tarjetas Izquierda
function CierraDerecha() {
  let posAct = [];
  let pixAgr = [];

  stackD.forEach((em)=> {
    posAct.push(parseInt(em.style.left.slice(0, -2)));
  });

  posAct.forEach((em, i)=> {
    pixAgr.push((anc-(cerrado*(i+1)))-em);
  });

  animate({
    duration: aniDuracion,
    timing: function(timeFraction) {
      return timeFraction;
    },
    draw: function(progress) {   
      stackD.forEach((em, i)=> {
        em.style.left = ((posAct[i]) + (progress*pixAgr[i])) + 'px';
      });
    }
  });
  estadoTarDer = false;
}

//Funcion evento pasar mouse tarjetas Izquierda
function EventoMouseOverIzq (event){
  try {
    let band = true;
    for (let index = 0; index < stackI.length-1; index++) {
      if (event.relatedTarget.id == stackI[index].id || event.relatedTarget.id == stackIT[index].id || event.relatedTarget.id == stackITT[index].id) {
        band = false;
      }
    }
  
    if(band && estadoTarIzq == false){
      AbreIzquierda();
    }
  } catch (e) {
    if (e instanceof TypeError) {
    } else{
      console.error(e.name + ': ' + e.message)
    }
  } 
}

//Animacion de abrir tarjetas Izquierda
function AbreIzquierda() {
  let posAct = [];
  let pixAgr = [];

  stackI.forEach((em, i)=> {
    posAct.push(parseInt(em.style.left.slice(0, -2)));
  });
  
  posAct.forEach((em, i)=> {
    pixAgr.push((abierto*i)-em);
  });

  animate({
    duration: aniDuracion,
    timing: function(timeFraction) {
      return timeFraction;
    },
    draw: function(progress) {
      stackI.forEach((em, i)=> {
        em.style.left = ((posAct[i])+(progress*(pixAgr[i])) ) + 'px';
      });
    }
  });
  estadoTarIzq = true;
}

//Funcion evento quitar mouse tarjetas Izquierda
function EventoMouseOutIzq (event){
  try {
    let band = true;
    for (let index = 0; index < stackI.length-1; index++) {
      if (event.relatedTarget.id == stackI[index].id || event.relatedTarget.id == stackIT[index].id || event.relatedTarget.id == stackITT[index].id) {
        band = false;
      }
    }
  
    if(band && estadoTarIzq == true){
      CierraIzquierda();
    }
  } catch (e) {
    if (e instanceof TypeError) {
    } else{
      console.error(e.name + ': ' + e.message)
    }
  }
  
  
}

//Anmacion cerrar tarjetas Izquierda
function CierraIzquierda() {
  let posAct = [];
  let pixAgr = [];

  stackI.forEach((em)=> {
    posAct.push(parseInt(em.style.left.slice(0, -2)));
  });

  posAct.forEach((em, i)=> {
    pixAgr.push(em - (cerrado*i));
  });

  animate({
    duration: aniDuracion,
    timing: function(timeFraction) {
      return timeFraction;
    },
    draw: function(progress) {   
      stackI.forEach((em, i)=> {
        em.style.left = ((posAct[i]) - (progress*pixAgr[i])) + 'px';
      });
    }
  });
  estadoTarIzq = false;
}

//Funcion click trajetas Derechas
function DClick(event) {
  let posAct = []; //Posiciones actuales de los elem quitar 
  let pixQui = []; //Pixeles a quitar para anim
  
  EliminaEventos();

  //Cambia elem del satack derecho al izquierdo 
  let band = true;
  let aux, auxT, auxTT;
  while (band) {
    aux = stackD.pop();
    stackI.push(aux);
    auxT = stackDT.pop();
    stackIT.push(auxT);
    auxTT = stackDTT.pop();
    stackITT.push(auxTT);
    if(aux.id == event.target.id || auxT.id == event.target.id || auxTT.id == event.target.id)
      band = false;
  };

  AgregaEvento();

  //Almacena posiciones de elem quitados 
  stackI.forEach((em)=> {
    posAct.push(parseInt(em.style.left.slice(0, -2)));
  });

  posAct.forEach((em, i)=> {
    pixQui.push(em - (i*5));
  });

  //Animacion de transpaso 
  animate({
    duration: aniDuracion,
    timing: function(timeFraction) {
      return Math.pow(timeFraction, 2);
    },
    draw: function(progress) {
      stackI.forEach((em, i)=> {
        em.style.left = ((posAct[i])-(progress*pixQui[i]) ) + 'px';
      });
    }
  });

  CierraDerecha();
}

//Funcion click trajetas Izquierda
function IClick(event) {
  let posAct = []; //Posiciones actuales de los elem quitar 
  let pixQui = []; //Pixeles a quitar para anim
  
  EliminaEventos();

  //Cambia elem del satack izquierdo al derecho 
  let band = true;
  while (band) {
    let aux = stackI.pop();
    let auxTT = stackITT.pop();
    let auxT = stackIT.pop();
    if(aux.id == event.target.id || auxT.id == event.target.id || auxTT.id == event.target.id){
      band = false;
      stackI.push(aux);
      stackIT.push(auxT);
      stackITT.push(auxTT);
    }
    else{
      stackD.push(aux);
      stackDT.push(auxT);
      stackDTT.push(auxTT);
    }
  };

  AgregaEvento();

  //Almacena posiciones de elem quitados 
  stackD.forEach((em)=> {
    posAct.push(parseInt(em.style.left.slice(0, -2)));
  });

  //Posiciones finales despues de la animación
  posAct.forEach((em, i)=> {
    pixQui.push((anc-(cerrado*(i+1)))-em);
  });

  //Animacion de transpaso 
  animate({
    duration: aniDuracion,
    timing: function(timeFraction) {
      return Math.pow(timeFraction, 2);
    },
    draw: function(progress) {
      stackD.forEach((em, i)=> {
        em.style.left = ((posAct[i])+(progress*pixQui[i]) ) + 'px';
      });
    }
  });

  CierraIzquierda();
}

//Funcion agrega eventos
function AgregaEvento() {
  //Agregamos eventos
  stackD.forEach((em)=> {
    em.addEventListener("mouseover", EventoMouseOverDer);
    em.addEventListener("mouseout", EventoMouseOutDer);
    em.addEventListener("click", DClick);
  });
  stackI.forEach((em, i)=> {
    if(i != stackI.length-1){
      em.addEventListener("mouseover", EventoMouseOverIzq);
      em.addEventListener("mouseout", EventoMouseOutIzq);
      em.addEventListener("click", IClick);
    }
    
  });
}

//Funcion elimina eventos
function EliminaEventos() {
  //Quitamos eventos 
  stackD.forEach((em)=> {
    em.removeEventListener("mouseover", EventoMouseOverDer);
    em.removeEventListener("mouseout", EventoMouseOutDer);
    em.removeEventListener("click", DClick);
  });

  stackI.forEach((em)=> {
    em.removeEventListener("mouseover", EventoMouseOverIzq);
    em.removeEventListener("mouseout", EventoMouseOutIzq);
    em.removeEventListener("click", IClick);
  });
}

//Funcion para rejuastar pagina
function ResizeW() {
  anc = window.innerWidth;
  CierraDerecha();
  CierraIzquierda();
}

window.onresize = ResizeW;
AgregaEvento();


//PERFIL

let ancho = window.innerWidth ;
let largo = window.innerHeight;

let pos1 = [];
let tamañoImg = ancho*0.4;
let axisY=0;

//Ajusta tamaños a cuadrado
tamañoImg > largo ? tamañoImg = largo -35 : tamañoImg = ancho * 0.4;

//Arreglo para circulos
for (let index = 0; index < Math.round(tamañoImg/10); index++) {
    pos1.push(new Array(Math.round(tamañoImg/10)).fill(index));

}

//Tamaño de letra
let letra12 = Math.round(tamañoImg/12);
let letra16 = Math.round(tamañoImg/16);
let letra20 = Math.round(tamañoImg/20);

axisY = (largo-tamañoImg)/3;

//Selecciona contenedor
let imgPPerfil = d3.select('#P6');

//Crea DIV y SVG para imagen de perfil
let imgP = imgPPerfil.append("div")
    .attr('id', 'DImg')
    .style('position', 'absolute')
    .style('right', '55%')
    .style('width', tamañoImg)
    .style('height', largo)
    .append("svg")
    .attr('id', "imgPSVG")
    .attr('width', tamañoImg)
    .attr('height', largo)
    
//Cra fondo imagen 
imgP.append("rect")
    .attr('x', 25)
    .attr('y', axisY)
    .attr('width', tamañoImg)
    .attr('height', tamañoImg)
    .style('fill', '#4eb3d3')
    
//Crea circulos fondo
let g = imgP.selectAll("g")
    .data(pos1).enter()
    .append("g")

    g.selectAll("circle")
    .data(function (d, i) {
        return d;
    })
    .enter()
    .append("circle")
    .attr("cx", function(d, i) {
        return (26+(d%2)*5)+i*10;
    })
    .attr("cy", function(d, i) {
        return axisY+1+d*10;
    })
    .attr("r", 1)
    .attr('fill', "gray") 

//Carga imagen 
imgP.append("svg:image")
    .attr('x', 25)
    .attr('y', axisY)
    .attr('width',  tamañoImg)
    .attr('height', tamañoImg)
    .attr("xlink:href", "my.png")

//DIV titulo
let divPTitulo = imgPPerfil.append("div")
    .attr('id', "pd")
    .style('background-color', "white")
    .style('border', "3px solid gray")
    .style('max-width', '50%')
    //.style('height', '30%')
    .style('display', 'inline-block')
    .style('position', 'absolute')
    .style('bottom', '50%')
    .style('left', '42%')
//Texto nombre
let pNombre = divPTitulo.append("p")
    .style('margin-block', "10px 10px")
    .style('margin-inline', "20px 20px")
    .style("font-family", "Montserrat-Bold")
    .style('font-size', letra12+"px")
    .text("MIGUEL ANGEL GARCIA BENITEZ")
//Texto profesion 
let pProfesion = divPTitulo.append("p")
    .style('margin-block', "10px 10px")
    .style('margin-inline', "20px 20px")
    .style("font-family", "Montserrat")
    .style('font-size', letra16+"px")
    .text("LICENCIADO EN CIENCIAS DE LA COMPUTACIÓN")

//DIV Texto perfil 
let divPTituloexto = imgPPerfil.append("div")
    .attr('id', "textoPerfil")
    .style('max-width', '50%')
    .style('position', 'absolute')
    .style('top', '50%')
    .style('left', '45%')
//Titulo perfil
let pTituloP = divPTituloexto.append("p")
    .style('margin-block', "10px 10px")
    .style('margin-inline', "20px 20px")
    .style("font-family", "Gilroy")
    .style('font-size', letra16+"px")
    .text("PERFIL")

//Texto perfil
let pTextoP = divPTituloexto.append("p")
    .style('margin-block', "10px 10px")
    .style('margin-inline', "20px 20px")
    .style("font-family", "Montserrat")
    .style('font-size', letra20+"px")
    .text("Licenciado en Ciencias de la Computación con amplios conocimientos en análisis de datos con Python y R; bases de datos en SQL; servidores en Linux; aplicaciones móviles con Flutter y aplicaciones web.")

divPTitulo.append("div")
    .attr('id', "C1")
    .style('background-color', "white")
    .style('border', "3px solid gray")
    .style('width', '12px')
    .style('height', '12px')
    .style('position', 'absolute')
    .style('top', '-8px')
    .style('left', "-9px")
divPTitulo.append("div")
    .attr('id', "C2")
    .style('background-color', "white")
    .style('border', "3px solid gray")
    .style('width', '12px')
    .style('height', '12px')
    .style('position', 'absolute')
    .style('top', '-8px')
    .style('right', "-9px")
divPTitulo.append("div")
    .attr('id', "C3")
    .style('background-color', "white")
    .style('border', "3px solid gray")
    .style('width', '12px')
    .style('height', '12px')
    .style('position', 'absolute')
    .style('bottom', '-8px')
    .style('left', "-9px")
divPTitulo.append("div")
    .attr('id', "C4")
    .style('background-color', "white")
    .style('border', "3px solid gray")
    .style('width', '12px')
    .style('height', '12px')
    .style('position', 'absolute')
    .style('bottom', '-8px')
    .style('right', "-9px")


//Competencias
d3.selectAll('.CMT')
    .style('margin-block', "10px 0px")
    .style('margin-inline', "20px 20px")
    .style("font-family", "Gilroy")
    .style('font-size', letra16+"px")
d3.selectAll('.CMTX')
    .style('margin-block', "10px 0px")
    .style('margin-inline', "20px 20px")
    .style("font-family", "Montserrat")
    .style('font-size', letra20+"px")

d3.selectAll('.Comp')
    .style('display', 'grid')
    .style('grid-template-columns', '1fr 1fr')
    .style('justify-items', 'start')
    .style('gap', '15%')
    .style('align-items', 'center')
    .style('margin-block', '10px')

let habC = [];
for (let index = 0; index < 9; index++) {
  habC.push((letra20))
}

d3.selectAll('.CMCDC')
    .append('svg')
    .attr('height', (letra20)+'px')
    .attr('width', ((letra20)*9)+'px')
    .selectAll("rect")
    .data(habC)
    .enter().append("rect")
    .attr("x", function(d, i) {
      console.log(this);
      return d*i;
  })
    .attr("y", 0)
    .attr("width", function(d, i) {
      return d;
  })
    .attr("height", function(d, i) {
      return d;
  })
    .attr('fill', "gray") 
    .attr('fill-opacity', function(d, i) {
      if((i%2)==0){
        return 1;
      }
      else{
        return 0;
      }
  }) 

        
//EXP/EDU
let letra26 = Math.round(tamañoImg/26);
let letra24 = Math.round(tamañoImg/24);
let letra22 = Math.round(tamañoImg/22);
let letra28 = Math.round(tamañoImg/28);


d3.selectAll('.EEUL')
    .style("font-family", "Montserrat-Bold")
    .style('font-size', letra16+"px")
d3.selectAll('.EET')
    .style('margin-block', "10px 0px")
    .style('margin-inline', "20px 20px")
    .style("font-family", "Gilroy")
    .style('font-size', letra16+"px")
d3.selectAll('.EEPG')
    .style('margin-block', "10px 0px")
    .style('margin-inline', "0px 0px")
    .style("font-family", "Montserrat-Bold")
    .style('font-size', letra22+"px")
d3.selectAll('.EEE')
    .style('margin-block', "0px 0px")
    .style('margin-inline', "0px 0px")
    .style("font-family", "Montserrat-Bold")
    .style('font-size', letra24+"px")
d3.selectAll('.EEA')
    .style('margin-block', "0px 0px")
    .style('margin-inline', "0px 0px")
    .style("font-family", "Montserrat-Bold")
    .style('font-size', letra26+"px")
d3.selectAll('.EETX')
    .style('margin-block', "0px 0px")
    .style('margin-inline', "0px 0px")
    .style("font-family", "Montserrat")
    .style('font-size', letra26+"px")
    .style('text-align', 'justify')
d3.selectAll('.EEAEN')
    .style('margin-block', "0px 0px")
    .style('margin-inline', "0px 0px")
    .style("font-family", "Montserrat")
    .style('font-size', letra24+"px")

//Portafolio

d3.selectAll('.PTP')
    .style('margin-block', "10px 0px")
    .style('margin-inline', "0px 0px")
    .style("font-family", "Montserrat-Bold")
    .style('font-size', letra28+"px")
    .style('text-align', 'center')