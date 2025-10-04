// SELECTOR SOLUCION
const solucion = document.getElementById("soluciones");
const jugadas = document.getElementById("jugadas");
const opciones = document.getElementById("opciones");
const deleteLast = document.getElementById("delete");
const reset = document.getElementById("reset");
const notificador = document.getElementById('notificador');

let contadorFila = 1;
let contadorColumna = 1;
let winner = false;

// 1.- Crear listado de colores
const colores = [
  ["verde", "#008d00"],
  ["purpura", "#8e44ad"],
  ["rojo", "#db1600"],
  ["amarillo", "#ffdd00"],
  ["azul", "#1f618d"],
  ["naranja", "#FF5733"],
];

// 2.- Crear soluciones
let solucionArray = []; // -> tendra 4 elementos
function crearSolucion() {
  let index;
  for (let i = 0; i < 4; i++) {
    index = Math.floor(Math.random() * colores.length);
    solucionArray[i] = colores[index];
  }
}

// 3.- rellenar el div de las soluciones
function rellenarSolucion() {
  crearSolucion();
  let thSol;
  for (let i = 0; i < 4; i++) {
    thSol = document.createElement("th");
    thSol.textContent = "?";
    thSol.classList.add("circulo", solucionArray[i][0], "solucion");
    solucion.appendChild(thSol);
  }
}

// 4.- crea el tablero de juego para el usuario
function rellenarJugadas() {
  let trJugada;
  let tdJugada;
  let semaforo;
  let semaforoCirulos;
  for (let i = 8; i > 0; i--) {
    trJugada = document.createElement("tr");
    trJugada.id = `fila-${i}`;
    for (let j = 0; j < 4; j++) {
      tdJugada = document.createElement("td");
      tdJugada.id = `${i}-${j + 1}`;
      tdJugada.classList.add(`circulo`);
      trJugada.appendChild(tdJugada);
    }
    semaforo = document.createElement("td");
    semaforo.classList.add("semaforo");
    for (let i = 0; i < 4; i++) {
      semaforoCirulos = document.createElement("div");
      semaforoCirulos.classList.add("semaforo-circulo");
      semaforo.appendChild(semaforoCirulos);
    }
    trJugada.appendChild(semaforo);
    jugadas.appendChild(trJugada);
  }
}

// 5.- rellena las opciones
function rellenarOpciones() {
  // crearSolucion()
  let tdOpciones;
  let circulo;
  for (let i = 0; i < colores.length; i++) {
    tdOpciones = document.createElement("th");
    circulo = document.createElement("div");
    circulo.classList.add(colores[i][0], "circulo", "jugable");
    circulo.style.backgroundColor = colores[i][1];
    tdOpciones.appendChild(circulo);
    opciones.appendChild(tdOpciones);
  }
}

// 6.- agrega listener a las opciones
function agregarListener() {
  let listaBotones = document.getElementsByClassName("jugable");
  for (let i = 0; i < listaBotones.length; i++) {
    listaBotones[i].addEventListener("click", listenerBotones);
  }
}

// 6.1.- funcion para el listener
function listenerBotones(event) {
  let botonColor = event.target.classList.item(0);
  setColor(botonColor);
}

// 6.1.1.- setea el color presionado
function setColor(color) {
  let circuloCambio = document.getElementById(
    `${contadorFila}-${contadorColumna}`
  );
  colores.forEach((c) => {
    if (c[0] == color) {
      circuloCambio.classList.add(c[0]);
      circuloCambio.style.backgroundColor = c[1];
      verificarContador();
    }
  });
}

// 6.1.1.1.- controla los contadores
function verificarContador() {

  if (contadorColumna < 4) {
    contadorColumna++;
  } else if (contadorColumna == 4 && contadorFila < 8) {
    // acá imsertar la funcion para hacer el semaforo
    semaforo(); // 6.1.1.1.3
    contadorColumna = 1;
    contadorFila++;
    if (winner) {
      notificador.textContent = 'Ganaste';
      removerListeners();
      quitarSimbolos();
      return;
    }
    if (contadorFila == 5) { notificador.textContent = 'Aun te quedan 4 intentos' }
    if (contadorFila == 7) { notificador.textContent = 'Solo quedan 2 intentos' }
    if (contadorFila == 8) { notificador.textContent = 'Ultimo!!' }
  } else {
    semaforo(); // 6.1.1.1.3
    if (winner) notificador.textContent = 'Ganaste';
    removerListeners(); // 6.1.1.1.1
    mostrarSoluciones(); // 6.1.1.1.2
    quitarSimbolos(); // 6.1.1.1.3
  }

}

// 6.1.1.1.1.- removerListeners al completar tablero
function removerListeners() {
  let listaBotones = document.getElementsByClassName("jugable");
  for (let i = 0; i < listaBotones.length; i++) {
    listaBotones[i].removeEventListener("click", listenerBotones);
  }
}

