# Calculadora Interactiva

## 📖 Explicación  
Este proyecto es una calculadora interactiva desarrollada con tecnologías web modernas. Permite realizar operaciones matemáticas básicas y avanzadas como suma, resta, multiplicación, división y porcentajes. La calculadora cuenta con un diseño intuitivo, soporte para números negativos y funcionalidad para ajustar automáticamente el formato de los resultados, incluyendo notación científica para números muy grandes.  

## 💻 Tecnologías Usadas  
- **HTML5:** Para la estructura de la aplicación y elementos interactivos.  
- **CSS3:** Para estilizar la interfaz de usuario, utilizando gradientes y estilos modernos para una apariencia atractiva.  
- **JavaScript (ES6+):** Para manejar la lógica de las operaciones, gestionar eventos y realizar el procesamiento dinámico de las entradas y salidas del usuario.  
- **Local Storage:** Para persistir el último resultado de la operación incluso si el navegador se cierra, eliminando la necesidad de una base de datos externa.  

Estas tecnologías fueron elegidas por su compatibilidad, eficiencia y porque permiten crear aplicaciones rápidas, accesibles y sin depender de servidores o bases de datos.  

---

```python
# Código Python – Contar Números Pares
def contar_pares(lista):
    contador = 0
    for numero in lista:
        if numero % 2 == 0:
            contador += 1
    return contador

# Obtener la lista de números desde el usuario
entrada = input("Ingrese una lista de números separados por espacios: ")
numeros = [int(x) for x in entrada.split()]

cantidad_pares = contar_pares(numeros)
print("Cantidad de números pares:", cantidad_pares)
```
