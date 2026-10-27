# Sitio Universidad Icel (Front End)

Sitio web de varias páginas para una universidad, hecho como proyecto de la materia de Front End: navegación responsive, formularios con validación y simulación de inicio de sesión. Proyecto académico, no es el sitio oficial de la institución.

Demo en vivo: https://owensanchezz.github.io/SitioWeb-Universidad-Icel/

## Funciones

- Menú de navegación con submenú desplegable y botón de hamburguesa en celular.
- Formulario de contacto, tanto en una ventana modal (`<dialog>`) como en su propia página.
- Validación de formularios en JavaScript con mensajes de error por campo (nombre, correo con expresión regular y longitud mínima del mensaje).
- Login simulado con opción de mostrar la contraseña y página de recuperación de contraseña.
- Atributos de accesibilidad: `aria-invalid`, `role="alert"`, `aria-expanded` y etiquetas asociadas a cada campo.
- Un solo archivo de estilos y un solo `script.js` compartidos por todas las páginas.

## Tecnologías

HTML5, CSS3 y JavaScript sin librerías.

## Cómo ejecutarlo

1. Descarga o clona el repositorio.
2. Abre `index.html` en el navegador.

Cuenta de prueba del login: `alumno@icel.mx` / `Icel2026`.

## Páginas

`index.html`, `acerca.html`, `productos.html`, `servicios.html`, `ofertas.html`, `ubicacion.html`, `contacto.html`, `login.html` y `recuperar.html`.

## Limitaciones

- El login es una simulación: las credenciales de prueba están en `script.js`. En un sistema real la autenticación se hace en el servidor.
- Los formularios no envían datos a ningún lado.

## Autor

Owen Yamil Campuzano Sanchez ([@owensanchezz](https://github.com/owensanchezz))
