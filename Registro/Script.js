// Función para limpiar el formulario después de enviarlo exitosamente
function limpiarFormulario() {
    document.getElementById("registroForm").reset();
}

// Función para calcular la edad
function calcularEdad() {
    var fechaNacimiento = new Date(document.getElementById("fechaNacimiento").value);
    var hoy = new Date();
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var m = hoy.getMonth() - fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    if (edad < 0 || edad > 115) {
        document.getElementById("edad").textContent = "Edad inválida";
    } else {
        document.getElementById("edad").textContent = "Edad: " + edad + " años";
    }
}

function mostrarCampoTexto() {
    var selectAfeccion = document.getElementById("afeccionImportante");
    var campoTexto = document.getElementById("campoTextoAfecciones");

    if (selectAfeccion.value === "si") {
        campoTexto.style.display = "block";
    } else {
        campoTexto.style.display = "none";
    }
}

function mostrarEnfermedades() {
    var selectEnfermedades = document.getElementById("enfermedades");
    var divEnfermedades = document.getElementById("divEnfermedades");

    if (selectEnfermedades.value === "si") {
        divEnfermedades.style.display = "block";
    } else {
        divEnfermedades.style.display = "none";
    }
}

function mostrarInfeccionesContagiosas() {
    var afeccionImportante = document.getElementById("afeccionImportante").value;
    var enfermedadCronica = document.getElementById("enfermedadCronica").value;
    var divEnfermedades = document.getElementById("divEnfermedades");
    var divInfeccionesContagiosas = document.getElementById("infeccionesContagiosas");

    if (afeccionImportante === "si" || enfermedadCronica === "si") {
        divInfeccionesContagiosas.style.display = "block";
    } else {
        divInfeccionesContagiosas.style.display = "none";
    }
}

// Función para validar el formulario
function validarFormulario() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var fechaNacimiento = document.getElementById("fechaNacimiento").value;
    var correo = document.getElementById("correo").value;
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;
    var confirmarContrasena = document.getElementById("confirmarContrasena").value;

    calcularEdad();
    
    // Validación de campos obligatorios
    if (!nombre || !apellido || !fechaNacimiento || !correo || !usuario || !contrasena || !confirmarContrasena) {
      alert("Por favor, complete todos los campos.");
      return false; // Evita que se envíe el formulario
    }

    // Validación de edad mínima (por ejemplo, 18 años)
    var fechaActual = new Date();
    var fechaNacimientoDate = new Date(fechaNacimiento);
    var edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
    if (edad < 18) {
      alert("Debe ser mayor de 18 años para registrarse.");
      return false; // Evita que se envíe el formulario
    }

    // Validación de dirección de correo electrónico
    var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.match(correoRegex)) {
      alert("Por favor, ingrese una dirección de correo electrónico válida.");
      return false; // Evita que se envíe el formulario
    }

    // Validación de usuario (sin caracteres extraños)
    var usuarioRegex = /^[a-zA-Z0-9_]+$/;
    if (!usuario.match(usuarioRegex)) {
      alert("El nombre de usuario no puede contener caracteres extraños.");
      return false; // Evita que se envíe el formulario
    }

    // Validación de contraseña (por ejemplo, al menos 8 caracteres y al menos una letra y un número)
    var contrasenaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!contrasena.match(contrasenaRegex)) {
      alert("La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra y un número.");
      return false; // Evita que se envíe el formulario
    }

    // Confirmación de contraseña
    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return false; // Evita que se envíe el formulario
    }

    // Si todas las validaciones pasan, el formulario es válido
    alert("¡Registro exitoso!");
    limpiarFormulario(); // Limpiar el formulario después de enviarlo exitosamente
    return false; // Evita que se envíe el formulario
}

document.getElementById("fechaNacimiento").addEventListener("input", calcularEdad);
