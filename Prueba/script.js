let ancho = window.innerWidth -20;
let largo = window.innerHeight -20;

let pos1 = [];
let tamañoImg = ancho*0.4;
let axisY=0;

let letraTN = Math.round(largo/16);
let letraTP = Math.round(largo/22);
let letraTT = Math.round(largo/30);

//Ajusta tamaños a cuadrado
tamañoImg > largo ? tamañoImg = largo -35 : tamañoImg = ancho * 0.4;

//Arreglo para circulos
for (let index = 0; index < Math.round(tamañoImg/10); index++) {
    pos1.push(new Array(Math.round(tamañoImg/10)).fill(index));

}

axisY = (largo-tamañoImg)/3;

//Crea SVG
let cnt = d3.select('#cnt')
    .style('width', ancho + "px")
    .style('height', largo + "px")
    .style('display', 'flex')
    .append("div")
    .attr('id', 'DImg')
    .style('position', 'absolute')
    //.style('top', '0')
    .style('right', '50%')
    .style('width', tamañoImg)
    .style('height', largo)
    .append("svg")
    .attr('id', "cntSVG")
    .attr('width', tamañoImg)
    .attr('height', largo)
    

//Cra fondo imagen 
cnt.append("rect")
    .attr('x', 25)
    .attr('y', axisY)
    .attr('width', tamañoImg)
    .attr('height', tamañoImg)
    .style('fill', '#4eb3d3')
    
//Crea circulos fondo
let g = cnt.selectAll("g")
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
cnt.append("svg:image")
    .attr('x', 25)
    .attr('y', axisY)
    .attr('width',  tamañoImg)
    .attr('height', tamañoImg)
    .attr("xlink:href", "my.png")

/*/Cuadro blanco titulo
let cbX = ancho/3;
let cbY = largo/4;

let cb = cnt.append("rect")
    .attr('x', cbX)
    .attr('y', cbY)
    .attr('width', ancho/2)
    .attr('height', largo/2)
    .style('fill', '#ffffff')
    .style('stroke', "gray")
    .style('stroke-width', 3)

let dx = 10;
let dy = 10;
//Texto tiutlo 
let tN = cnt.append("text")
    .text("MIGUEL ANGEL GARCIA BENITEZ")
    .attr("x", 200)
    .attr("y", 200)
    .attr("dx", dx)
    .attr("dy", dy)
    .style("font-family", "Montserrat")
    .style('font-size', largo/12)

 let aux = tN._groups[0][0].clientWidth;
 let tN2 = null;
if((ancho/3 + aux) > ancho){
    tN._groups[0][0].textContent = "MIGUEL ANGEL";
    let tN2 = cnt.append("text")
            .text("GARCIA BENITEZ")
            .attr("x", 200)
            .attr("y", 230)
            .attr("dx", dx)
            .attr("dy", dy)
            .style("font-family", "Montserrat")
            .style('font-size', largo/12)
} 

let tC = cnt.append("text")
    .text("LICENCIADO EN CIENCIAS DE LA COMPUTACIÓN")
    .attr("x", 200)
    .attr("y", 270)
    .attr("dx", dx)
    .attr("dy", dy)
    .style("font-family", "Montserrat")
    .style('font-size', largo/18)

aux = tC._groups[0][0].clientWidth;

let tC2 = null;
   if((ancho/3 + aux) > ancho){
       tC._groups[0][0].textContent = "LICENCIADO EN CIENCIAS";
       tC2 = cnt.append("text")
            .text("DE LA COMPUTACIÓN")
            .attr("x", 200)
            .attr("y", 290)
            .attr("dx", dx)
            .attr("dy", dy)
            .style("font-family", "Montserrat")
            .style('font-size', largo/18)
   }
cb.style("width",tN._groups[0][0].clientWidth);




console.log(cb._groups[0][0].y.baseVal.value);
*/

let cont = d3.select('#cnt')
    .append("div")
    .attr('id', "pd")
    .style('background-color', "white")
    .style('border', "3px solid gray")
    //.style('width', '50%')
    //.style('height', '30%')
    .style('display', 'inline-block')
    .style('position', 'absolute')
    .style('bottom', '50%')
    .style('left', '47%')
 let p =   cont.append("p")
    .style('margin-block', "10px 10px")
    .style("font-family", "Montserrat")
    .style('font-size', letraTN+"px")
    .text("MIGUEL ANGEL GARCIA BENITEZ")

cont.append("p")
    .style('margin-block', "10px 10px")
    .style("font-family", "Montserrat")
    .style('font-size', letraTP+"px")
    .text("LICENCIADO EN CIENCIAS DE LA COMPUTACIÓN")
    
let perfil = d3.select('#cnt')
    .append("div")
    .attr('id', "perfil")
    //.style('background-color', "white")
    //.style('border', "3px solid gray")
    .style('width', '50%')
    //.style('height', '30%')
    //.style('display', 'inline-block')
    .style('position', 'absolute')
    .style('top', '50%')
    .style('left', '50%')
    .append("p")
    .style('margin-block', "10px 10px")
    .style("font-family", "Montserrat")
    .style('font-size', letraTT+"px")
    .text("Licenciado en Ciencias de la Computación con amplios conocimientos en análisis de datos con Python y R; bases de datos en SQL; servidores en Linux; aplicaciones móviles con Flutter y aplicaciones web.")




 