// 6.1.1.1.2.- mostrar soluciones
function mostrarSoluciones() {
  let listaSolucion = document.getElementById("soluciones").children;
  for (let i = 0; i < listaSolucion.length; i++) {
    listaSolucion[i].classList.add(solucionArray[i][0]);
    listaSolucion[i].style.backgroundColor = solucionArray[i][1];
  }
}

// 6.1.1.1.3.- quitar ?
function quitarSimbolos() {
  for (c of document.getElementsByClassName("solucion")) {
    c.textContent = "";
  }
}

// 6.1.1.1.4 semaforo
function semaforo() {
  // -> la fila jugada, solucionesArray y el semaforo
  let filaJugada = document.getElementById(`fila-${contadorFila}`).children;
  let contadorNegros = verificarColorPos(filaJugada, solucionArray);
  let contadorColores =
    verificarColor(filaJugada, solucionArray) - contadorNegros;

  if (contadorNegros == 4) {
    winner = true;
    removerListeners();
    mostrarSoluciones();
    quitarSimbolos();
    // notificador.textContent = "Ganaste!"
  }

  let semaforos = filaJugada[4].children;
  for (let i = 0; i < semaforos.length; i++) {
    if (contadorNegros > 0) {
      semaforos[i].style.backgroundColor = "black";
      contadorNegros--;
    } else if (contadorColores > 0) {
      semaforos[i].style.backgroundColor = "white";
      contadorColores--;
    }
  }
}

function verificarColorPos(filaJugada, solucionArray) {
  // cuantas negras
  let contadorAciertosNegros = 0;
  for (let i = 0; i < filaJugada.length - 1; i++) {
    if (filaJugada[i].classList[1] == solucionArray[i][0]) {
      contadorAciertosNegros++;
    }
  }
  return contadorAciertosNegros;
}

function verificarColor(filaJugada, solucionArray) {
  // cuantas blancas
  let contadorColores = 0;
  let filaJugadaSR = []; // SR = sin repetir [[color, cantidad], [color, cantidad]]
  let solucionArraySR = []; // SR = sin repetir [[color, cantidad], [color, cantidad]]
  let encontrado;
  // Filtrado para comprimir el array de lo jugado
  for (let i = 0; i < filaJugada.length - 1; i++) {
    encontrado = false;
    for (let j = 0; j < filaJugadaSR.length; j++) {
      if (filaJugadaSR[j][0] == filaJugada[i].classList[1]) {
        filaJugadaSR[j][1]++;
        encontrado = true;
        break;
      }
    }
    if (!encontrado) {
      filaJugadaSR.push([filaJugada[i].classList[1], 1]);
    }
  }

  // Filtrado para comprimir el array de la solución
  for (let i = 0; i < solucionArray.length; i++) {
    encontrado = false;
    for (let j = 0; j < solucionArraySR.length; j++) {
      if (solucionArraySR[j][0] == solucionArray[i][0]) {
        solucionArraySR[j][1]++;
        encontrado = true;
        break;
      }
    }
    if (!encontrado) {
      solucionArraySR.push([solucionArray[i][0], 1]);
    }
  }

  // comparar los contenidos de solucionSR y jugadasSR
  for (let i = 0; i < filaJugadaSR.length; i++) {
    for (let j = 0; j < solucionArraySR.length; j++) {
      if (filaJugadaSR[i][0] == solucionArraySR[j][0]) {
        if (filaJugadaSR[i][1] >= solucionArraySR[j][1]) {
          // error aweonao -> comparando en pos 0
          contadorColores += solucionArraySR[j][1];
        } else {
          contadorColores += filaJugadaSR[i][1];
        }
      }
    }
  }
  return contadorColores;
}

// BOTÓN DELETELAST
function deleteLastListener() {
  deleteLast.addEventListener("click", () => {
    if (contadorFila == 8 && contadorColumna == 4) {
      return;
    }
    if (contadorColumna > 1 && contadorColumna <= 4) {
      // logica para eliminar
      let elemento = document.getElementById(
        `${contadorFila}-${contadorColumna - 1}`
      );
      elemento.classList.remove(elemento.classList[1]);
      elemento.removeAttribute("style");
      contadorColumna--;
    }
  });
}

function resetListener() {
  reset.addEventListener("click", () => {
    document.getElementById("soluciones").innerHTML = "";
    document.getElementById("jugadas").innerHTML = "";

    {
      rellenarSolucion();
      rellenarJugadas();
      crearSolucion();
      if ((contadorFila == 8 && contadorColumna == 4) || winner) {
        agregarListener();
        winner = false;
      }
      notificador.textContent = 'Again!'
    }

    contadorColumna = 1;
    contadorFila = 1;
  });
}

window.onload = function () {
  rellenarSolucion();
  rellenarJugadas();
  rellenarOpciones();
  agregarListener();
  deleteLastListener();
  resetListener();
};
