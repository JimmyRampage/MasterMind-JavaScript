# Mastermind 🚀

Una adaptación web del clásico juego de mesa de lógica y deducción, implementado con HTML, CSS y JavaScript para jugar directamente en tu navegador.

## 📝 Descripción

Mastermind es un juego de descifrado de códigos. En esta versión para un solo jugador, la computadora genera un código secreto de 4 colores y el jugador debe adivinarlo en un máximo de 8 intentos. Después de cada intento, el juego proporciona pistas visuales:

- **Clavija Negra (⚫)**: Indica un color correcto en la posición correcta.
- **Clavija Blanca (⚪)**: Indica un color correcto pero en la posición incorrecta.

El objetivo es usar la lógica para descifrar el código secreto antes de que se agoten los intentos.

## ✨ Características

- **Interfaz Gráfica Interactiva**: Un diseño limpio y jugable directamente en el navegador, sin necesidad de instalaciones.
- **Código Secreto Aleatorio**: Se genera un nuevo código de 4 colores al azar en cada partida, elegido entre 6 colores posibles.
- **Tablero de 8 Intentos**: El jugador dispone de 8 filas para realizar sus intentos.
- **Sistema de Pistas Visual**: Feedback inmediato después de cada fila completada.
- **Controles de Juego**:
  - **Botón de Reinicio (♻️)**: Para empezar una nueva partida en cualquier momento.
  - **Botón de Borrado (❌)**: Para eliminar el último color colocado en la fila actual.
- **Notificaciones Dinámicas**: Mensajes en pantalla que guían al jugador, le dan ánimo y anuncian el resultado final (victoria o derrota).

## 💻 Tecnologías Utilizadas

Este proyecto está construido con tecnologías web estándar:

- **HTML5**: Para la estructura del juego.
- **CSS3**: Para el diseño y la apariencia visual del tablero y los colores.
- **JavaScript (Vanilla JS)**: Para toda la lógica del juego, la interactividad y la manipulación del DOM.

## 🎮 Cómo Jugar

1. La partida comienza automáticamente al cargar la página.
2. En la parte inferior, verás la paleta de 6 colores disponibles.
3. Haz clic en los colores para rellenar la primera fila vacía (la de más abajo).
4. Si te equivocas, puedes usar el botón **❌** para borrar el último color que pusiste.
5. Una vez que completes los 4 espacios de la fila, el juego evaluará tu jugada y te mostrará las pistas en los pequeños círculos a la derecha de la fila.
6. Usa estas pistas para planificar tu siguiente intento en la fila superior.
7. Ganas si adivinas el código secreto. Pierdes si se te acaban los 8 intentos.
8. Usa el botón **♻️** para empezar de nuevo cuando quieras.

## 📄 Documentación del Script

El código JavaScript (`assets/js/script.js`) gestiona toda la lógica del juego. A continuación se describen sus funciones principales:

| Función               | Descripción                                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `crearSolucion()`     | Genera y almacena el array con la combinación de 4 colores secretos.                                                                     |
| `rellenarSolucion()`  | Prepara el área superior donde se mostrará la solución al final del juego.                                                               |
| `rellenarJugadas()`   | Crea dinámicamente el tablero de 8x4 donde el jugador coloca sus intentos.                                                               |
| `rellenarOpciones()`  | Genera la paleta de colores con la que el jugador puede interactuar.                                                                     |
| `agregarListener()`   | Asigna los eventos de clic a los colores de la paleta.                                                                                   |
| `setColor()`          | Coloca el color seleccionado en la celda activa del tablero.                                                                             |
| `verificarContador()` | Controla el flujo del juego, avanzando de columna y fila, y dispara la evaluación cuando una fila se completa.                           |
| `semaforo()`          | Llama a las funciones de verificación y actualiza las pistas (clavijas negras y blancas) en la interfaz. Es el núcleo de la evaluación.   |
| `verificarColorPos()` | Calcula el número de clavijas negras (colores correctos en la posición correcta).                                                        |
| `verificarColor()`    | Calcula el número total de colores correctos (independientemente de su posición) para poder deducir las clavijas blancas.                |
| `deleteLastListener()`| Implementa la lógica para el botón de borrado.                                                                                           |
| `resetListener()`     | Implementa la lógica para reiniciar el juego.                                                                                            |
| `window.onload`       | Función que se ejecuta al cargar la página para inicializar el tablero y comenzar la partida.                                            |

---

¡Espero que disfrutes del juego! Si tienes ideas para mejorarlo, no dudes en contribuir.
