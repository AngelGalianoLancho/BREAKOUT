const btnReglas = document.getElementById("btn-reglas");
const btnCierra = document.getElementById("btn-cerrar");
const reglas = document.getElementById("reglas");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let primeraColision = false;
let juegoPausado = false;

let puntuacion = 0;

let juegoIniciado = false;
let juegoEnMarcha = false;

const nColumnasBloques = 9;
const nFilasBloques = 5;
const delay = 1000; //delay para resetear el juego cuando pierdes

function generarColorAleatorio() {
  const coloresDisponibles = [
    "#0095dd", // Azul
    "#ff8c00", // Naranja más claro
    "#4caf50", // Verde
    "#e53935", // Rojo más claro
    "#00bcd4", // Azul cian
    "#FFFF00", // Amarillo
  ];

  return coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
}
// Objeto bola
const bola = {
    x: canvas.width / 2,
    y: canvas.height / 1.045,
    size: 10,
    velocidad: 4,
    dx: 4,
    dy: -4,
    visible: true,
};

// Objeto paleta
const paleta = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 15,
    w: 80,
    h: 10,
    velocidad: 8,
    dx: 0,
    visible: true,
};

// Objeto Bloque (individual)
const iBloque = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
    color: generarColorAleatorio(), // Agrega la propiedad color al objeto bloque
};

// Crear conjunto de bloques con colores aleatorios
const bloques = [];
for (let i = 0; i < nColumnasBloques; i++) {
    bloques[i] = [];
    for (let j = 0; j < nFilasBloques; j++) {
        const x = i * (iBloque.w + iBloque.padding) + iBloque.offsetX;
        const y = j * (iBloque.h + iBloque.padding) + iBloque.offsetY;
        bloques[i][j] = { x, y, ...iBloque, color: generarColorAleatorio() };
    }
}

// Dibuja la bola
function dibujaBola() {
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.size, 0, Math.PI * 2);
    ctx.fillStyle = bola.visible ? "#0095dd" : "transparent";
    ctx.fill();
    ctx.closePath();
}

// Dibuja la paleta
function dibujaPaleta() {
    ctx.beginPath();
    ctx.rect(paleta.x, paleta.y, paleta.w, paleta.h);
    ctx.fillStyle = paleta.visible ? "#0095dd" : "transparent";
    ctx.fill();
    ctx.closePath();
}

// Dibuja la puntuación
function dibujaPuntuacion() {
    ctx.font = "20px Arial Black";
    ctx.fillText(`Puntos: ${puntuacion}`, canvas.width - 120, 30);
}

// Dibuja los bloques
function dibujaMuro() {
  bloques.forEach((grupo) => {
      grupo.forEach((bloque) => {
          ctx.beginPath();
          ctx.rect(bloque.x, bloque.y, bloque.w, bloque.h);
          ctx.fillStyle = bloque.visible ? bloque.color : "transparent";
          ctx.fill();
          ctx.closePath();
      });
  });
}

// Mover la paleta izquierda y derecha
function muevePaleta() {
    paleta.x += paleta.dx;

    // Wall detection
    if (paleta.x + paleta.w > canvas.width) {
        paleta.x = canvas.width - paleta.w;
    }

    if (paleta.x < 0) {
        paleta.x = 0;
    }
}

