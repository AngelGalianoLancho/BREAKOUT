# BREAKOUT
Este juego consiste en romper bloques donde el jugador controla una paleta para hacer rebotar una bola y destruir bloques mientras intenta evitar que la bola caiga por debajo de la paleta, lo cual supondra la derrota del jugador.
Función generarColorAleatorio(): Esta función genera un color aleatorio para los bloques del juego. Utiliza una lista de colores predefinidos y selecciona uno al azar cada vez que se llama a la función.
Inicialización de objetos y variables: Se inicializan las variables y objetos necesarios para el funcionamiento del juego, como la bola, la paleta, los bloques y variables de control del juego.
Creación de bloques: Se utiliza un bucle anidado para crear una Array de bloques que representan los ladrillos en el juego. Cada bloque tiene coordenadas X e Y, así como otras propiedades como el color y la visibilidad.
Función dibujaBola(): Esta función dibuja la bola en el canvas utilizando el contexto 2D del canvas. Dibuja un círculo con las coordenadas y el tamaño de la bola, utilizando un color sólido si la bola es visible y transparente si no lo es.
Función dibujaPaleta(): Dibuja la paleta en el canvas. Utiliza el contexto 2D del canvas para dibujar un rectángulo con las coordenadas y el tamaño de la paleta, utilizando un color sólido si la paleta es visible y transparente si no lo es.
Función dibujaPuntuacion(): Dibuja la puntuación del jugador en la esquina superior derecha del canvas. Utiliza el contexto 2D del canvas para escribir el texto con la puntuación actual.
Función dibujaMuro(): Dibuja los bloques en el canvas. Utiliza un bucle para recorrer la matriz de bloques y dibuja cada bloque en su posición con su color correspondiente, si el bloque es visible.
Función muevePaleta(): Mueve la paleta horizontalmente según la dirección especificada por la variable paleta.dx. Además, verifica si la paleta alcanza los límites del canvas y ajusta su posición en consecuencia.
Función mueveBola(): Mueve la bola por el canvas en función de sus velocidades horizontales y verticales (bola.dx y bola.dy). Además, maneja las colisiones de la bola con las paredes del canvas, la paleta y los bloques, invirtiendo las velocidades según sea necesario.
Función actualizaPuntuacion(): Actualiza la puntuación del jugador cuando la bola colisiona con un bloque visible por primera vez. Si se completa el juego al destruir todos los bloques, se reinicia el juego después de un breve retraso.
Función reiniciaJuego(): Reinicia completamente el juego, restaurando la visibilidad de todos los bloques y restableciendo las posiciones de la paleta y la bola.
Función reiniciaMuro(): Restaura la visibilidad de todos los bloques, lo que se utiliza para reiniciar el juego sin cambiar su configuración inicial.
Función dibujaTodo(): Limpia el canvas y llama a las funciones de dibujo para dibujar la bola, la paleta, la puntuación y los bloques en el canvas.
Función update(): Actualiza el canvas y las posiciones de los objetos llamando a dibujaTodo() repetidamente utilizando la técnica de animación requestAnimationFrame, lo que hace que el juego se vea fluido y se actualice constantemente.
Eventos de teclado: Maneja los eventos de teclado para permitir al jugador mover la paleta horizontalmente con las teclas de flecha izquierda y derecha, y para pausar el juego al presionar la barra espaciadora.
