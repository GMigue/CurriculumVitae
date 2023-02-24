  //Variables de control
  let stackD = [...document.querySelectorAll("div.menu")];
  let stackI = [];
  let stackDT = [...document.querySelectorAll("div.tit")];
  let stackIT = [];
  let stackDTT = [...document.querySelectorAll("p.titP")];
  let stackITT = [];
  const cerrado = 10;
  const abierto = 40;
  const aniDuracion = 800;
  let estadoTarDer = false;
  let estadoTarIzq = false;
  let tarjetaAnterior = "men6";
  let orientacion = "";
  let coor = [];
  let touchM = true;
  let arrabb = "";
  let touchscroll = false;


  let ancho = window.innerWidth ;
  let largo = window.innerHeight;

  let pos1 = [];

  let enlacesArt = {
    "graficas": "Portafolio/Grafica.html",
    "cluster": "Portafolio/Cluster.html",
    "1bit": "Portafolio/Flutter.html",
    "robota": "Portafolio/Robota.html",
    "banco": "Portafolio/SimulacionBanco.html",
    "servidor": "Portafolio/Servidor.html",
    "arboles": "Portafolio/ARbolesDesicion.html",
    "redneuronal": "Portafolio/RedNeuronal.html"
  }

  const form = document.querySelector("form");
  const nombre = document.getElementById("CFIN");
  const empresa = document.getElementById("CFIE");
  const correo = document.getElementById("CFIC");
  const nombreError = document.getElementById("CFEN");
  const empresaError = document.getElementById("CFEE");
  const correoError = document.getElementById("CFEC");
  const captchaError = document.getElementById("CFERC");
  let captcha = false;


  
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


    if (window.matchMedia("(orientation: landscape)").matches) {
      stackD.forEach((em, i)=> {
        posAct.push(parseInt(em.style.left.slice(0, -2)));
      });
      
      posAct.forEach((em, i)=> {
        pixAgr.push(em - (ancho-(abierto*(i+1))));
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
    }

    if (window.matchMedia("(orientation: portrait)").matches){
      stackD.forEach((em, i)=> {
        posAct.push(parseInt(em.style.top.slice(0, -2)));
      });
      
      posAct.forEach((em, i)=> {
        pixAgr.push(em - (largo-(abierto*(i+1))));
      });
  
      animate({
        duration: aniDuracion,
        timing: function(timeFraction) {
          return timeFraction;
        },
        draw: function(progress) {
          stackD.forEach((em, i)=> {
            em.style.top = ((posAct[i])-(progress*(pixAgr[i])) ) + 'px';
          });
        }
      });
    }
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

    if (window.matchMedia("(orientation: landscape)").matches) {
      stackD.forEach((em)=> {
        posAct.push(parseInt(em.style.left.slice(0, -2)));
      });
  
      posAct.forEach((em, i)=> {
        pixAgr.push((ancho-(cerrado*(i+1)))-em);
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
    }
    if (window.matchMedia("(orientation: portrait)").matches){
      stackD.forEach((em)=> {
        posAct.push(parseInt(em.style.top.slice(0, -2)));
      });
  
      posAct.forEach((em, i)=> {
        pixAgr.push((largo-(cerrado*(i+1)))-em);
      });
  
      animate({
        duration: aniDuracion,
        timing: function(timeFraction) {
          return timeFraction;
        },
        draw: function(progress) {   
          stackD.forEach((em, i)=> {
            em.style.top = ((posAct[i]) + (progress*pixAgr[i])) + 'px';
          });
        }
      });
    }
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

    if (window.matchMedia("(orientation: landscape)").matches) {
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
    }
    if (window.matchMedia("(orientation: portrait)").matches){
      stackI.forEach((em, i)=> {
        posAct.push(parseInt(em.style.top.slice(0, -2)));
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
            em.style.top = ((posAct[i])+(progress*(pixAgr[i])) ) + 'px';
          });
        }
      });
    }
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

    if (window.matchMedia("(orientation: landscape)").matches) {
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
    }
    if (window.matchMedia("(orientation: portrait)").matches){
      stackI.forEach((em)=> {
        posAct.push(parseInt(em.style.top.slice(0, -2)));
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
            em.style.top = ((posAct[i]) - (progress*pixAgr[i])) + 'px';
          });
        }
      });
    }
    estadoTarIzq = false;
  }

  //Funcion click trajetas Derechas
  function DClick(event) {
    let posAct = []; //Posiciones actuales de los elem quitar 
    let pixQui = []; //Pixeles a quitar para anim
    
    EliminaEventos();

    //Cambia elem del stack derecho al izquierdo 
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

    if (window.matchMedia("(orientation: landscape)").matches) {
      //Almacena posiciones de elem quitados 
      stackI.forEach((em)=> {
        posAct.push(parseInt(em.style.left.slice(0, -2)));
      });

      posAct.forEach((em, i)=> {
        pixQui.push(em - (i*cerrado));
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
    }
    if (window.matchMedia("(orientation: portrait)").matches){
      //Almacena posiciones de elem quitados 
      stackI.forEach((em)=> {
        posAct.push(parseInt(em.style.top.slice(0, -2)));
      });

      posAct.forEach((em, i)=> {
        pixQui.push(em - (i*cerrado));
      });

      //Animacion de transpaso 
      animate({
        duration: aniDuracion,
        timing: function(timeFraction) {
          return Math.pow(timeFraction, 2);
        },
        draw: function(progress) {
          stackI.forEach((em, i)=> {
            em.style.top = ((posAct[i])-(progress*pixQui[i]) ) + 'px';
          });
        }
      });
    }

 

    CierraDerecha();

    setTimeout(() => {
      switch (event.target.classList[1]) {
        case "men6":
            animPerfil2();
          break;
        case "men5":
            animCompetencias();
            break;
        case "men4":
            animExp();
            break;
        case "men3":
            animPor();
            break;
        case "men2":
          animContacto();
          break;
        default:
          break;
      }
    }, 1000);

    setTimeout(() => {
      switch (tarjetaAnterior) {
        case "men6":
          d3.select("#PDP")
          .style('left', '250px')
          .style('opacity', '0');
          break;
      case "men5":
          anime({
            targets: '#CMCompetencias rect',
            opacity: 0.3,
            delay: 0,
            duration:1      
          });
          break;
        case "men4":
          d3.selectAll('.EELIE, .EELIED')
          .style('opacity', '0')
          .style('left', "250px")
            break;
        case "men3":
            d3.selectAll("div.PP")
            .style('opacity', '0')
            .style('left', "250px")
            break;
        case "men2":
          d3.selectAll(".CDR>a")
          .style('opacity', '0')
          .style('left', "250px")

          break;
        default:
          break;
      }

      tarjetaAnterior = event.target.classList[1];
    }, 1000);
    
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

    if (window.matchMedia("(orientation: landscape)").matches) {
          //Almacena posiciones de elem quitados 
      stackD.forEach((em)=> {
        posAct.push(parseInt(em.style.left.slice(0, -2)));
      });

      //Posiciones finales despues de la animación
      posAct.forEach((em, i)=> {
        pixQui.push((ancho-(cerrado*(i+1)))-em);
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
    }
    if (window.matchMedia("(orientation: portrait)").matches){
          //Almacena posiciones de elem quitados 
      stackD.forEach((em)=> {
        posAct.push(parseInt(em.style.top.slice(0, -2)));
      });

      //Posiciones finales despues de la animación
      posAct.forEach((em, i)=> {
        pixQui.push((largo-(cerrado*(i+1)))-em);
      });

      //Animacion de transpaso 
      animate({
        duration: aniDuracion,
        timing: function(timeFraction) {
          return Math.pow(timeFraction, 2);
        },
        draw: function(progress) {
          stackD.forEach((em, i)=> {
            em.style.top = ((posAct[i])+(progress*pixQui[i]) ) + 'px';
          });
        }
      });
    }

    CierraIzquierda();
    setTimeout(() => {
      switch (event.target.classList[1]) {
        case "men6":
            animPerfil2();
          break;
        case "men5":
            animCompetencias();
            break;
        case "men4":
            animExp();
            break;
        case "men3":
            animPor();
            break;
        case "men2":
          animContacto();
          break;
        default:
          break;
      }
    }, 1000);

    setTimeout(() => {
      switch (tarjetaAnterior) {
        case "men6":
          d3.select("#PDP")
          .style('left', '250px')
          .style('opacity', '0');
          break;
      case "men5":
          anime({
            targets: '#CMCompetencias rect',
            opacity: 0.3,
            delay: 0,
            duration:1      
          });
          break;
        case "men4":
          d3.selectAll('.EELIE, .EELIED')
          .style('opacity', '0')
          .style('left', "250px")
            break;
        case "men3":
            d3.selectAll("div.PP")
            .style('opacity', '0')
            .style('left', "250px")
            break;
        case "men2":
          d3.selectAll(".CDR>a")
          .style('opacity', '0')
          .style('left', "250px")

          break;
        default:
          break;
      }

      tarjetaAnterior = event.target.classList[1];
    }, 1000);
  }

  //Funcion agrega eventos
  function AgregaEvento() {
    //Agregamos eventos
    stackD.forEach((em)=> {
      em.addEventListener("mouseover", EventoMouseOverDer);
      em.addEventListener("mouseout", EventoMouseOutDer);
      em.addEventListener("click", DClick);
      em.addEventListener("touchstart", touchSD);
      em.addEventListener("touchmove", touchMD);
      em.addEventListener("touchend", touchED);
    });
    stackI.forEach((em, i)=> {
      if(i != stackI.length-1){
        em.addEventListener("mouseover", EventoMouseOverIzq);
        em.addEventListener("mouseout", EventoMouseOutIzq);
        em.addEventListener("click", IClick);
        em.addEventListener("touchstart", touchSI);
        em.addEventListener("touchmove", touchMI);
        em.addEventListener("touchend", touchEI);
      }
      else{
        em.addEventListener("touchmove", touchMA);
        em.addEventListener("touchend", touchEA);
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
      em.removeEventListener("touchstart", touchSD);
      em.removeEventListener("touchmove", touchMD);
      em.removeEventListener("touchend", touchED);
    });

    stackI.forEach((em)=> {
      em.removeEventListener("mouseover", EventoMouseOverIzq);
      em.removeEventListener("mouseout", EventoMouseOutIzq);
      em.removeEventListener("click", IClick);
      em.removeEventListener("touchstart", touchSI);
      em.removeEventListener("touchmove", touchMI);
      em.removeEventListener("touchend", touchEI);
    });
  }

  //Funcion para rejuastar pagina
  function ResizeW() {
    ancho = window.innerWidth;
    largo = window.innerHeight;
    posicionesTar();

  }

  //Animaciones
  function animPerfil(){
    anime({
      targets: '#PDP',
      opacity: 1,
      delay: 300,
      duration: 1200,
      left: '0px',
    });
  }

  function animPerfil2(){
    anime({
      targets: '#PDP',
      opacity: 1,
      delay: 300,
      duration: 1200,
      left: '0px',
    });
  }

  function animCompetencias(){
    
    var tlC = anime.timeline({
      delay: anime.stagger(400),
    });

    tlC
    .add({
      targets: '#CMCJava > svg > rect:nth-child(-n+4)',
      opacity: 1,
    },15)
    .add({
      targets: '#CMCPython > svg > rect:nth-child(-n+4)',
      opacity: 1,
    },15)
    .add({
      targets: '#CMCFluter > svg > rect:nth-child(-n+3)',
      opacity: 1,
    },15)
    .add({
      targets: '#CMCR > svg > rect:nth-child(-n+3)',
      opacity: 1,
    },15)
    .add({
      targets: '#CMCSQL > svg > rect:nth-child(-n+3)',
      opacity: 1,
    },15)
    .add({
      targets: '#CMCJS > svg > rect:nth-child(-n+4)',
      opacity: 1,
    },15)
    .add({
      targets: '#CMCPHP > svg > rect:nth-child(-n+3)',
      opacity: 1,
    },15);

  }

  function animExp(){
    var tlE = anime.timeline({
      duration: 800
    });

    tlE
    .add({
      targets: '.EELIE:nth-last-child(1)',
      opacity: 1,
      left: '0px',
    })
    .add({
      targets: '.EELIE:nth-last-child(2)',
      opacity: 1,
      left: '0px',
    })
    .add({
      targets: '.EELIE:nth-last-child(3)',
      opacity: 1,
      left: '0px',
    })
    .add({
      targets: '.EELIED:nth-last-child(1)',
      opacity: 1,
      left: '0px',
    },400)
    .add({
      targets: '.EELIED:nth-last-child(2)',
      opacity: 1,
      left: '0px',
    },1200)
  }

  function animPor(){
    let card = [...document.querySelectorAll("div.PP")];
    card.sort(function() { return Math.random() - 0.5 });

    anime({
      targets: card,
      opacity: 1,
      left: '0px',
      delay: anime.stagger(100),
      duration: 200
    });
  }

  function animContacto(){
    anime({
      targets: ".CDR>a",
      opacity: 1,
      left: '0px',
      delay: anime.stagger(350, {start: 300}),
    });
  }

  //PERFIL

  function creaPerfil() {
    //Arreglo para circulos
    for (let index = 0; index <= 180; index++) {
      pos1.push(new Array(267).fill(index));
    }

    //Crea circulos fondo
    let g = d3.select('#PSVGI').selectAll("g")
    .data(pos1).enter()
    .append("g")

    g.selectAll("circle")
    .data(function (d, i) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("cx", function(d, i) {
      return i*7.5+1.5+((d%2)*3.75);
    })
    .attr("cy", function(d, i) {
      return d*7.5+1.5;
    })
    .attr("r", 1.5)
    .attr('fill', "white")
    .style('opacity', 0.4) 

    //Carga imagen 
    d3.select('#PSVGI').append("svg:image")
    .attr('width',  '100%')
    .attr('height', '100%')
    .attr('preserveAspectRatio', "xMidYMax meet")
    .attr("xlink:href", "Miguel.png")

  }

  //Portafolio

  var folded = null;     //Variable Oridomi
    //Abre
  function articulosPor (item) {
    document.getElementById("PFA").src = enlacesArt[item.id];
    document.getElementById("Articulos").style.visibility = 'hidden';
    document.getElementById("Articulos").style.display='inline';

    folded = new OriDomi(document.getElementById("Articulos"),{
      vPanels:1,
      hPanels:5,
      speed: 1
    });

    folded.foldUp('top', function(event, instance) {
      folded.setSpeed(1200);
      folded.modifyContent(function(el) {
        el.style.visibility = 'visible';
      });
    });

    folded.accordion(1, 'top', function(event, instance) {
      folded.freeze();
      document.getElementById("Articulos").style.visibility = 'visible';
      document.querySelector('.oridomi-clone').style.visibility = 'visible';
    });
    
  }
  //cierra
  function closeArt(){
    folded.unfreeze();
    folded.foldUp('top',function(event, instance) {
      folded.destroy();
      document.getElementById("Articulos").style.display='none';
    });
  }

  //Contacto

  function checkCaptcha() {
    captcha = true;
    captchaError.textContent = "";
  }

  function inputNombre (event) {
    if (nombre.validity.valid) {
      nombreError.textContent = "";
    } else {
      nombreError.textContent = "Se requiere un nombre";
    }
  }

  function inputEmpresa (event) {
    if (empresa.validity.valid) {
      empresaError.textContent = "";
    } else {
      empresaError.textContent = "Se requiere una empresa";
    }
  }

  function inputCorreo (event) {
    if (correo.validity.valid) {
      correoError.textContent = "";
    } else {
      if (correo.validity.valueMissing) {
        correoError.textContent = "Se requiere un correo";
      }
      else{
        correoError.textContent = "Ingresa un correo valido";
      }
    }
  }

  function animFormCon(event) {
    
    if(!captcha){
      captchaError.textContent = "Validar el captcha";
      captchaError.style.left=0;
      event.preventDefault();
    }
    if (!nombre.validity.valid) {
      nombreError.textContent = "Se requiere un nombre";
      event.preventDefault();
    }
    if (!empresa.validity.valid) {
      empresaError.textContent = "Se requiere una empresa";
      event.preventDefault();
    }
    if (!correo.validity.valid) {
      if (correo.validity.valueMissing) {
        correoError.textContent = "Se requiere un correo";
        event.preventDefault();
      }
      else{
        correoError.textContent = "Ingresa un correo valido";
        event.preventDefault();
      }
    }

  if(captcha && nombre.validity.valid && empresa.validity.valid && correo.validity.valid && correo.validity.valueMissing){
        form.submit();
    }


  }

  function animRevForm() {
    let formul = document.getElementById('ContactoFor');

    if (window.matchMedia("(orientation: portrait)").matches) {
      anime({
        targets: formul,
        opacity: 1,
        top: '50px',
        duration: 1200,
        begin: function(anim) {
          formul.style.opacity = 0;
          formul.style.display = "flex";
          formul.style.top = "-500px"; 
        },
      });
    }
    if (window.matchMedia("(orientation: landscape)").matches) { 
      anime({
        targets: formul,
        opacity: 1,
        left: '45px',
        duration: 1200,
        begin: function(anim) {
          formul.style.opacity = 0;
          formul.style.display = "flex";
          formul.style.left = "-1000px"; 
        },
      });
    }

   
  }

  function posicionesTar() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      //Abajo
      stackD.forEach((em, i )=> {
        em.style.left = "0px";
        em.style.top = (largo-(cerrado*(i+1)))+"px";
      });
      //Arriba
      stackI.forEach((em, i )=> {
        em.style.left = "0px";
        em.style.top = (i*5)+"px";
      });
    }
  
  if (window.matchMedia("(orientation: landscape)").matches) {
    //derecha
    stackD.forEach((em, i )=> {
      em.style.top = "0px";
      em.style.left = (ancho-(cerrado*(i+1)))+"px";
    });
    //Izquierda 
    stackI.forEach((em, i )=> {
      em.style.top = "0px";
      em.style.left = (i*5)+"px";
    }); 
  }
  
  }

  


//Agrega index en z a taerjetas
stackD.forEach((em, i )=> {
    em.style.zIndex = stackD.length + 1 - i;
});

//Divide en grupos
stackI.push(stackD.pop());
stackIT.push(stackDT.pop());
stackITT.push(stackDTT.pop());

//Divide en grupos despues de enviar datos de contacto
if (document.getElementById('container').classList.length > 0) {
  for (let index = 0; index < 4; index++) {
    stackI.push(stackD.pop());
    stackIT.push(stackDT.pop());
    stackITT.push(stackDTT.pop());
  }
}

//Ajustamos posiciones
posicionesTar();

creaPerfil();


AgregaEvento();


window.addEventListener('load', (event) => {
  if (document.getElementById('container').classList.length == 0) {
    animPerfil();
    setTimeout(() => {
      AbreDerecha();
    }, 1000);
    setTimeout(() => {
      CierraDerecha();
    }, 1800);
  }
});

window.onresize = ResizeW;

function touchS(event) {
  
}

function touchMA(event) {
  //event.preventDefault(); 
  if (event.targetTouches.length == 1) {
    if (window.matchMedia("(orientation: landscape)").matches) {
      if (touchM) {
        coor.push(event.targetTouches[0].pageX);
        coor.push(event.targetTouches[0].pageY);
      }
        touchM = false;
    }
    if (window.matchMedia("(orientation: portrait)").matches) {
      switch (stackI[stackI.length-1].id) {
        case "P6":
        case "P3":
          if (touchM) {
            coor.push(event.targetTouches[0].pageX);
            coor.push(event.targetTouches[0].pageY);
            arrabb = 'C';
          }
            touchM = false;
          break;
        case "P5":
        case "P4":
        case "P2":
          if(arrabb == 'A' || arrabb =="B" || arrabb == 'C'){
            if (touchM) {
              coor.push(event.targetTouches[0].pageX);
              coor.push(event.targetTouches[0].pageY);
            } 
              touchM = false;
          } 
          break;
        default:
          break;
      }
    }
  }
}

function touchEA(event) {
  if (event.changedTouches.length == 1) { 
    touchM = true;
    //Se haya movido
    if(coor.length == 2){
      //horizontal
      if (window.matchMedia("(orientation: portrait)").matches) {
        //Arriba
        if (coor[1] > event.changedTouches[0].pageY && (arrabb == 'A' || arrabb == 'C')) {
          //Hay mas
          if (stackD.length > 0) {
            stackD[stackD.length-1].dispatchEvent(new Event("click"));
          }
          //Ultimo
          else{
            anime({
              targets: stackI[stackI.length-1],
              translateY: -50,
              direction: 'alternate',
              duration: 200,
              easing:'easeOutElastic'
            });
          }
        }

        //Abajo
        if (coor[1] < event.changedTouches[0].pageY  && (arrabb == 'B' || arrabb == 'C')) {
          //Hay mas arriba
          if (stackI.length > 1) {
            stackI[stackI.length-2].dispatchEvent(new Event("click"));
          }
          //Ultimo
          else{
            anime({
              targets: stackI[stackI.length-1],
              translateY: 50,
              direction: 'alternate',
              duration: 200,
              easing:'easeOutElastic'
            });
          }
        }
      }
      if (window.matchMedia("(orientation: landscape)").matches) {
        //Derecha
        if (coor[0] > event.changedTouches[0].pageX && Math.abs(coor[1] - event.changedTouches[0].pageY) < 40 && Math.abs(coor[0] - event.changedTouches[0].pageX) > 15) {
          //Hay mas
          if (stackD.length > 0) {
            stackD[stackD.length-1].dispatchEvent(new Event("click"));
          }
          //Ultimo
          else{
            anime({
              targets: stackI[stackI.length-1],
              translateX: -50,
              direction: 'alternate',
              duration: 200,
              easing:'easeOutElastic'
            });
          }
        }

        //Izquierda
        if (coor[0] < event.changedTouches[0].pageX && Math.abs(coor[1] - event.changedTouches[0].pageY) < 40 && Math.abs(coor[0] - event.changedTouches[0].pageX) > 15) {
          //Hay mas arriba
          if (stackI.length > 1) {
            stackI[stackI.length-2].dispatchEvent(new Event("click"));
          }
          //Ultimo
          else{
            anime({
              targets: stackI[stackI.length-1],
              translateX: 50,
              direction: 'alternate',
              duration: 200,
              easing:'easeOutElastic'
            });
          }
        }
      }
    }
    coor.length = 0;
    if (window.matchMedia("(orientation: portrait)").matches) {
      arrabb='';
      switch (stackI[stackI.length-1].id) {
        case "P5":
          let p5 = document.getElementById("CMALL");
          if(p5.offsetHeight == p5.scrollHeight){
            arrabb = 'C'
          }
          else{
            if(p5.scrollTop == 0){
              arrabb = "B";
            }
            else{
              if(p5.offsetHeight + p5.scrollTop >= p5.scrollHeight-1){
                arrabb = "A";
              }
              else{
                arrabb='';
              }
            } 
          }
          
        break;
        case "P4":
          let p4 = document.getElementById("EEALL");
          if(p4.offsetHeight == p4.scrollHeight){
            arrabb = 'C'
          }
          else{
            if(p4.scrollTop == 0){
              arrabb = "B";
            }
            else{
              if(p4.offsetHeight + p4.scrollTop >= p4.scrollHeight-1){
                arrabb = "A";
              }
              else{
                arrabb='';
              }
            } 
          }
          
        break;
        case "P2":
          let p21 = document.getElementById("ContactoEnv");
          let p22 = document.getElementById("ContactoFor");
          if(p21.offsetHeight == p21.scrollHeight){
            arrabb = 'C'
          }
          else{
            if(p21.scrollTop == 0){
              arrabb = "B";
            }
            else{
              if(p21.offsetHeight + p21.scrollTop >= p21.scrollHeight-1){
                arrabb = "A";
              }
              else{
                arrabb='';
              }
            } 
          }
          if(p22.offsetHeight == p22.scrollHeight){
            arrabb = 'C'
          }
          else{
            if(p22.scrollTop == 0){
              arrabb = "B";
            }
            else{
              if(p22.offsetHeight + p22.scrollTop >= p22.scrollHeight-1){
                arrabb = "A";
              }
              else{
                arrabb='';
              }
            } 
          }
        break;
        default:
          break;
      }
    }
  }
}

//Touch abrir y seleccionar tarjeta deslizando 
function touchSD(event) {
  if (event.targetTouches.length == 1) {
    AbreDerecha();
  }
  
}

function touchMD(event){
  event.preventDefault();
  if (event.targetTouches.length == 1) {
    if (window.matchMedia("(orientation:portrait)").matches) {
      stackD.forEach((em, i )=> {
        if(event.targetTouches[0].pageY >= (largo-(40*(i+1))) && event.targetTouches[0].pageY < (largo-(40*i))){
          em.style.border = "solid black 3px";
        }
        else{
          em.style.border = "1px solid rgb(204, 204, 204)";
        }
      });
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
      stackD.forEach((em, i )=> {
        if(event.targetTouches[0].pageX >= (ancho-(40*(i+1))) && event.targetTouches[0].pageX < (ancho-(40*i))){
          em.style.border = "solid black 3px";
        }
        else{
          em.style.border = "1px solid rgb(204, 204, 204)";
        }
      });
    }

    
  }
}

function touchED(event) {
  if (event.changedTouches.length == 1) {
    if (window.matchMedia("(orientation: portrait)").matches) {
      stackD.forEach((em, i )=> {
        if(event.changedTouches[0].pageY >= (largo-(40*(i+1))) && event.changedTouches[0].pageY < (largo-(40*i))){
          em.style.border = "1px solid rgb(204, 204, 204)";
          em.dispatchEvent(new Event("click"));
        }
      });
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
      stackD.forEach((em, i )=> {
        if(event.changedTouches[0].pageX >= (ancho-(40*(i+1))) && event.changedTouches[0].pageX < (ancho-(40*i))){
          em.style.border = "1px solid rgb(204, 204, 204)";
          em.dispatchEvent(new Event("click"));
        }
      });
    }
  }
}

function touchSI(event) {
  if (event.targetTouches.length == 1) {
    AbreIzquierda();
  }
  
}

function touchMI(event){
  event.preventDefault();
  if (event.targetTouches.length == 1) {
    if (window.matchMedia("(orientation: portrait)").matches) {
      stackI.forEach((em, i )=> {
        if(event.targetTouches[0].pageY <= (40*(i+1)) && event.targetTouches[0].pageY > (40*i)){
          em.style.border = "solid black 3px";
        }
        else{
          em.style.border = "1px solid rgb(204, 204, 204)";
        }
      });
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
      stackI.forEach((em, i )=> {
        if(event.targetTouches[0].pageX <= (40*(i+1)) && event.targetTouches[0].pageX > (40*i)){
          em.style.border = "solid black 3px";
        }
        else{
          em.style.border = "1px solid rgb(204, 204, 204)";
        }
      });
    }
  }
}

function touchEI(event) {
  if (event.changedTouches.length == 1) {
    if (window.matchMedia("(orientation: portrait)").matches) {
      stackI.forEach((em, i )=> {
        if(event.changedTouches[0].pageY <= (40*(i+1)) && event.changedTouches[0].pageY > (40*i)){
          em.style.border = "1px solid rgb(204, 204, 204)";
          em.dispatchEvent(new Event("click"));
        }
      });
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
      stackI.forEach((em, i )=> {
        if(event.changedTouches[0].pageX <= (40*(i+1)) && event.changedTouches[0].pageX > (40*i)){
          em.style.border = "1px solid rgb(204, 204, 204)";
          em.dispatchEvent(new Event("click"));
        }
      });
    }
  }
}