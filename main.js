const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

// Variable para almacenar la cadena de entrada (input).
let input = "";
let resultShown = false; // Variable para verificar si se mostró un resultado

// Recuperar el valor almacenado en localStorage (si existe) y mostrarlo como el resultado en el display.
if (localStorage.getItem("result")) {
  display_output.innerHTML = localStorage.getItem("result");
} else {
  display_output.innerHTML = "0"; // Mostrar 0 si no hay valor guardado
}

// Recorremos todas las teclas de la calculadora.
for (let key of keys) {
  // Obtenemos el valor de la tecla a partir del atributo `data-key`.
  const value = key.dataset.key;

  // Añadimos un listener para el evento de click en cada tecla.
  key.addEventListener('click', () => {
    // Si la tecla es 'AC' (borrar todo), reiniciamos el valor de la entrada y el resultado.
    if (value == "clear") {
      input = "";  // Limpiamos la cadena de entrada.
      display_input.innerHTML = "";  // Limpiamos la visualización de la entrada.
      display_output.innerHTML = "0";  // Mostramos 0 como resultado inicial.
    } 
    // Si la tecla es 'backspace', eliminamos el último carácter de la entrada.
    else if (value == "backspace") {
      input = input.slice(0, -1);  // Eliminamos el último carácter de la cadena.
      display_output.innerHTML = CleanInput(input);  // Actualizamos la visualización de la entrada.
    } 
    // Si la tecla es '=', calculamos el resultado de la operación.
    else if (value == "=") {
      // Preparamos la entrada (por ejemplo, reemplazando porcentajes por divisiones) y calculamos el resultado.
      let result = eval(PerpareInput(input));

      // Mostramos el resultado y lo almacenamos en localStorage.
      display_input.innerHTML = CleanInput(input);
      display_output.innerHTML = CleanOutput(result);  // Mostrar el resultado en output.
      localStorage.setItem("result", result);  // Guardamos el resultado en localStorage.
      input = "";  // Limpiar la entrada después de mostrar el resultado.
    } 

    else if (value == "+/-") {
      // Cambiar el signo del último número
      input = ToggleSign(input);
      display_output.innerHTML = CleanInput(input);
    } 
    // Si la tecla es un número o un operador válido, lo añadimos a la entrada.
    else {
      if (ValidateInput(value)) {
        input +=value;  // Añadimos el valor de la tecla a la cadena de entrada.
        display_output.innerHTML = CleanInput(input);  // Mostrar la entrada en output mientras se escribe.
      }
    }
  });
}

// Función para limpiar la entrada, convirtiendo caracteres especiales en HTML.
function CleanInput(input) {
  let input_array = input.split("");  // Convertimos la entrada en un arreglo de caracteres.
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "*") {
      input_array[i] = `×`; // Sin espacios, solo el operador.
    } else if (input_array[i] == "/") {
      input_array[i] = `÷`; // Sin espacios, solo el operador.
    } else if (input_array[i] == "+") {
      input_array[i] = `+`; // Sin espacios, solo el operador.
    } else if (input_array[i] == "-") {
      input_array[i] = `-`; // Sin espacios, solo el operador.
    } else if (input_array[i] == "(") {
      input_array[i] = `(`; // Sin espacios, solo el paréntesis.
    } else if (input_array[i] == ")") {
      input_array[i] = `)`; // Sin espacios, solo el paréntesis.
    } else if (input_array[i] == "%") {
      input_array[i] = `%`; // Sin espacios, solo el operador de porcentaje.
    }
  }

  return input_array.join("");  // Devolvemos la entrada transformada en una cadena de texto.
}

function CleanOutput(output) {
  let output_string = output.toString();

  // Limitar la precisión a 8 decimales si es un número decimal
  if (output_string.includes(".")) {
    output_string = parseFloat(output_string).toFixed(8);  // Redondea a 8 decimales
  }

  // Verificar si el número es demasiado grande (más de 9 cifras)
  if (output_string.length > 9) {
    // Convertir a notación científica
    let scientific = parseFloat(output_string).toExponential(8);
    // Eliminar ceros innecesarios después del punto en la notación científica
    scientific = scientific.replace(/(\.0+)(e[+-]\d+)$/, "$2"); // Elimina ceros después del punto en notación científica
    output_string = scientific;
  }

  // Añadir comas como separadores de miles si no es notación científica
  if (!output_string.includes('e')) {
    let integer_part = output_string.split(".")[0];

    if (integer_part.length > 3) {
      let output_array = output_string.split("");
      for (let i = integer_part.length - 3; i > 0; i -= 3) {
        output_array.splice(i, 0, ",");
      }
      output_string = output_array.join("");
    }
  }

  return output_string;  // Devuelve el número con formato adecuado
}

// Función para validar si el valor ingresado es válido para la operación.
function ValidateInput(value) {
  let last_input = input.slice(-1);  // Obtenemos el último carácter de la entrada.
  let operators = ["+", "-", "*", "/"];  // Lista de operadores.

  // No permitimos que se agregue un punto si ya hay uno al final.
  if (value == "." && last_input == ".") {
    return false;
  }

  // Si el valor es un operador y el último carácter también es un operador, no lo permitimos.
  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;  // Si no hay errores, el valor es válido.
}

// Función para preparar la entrada antes de evaluar (como convertir el porcentaje en una división por 100).
function PerpareInput(input) {
  let input_array = input.split("");  // Convertimos la entrada en un arreglo de caracteres.

  // Reemplazamos el signo de porcentaje por "/100".
  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == "%") {
      input_array[i] = "/100";
    }
  }
  return input_array.join("");  // Devolvemos la entrada preparada como una cadena de texto.
}

// Guardamos el resultado cuando el usuario cierra la pestaña o recarga la página.
window.onbeforeunload = () => {
  let result = display_output.innerHTML;  // Obtenemos el resultado actual.
  localStorage.setItem("result", result);  // Guardamos el resultado en localStorage.
};


function ToggleSign(input) {
  // Usar expresión regular para capturar el último número
  let regex = /(-?\d+(\.\d+)?)$/; // Captura números enteros o decimales
  let match = input.match(regex);

  if (match) {
    let number = match[0]; // Último número encontrado
    let start = input.slice(0, match.index); // Todo lo anterior al número

    if (number.startsWith("(-")) {
      // Si el número ya es negativo con paréntesis, convertirlo a positivo
      number = number.slice(2, -1);
    } else if (number.startsWith("-")) {
      // Si es negativo sin paréntesis, convertirlo a positivo
      number = number.slice(1);
    } else {
      // Si es positivo, hacerlo negativo con paréntesis
      number = `(-${number})`;
    }

    // Retornar el nuevo input con el número modificado
    return start + number;
  }

  // Si no se encuentra un número, regresar el input sin cambios
  return input;
}