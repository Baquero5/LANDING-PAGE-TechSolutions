const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
            menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            history.pushState(null, null, targetId);
        }
    });
});

// Validación de formulario
const formulario = document.getElementById('formulario-contacto');
if (formulario) {
    const inputs = document.querySelectorAll('#formulario-contacto input, #formulario-contacto textarea');
    const formGroups = document.querySelectorAll('.form-group');

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
        const input = e.target;
        const grupo = input.parentElement;
        const campo = input.name;
        
        if(expresiones[campo].test(input.value)){
            grupo.classList.remove('error');
            input.classList.remove('incorrecto');
            input.classList.add('correcto');
            campos[campo] = true;
        } else {
            grupo.classList.add('error');
            input.classList.add('incorrecto');
            input.classList.remove('correcto');
            campos[campo] = false;
        }
    };

    // Validar mientras escribe
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    // Validación al enviar
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let formularioValido = true;
        
        // Forzar validación de todos los campos
        inputs.forEach(input => {
            const evento = new Event('blur', { bubbles: true });
            input.dispatchEvent(evento);
            if (!campos[input.name]) formularioValido = false;
        });

        if(formularioValido){
            alert("Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.");
            formulario.reset();
            
            inputs.forEach(input => {
                input.classList.remove('correcto', 'incorrecto');
            });
            formGroups.forEach(grupo => {
                grupo.classList.remove('error');
            });
            
        } else {
            alert("Por favor, completa correctamente todos los campos.");
            
            // Enfocar el primer campo con error
            const firstError = document.querySelector('.incorrecto');
            if (firstError) {
                firstError.focus();
            }
        }
    });
}

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && nav && nav.classList.contains('active')) {
        if (!e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
            nav.classList.remove('active');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }
});

// Mejorar accesibilidad del menú
if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
}
