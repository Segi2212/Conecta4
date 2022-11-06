/* hacemos la creacion de las variables que nos ayudaran con los elementos del tablero
numeroCampos es la cantidad de casillas
numeroTiros es la cantidad de fichas en la parte superior del tablero
tableroJuego es el arreglo multidimensional que indica el color de la ficha cada casilla
colorTiro es el color de la ficha del primer jugador (siempre inicia rojo)*/
let numeroCampos = 25
let numeroTiros = 5;
var tableroJuego =
    [["b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b"]];
var colorTiro = "r";

for (let i = 1; i <= numeroCampos; i++) {
    /*esta interacion ayuda a crear de manera relativa la cantidad de casillas necesarias y crear dentro el contenedor de la ficha 
    el id de cada ficha se conforma de f más el numero segun su posicion*/

    var espacio = document.createElement("div");
    espacio.id = "espacio";

    var ficha = document.createElement("div");
    ficha.className = "ficha";
    ficha.id = "f" + i;

    var juego = document.getElementById("juego");

    juego.appendChild(espacio);
    espacio.appendChild(ficha);
}
colorFichas()

function colorFichas() {
    for (let i = 1; i < numeroTiros + 1; i++) {
        var tiro = document.getElementById("T" + i);
        switch (colorTiro) {
            case "r":
                tiro.style.backgroundColor = "var(--FRoja)"
                tiro.style.border = "4px solid var(--BFRoja)"
                tiro.style.boxShadow = "inset 5px 5px 0 0 var(--SombraFRoja)"
                break;
            case "a":
                tiro.style.backgroundColor = "var(--FAmarilla)"
                tiro.style.border = "4px solid var(--BFAmarilla)"
                tiro.style.boxShadow = "inset 5px 5px 0 0 var(--SombraFAmarilla)"
                break
        }
    }
}

function tirada(id) {
    /**una vez que se acciona un tiro, se desactiva el click de los tiros y se comprueba el tablero
    */
    desactivarTiros();
    comprobarTablero(id);
}

function desactivarTiros() {
    for (let i = 1; i <= numeroTiros; i++) {
        let tiro = document.getElementById("T" + i);
        tiro.style.pointerEvents = "none";
    }
}

function comprobarTablero(id) {
    /**
     * comprobartablero nos dice hasta que punto tiene que caer la ficha
     * Esto se logra sacando el numero de la ficha tocada, restando uno y comparando esa columna en cada uno de los arreglos que contiene tableroJuego
     * Para detener el for en caso de encontrar una ficha, entonces le damos a "i" el mismo valor de tableroJuego
     * Por ultimo hacemos el efecto de caida
     */
    let n = parseFloat(id.match(/[0-9]/));
    for (let i = 0; i <= tableroJuego.length; i++) {
        if (tableroJuego[i][n - 1] == "r") {
            caidaFicha(id, i - 1, n - 1);
            i = tableroJuego.length
        }
        else if (tableroJuego[i][n - 1] == "a") {
            caidaFicha(id, i - 1, n - 1);
            i = tableroJuego.length
        }
        else if (tableroJuego[4][n - 1] == "b") {
            caidaFicha(id, 4, n - 1);
            i = tableroJuego.length
        }
    }
}

function caidaFicha(id, i, j) {
    /**
     * 
     */
    let tiro = document.getElementById(id)
    tiro.style.transform = "translate(0," + i + "90px"
    tiro.style.transition = "linear 1.5s"
    tiro.style.opacity = "1"
    setTimeout(mostrarTiro, 1600, i, j)
    setTimeout(activarTiros, 1600, id)
}

function mostrarTiro(i, j) {
    tableroJuego[i][j] = colorTiro;
    var x = 1;
    for (let i = 0; i < tableroJuego.length; i++) {
        for (let j = 0; j < tableroJuego[i].length; j++) {
            switch (tableroJuego[i][j]) {
                case "r":
                    fichasJugadas(x, "r")
                    break;
                case "a":
                    fichasJugadas(x, "a")
                    break;
            }
            x++
        }
    }

}

function activarTiros(id) {
    document.getElementById(id).style = "transform: translate(0, 0); transition: linear 0s;";
    for (let i = 1; i < numeroTiros + 1; i++) {
        let tiros = document.getElementById("T" + i);
        if (tableroJuego[0][i - 1] == "b") {
            tiros.style.pointerEvents = "visible";
        }
        else {
            tiros.style.pointerEvents = "none";
            tiros.style.display = "none"
        }
    }

    switch (colorTiro) {
        case "a":
            colorTiro = "r"
            break;
        case "r":
            colorTiro = "a"
            break;
    }

    colorFichas()
}

function fichasJugadas(x, color) {
    let casilla = document.getElementById("f" + x);
    switch (color) {
        case "a":
            casilla.style.backgroundColor = "var(--FAmarilla)"
            casilla.style.border = "4px solid var(--BFAmarilla)"
            casilla.style.boxShadow = "inset 5px 5px 0 0 var(--SombraFAmarilla)"
            break;
        case "r":
            casilla.style.backgroundColor = "var(--FRoja)"
            casilla.style.border = "4px solid var(--BFRoja)"
            casilla.style.boxShadow = "inset 5px 5px 0 0 var(--SombraFRoja)"
            break;
    }
    comprobarGanador(color)
}

function comprobarGanador(color) {
    for (let i = 0; i < tableroJuego.length; i++) {
        let arrayN = [];
        for (let j = 0; j < tableroJuego[i].length; j++) {
            if (tableroJuego[i][j] == color) {
                arrayN.push(tableroJuego[i][j])
                if (arrayN.length == 4) {
                    ganador(color)
                }
            }
            else {
                arrayN = [];
            }
        }
    }

    for (let i = 0; i < numeroTiros; i++) {
        let arrayN = [];
        for (let j = 0; j < tableroJuego.length; j++) {
            if (tableroJuego[j][i] == color) {
                arrayN.push(tableroJuego[j][i])
                if (arrayN.length == 4) {
                    ganador(color)
                }
            }
            else {
                arrayN = [];
            }
        }
    }
}

function ganador(color) {
    location.reload(true)
}