// Mueve la bola por el canvas
function mueveBola() {
  bola.x += bola.dx;
  bola.y += bola.dy;

  // Colisión con paredes izquierda o derecha
  if (bola.x + bola.size > canvas.width || bola.x - bola.size < 0) {
    bola.dx *= -1; // rebote de 45º
  }

  // Colisión con paredes superior o inferior
  if (bola.y + bola.size > canvas.height || bola.y - bola.size < 0) {
    bola.dy *= -1;
  }

  // Colisión con el suelo
  if (bola.y + bola.size > canvas.height) {
    reiniciaJuego();
  }

  // Colisión con la paleta
  if (
    bola.x - bola.size > paleta.x &&
    bola.x + bola.size < paleta.x + paleta.w &&
    bola.y + bola.size > paleta.y
  ) {
    bola.dy = -bola.velocidad;
  }

  // colisión con un bloque
  bloques.forEach(grupo => {
    grupo.forEach(bloque => {
        if (bloque.visible) {
            const colisionIzquierda = bola.x + bola.size > bloque.x;
            const colisionDerecha = bola.x - bola.size < bloque.x + bloque.w;
            const colisionArriba = bola.y + bola.size > bloque.y;
            const colisionAbajo = bola.y - bola.size < bloque.y + bloque.h;

            if (colisionIzquierda && colisionDerecha && colisionArriba && colisionAbajo) {
                bola.dy *= -1; // rebota con 45º
                bloque.visible = false; // el bloque desaparece

                actualizaPuntuacion();
            }
        }
    });
});

  // La paleta no golpea - Pierdes
  if (bola.y + bola.size > canvas.height) {
    reiniciaMuro();
    puntuacion = 0;
  }
}

// Actualiza puntuacion
function actualizaPuntuacion() {
  if (primeraColision) {
    puntuacion++;

    if (puntuacion % (nFilasBloques * nColumnasBloques) === 0) {
      // Reinicia el juego después de completar una partida
      setTimeout(reiniciaJuego, delay);
    }
  } else {
    primeraColision = true; // Activar la puntuación después de la primera colisión
  }
}
// Reinicia completamente el juego
function reiniciaJuego() {
  puntuacion = 0;

  // Restaura la visibilidad de todos los bloques
  bloques.forEach(grupo => {
    grupo.forEach(bloque => (bloque.visible = true));
  });

  // Reinicia las variables y posición de la paleta y la bola
  paleta.x = canvas.width / 2 - 40;
  paleta.y = canvas.height - 15;
  bola.x = canvas.width / 2;
  bola.y = canvas.height / 1.045;

  // Muestra nuevamente la bola y la paleta
  bola.visible = true;
  paleta.visible = true;

  // Reinicia el juego
  juegoEnMarcha = false;
  juegoIniciado = false; // <-- Restablecer la variable

  primeraColision = false; // <-- Restablecer la variable
}

// Make all bloques appear
function reiniciaMuro() {
  bloques.forEach(grupo => {
    grupo.forEach(bloque => (bloque.visible = true));
  });
}

// Dibujar el canvas
function dibujaTodo() {
    // limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dibujaBola();
    dibujaPaleta();
    dibujaPuntuacion();
    dibujaMuro();
}

// Actualiza el canvas y las posiciones de los objetos
function update() {
  // LLamada para dibujar el canvas
  dibujaTodo();
  if (juegoEnMarcha && !juegoPausado) {
    muevePaleta();
    mueveBola();
  }
    requestAnimationFrame(update);
}

update();

// Keydown event
function keyDown(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        paleta.dx = paleta.velocidad;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        paleta.dx = -paleta.velocidad;
    }
}

// Keyup event
function keyUp(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "Left" || e.key === "ArrowLeft") {
        paleta.dx = 0;
    }
}

// Keyboard event handlers

document.addEventListener("keydown", function (e) {
  if (!juegoEnMarcha) {
    // Iniciar el juego
    juegoEnMarcha = true;
    juegoIniciado = true;

    // Posicionar la bola en la parte superior central de la paleta
    bola.x = paleta.x + paleta.w / 2;
    bola.y = paleta.y - bola.size;

    // Actualizar la puntuación y reiniciar bloques si es necesario
    actualizaPuntuacion();
    reiniciaMuro();
  } else if (juegoIniciado) {
    keyDown(e);
    if (e.key === " ") {
      juegoPausado = !juegoPausado;
    }
  }
});
document.addEventListener("keyup", keyUp);

// Muestra reglas
btnReglas.addEventListener('click', () => reglas.classList.add('mostrar'));
btnCierra.addEventListener('click', () => reglas.classList.remove('mostrar'));