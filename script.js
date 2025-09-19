const formulario = document.getElementById('formulario-contacto');
const inputs = document.querySelectorAll('#formulario-contacto input, #formulario-contacto textarea');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras y espacios
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // correo válido
    mensaje: /^.{10,500}$/ // mínimo 10 caracteres y máximo 500
};

const campos = {
    nombre: false,
    email: false,
    mensaje: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "email":
            validarCampo(expresiones.email, e.target, 'email');
        break;
        case "mensaje":
            validarCampo(expresiones.mensaje, e.target, 'mensaje');
        break;
    }
};

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        input.classList.remove('incorrecto');
        input.classList.add('correcto');
        campos[campo] = true;
    } else {
        input.classList.add('incorrecto');
        input.classList.remove('correcto');
        campos[campo] = false;
    }
};

// Validar mientras escribe o pierde foco
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

// Validación al enviar
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos.nombre && campos.email && campos.mensaje){
        alert("✅ Mensaje enviado con éxito");
        formulario.reset();

        // Resetear estilos
        inputs.forEach(input => input.classList.remove('correcto'));
    } else {
        alert("⚠️ Por favor, rellena correctamente todos los campos.");
    }
});
