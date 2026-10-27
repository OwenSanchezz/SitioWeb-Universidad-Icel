// Autor: Owen Yamil Campuzano Sanchez (@owensanchezz) | Universidad ICEL, Ingeniería en Desarrollo de Software y Aplicaciones
// ===== script.js: comportamiento compartido por todas las páginas =====

// Cuenta de prueba para simular el inicio de sesión (no hay servidor todavía)
const USUARIO_DEMO = "alumno@icel.mx";
const PASSWORD_DEMO = "Icel2026";

// Revisa que el texto tenga forma de correo: algo@dominio.ext
function correoValido(texto) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
}

// Muestra un mensaje de resultado (tipo: "ok" o "error") en el contenedor indicado
function mostrarMensaje(contenedor, texto, tipo) {
    contenedor.textContent = texto;
    contenedor.className = "mensaje visible " + tipo;
}

// Marca un campo como inválido y escribe el error debajo de él
function marcarError(campo, texto) {
    campo.classList.add("invalido");
    campo.setAttribute("aria-invalid", "true");
    const aviso = campo.parentElement.querySelector(".error-campo");
    if (aviso) aviso.textContent = texto;
}

// Quita los errores anteriores del formulario
function limpiarErrores(formulario) {
    formulario.querySelectorAll(".invalido").forEach(c => {
        c.classList.remove("invalido");
        c.removeAttribute("aria-invalid");
    });
    formulario.querySelectorAll(".error-campo").forEach(e => (e.textContent = ""));
}

document.addEventListener("DOMContentLoaded", () => {

    // ---------- Menú: hamburguesa en celular y submenú con clic ----------
    const botonMenu = document.querySelector(".menu-toggle");
    const menu = document.getElementById("menu");
    if (botonMenu && menu) {
        botonMenu.addEventListener("click", () => {
            const abierto = menu.classList.toggle("abierto");
            botonMenu.setAttribute("aria-expanded", abierto);
        });
    }
    document.querySelectorAll(".btn-desplegable").forEach(boton => {
        boton.addEventListener("click", evento => {
            evento.preventDefault();
            boton.parentElement.classList.toggle("abierto");
        });
    });

    // ---------- Modal de contacto (solo en Index) ----------
    const modal = document.getElementById("modal-contacto");
    const abrir = document.getElementById("btnContactar");
    if (modal && abrir) {
        abrir.addEventListener("click", () => modal.showModal());
        modal.querySelector(".cerrar-modal").addEventListener("click", () => modal.close());
        // Clic fuera de la ventana también la cierra
        modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });
    }

    // ---------- Formularios de contacto (modal y página Contacto) ----------
    document.querySelectorAll(".form-contacto").forEach(form => {
        form.addEventListener("submit", evento => {
            evento.preventDefault();
            limpiarErrores(form);
            const nombre = form.elements["nombre"];
            const correo = form.elements["correo"];
            const texto = form.elements["mensaje"];
            const salida = form.querySelector(".mensaje");
            let hayError = false;

            if (nombre.value.trim().length < 3) { marcarError(nombre, "Escribe tu nombre (mínimo 3 letras)."); hayError = true; }
            if (!correoValido(correo.value.trim())) { marcarError(correo, "Escribe un correo válido, por ejemplo nombre@correo.com."); hayError = true; }
            if (texto.value.trim().length < 10) { marcarError(texto, "El mensaje debe tener al menos 10 caracteres."); hayError = true; }

            if (hayError) {
                mostrarMensaje(salida, "Revisa los campos marcados.", "error");
                return;
            }
            mostrarMensaje(salida, "Mensaje enviado. Te responderemos pronto, " + nombre.value.trim() + ".", "ok");
            form.reset();
            // En el modal, se cierra solo después de leer la confirmación
            if (modal && modal.contains(form)) setTimeout(() => { modal.close(); salida.className = "mensaje"; }, 2000);
        });
    });

    // ---------- Login ----------
    const formLogin = document.getElementById("formLogin");
    if (formLogin) {
        const usuario = document.getElementById("usuario");
        const password = document.getElementById("password");
        const salida = formLogin.querySelector(".mensaje");

        // Casilla para mostrar u ocultar la contraseña
        document.getElementById("verPassword").addEventListener("change", e => {
            password.type = e.target.checked ? "text" : "password";
        });

        formLogin.addEventListener("submit", evento => {
            evento.preventDefault();
            limpiarErrores(formLogin);
            let hayError = false;

            if (!correoValido(usuario.value.trim())) { marcarError(usuario, "Escribe un correo válido."); hayError = true; }
            if (password.value.length < 8) { marcarError(password, "La contraseña tiene mínimo 8 caracteres."); hayError = true; }
            if (hayError) { mostrarMensaje(salida, "Revisa los campos marcados.", "error"); return; }

            if (usuario.value.trim() === USUARIO_DEMO && password.value === PASSWORD_DEMO) {
                mostrarMensaje(salida, "Acceso correcto. Entrando al sistema…", "ok");
                setTimeout(() => (window.location.href = "index.html"), 1500);
            } else {
                mostrarMensaje(salida, "Usuario o contraseña incorrectos. Inténtalo de nuevo.", "error");
                password.value = "";
                password.focus();
            }
        });
    }

    // ---------- Recuperar contraseña ----------
    const formRecuperar = document.getElementById("formRecuperar");
    if (formRecuperar) {
        formRecuperar.addEventListener("submit", evento => {
            evento.preventDefault();
            limpiarErrores(formRecuperar);
            const correo = document.getElementById("correoRecuperar");
            const salida = formRecuperar.querySelector(".mensaje");
            if (!correoValido(correo.value.trim())) {
                marcarError(correo, "Escribe un correo válido.");
                mostrarMensaje(salida, "Revisa el correo escrito.", "error");
                return;
            }
            mostrarMensaje(salida, "Si el correo está registrado, recibirás las instrucciones para restablecer tu contraseña.", "ok");
            formRecuperar.reset();
        });
    }
});
