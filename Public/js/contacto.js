// Inicializar EmailJS
emailjs.init("418dkoHKDlKBOCPQU");

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío estándar del formulario

        // Obtener valores de los campos
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const celular = document.getElementById("cel").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();
        const consulta = document.getElementById("consulta").value;

        // Validar campos requeridos
        if (!nombre || !email || !celular || !mensaje || !consulta) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        // Validamos que el celular tenga exactamente 9 dígitos
        const celRegex = /^\d{9}$/;
        if (!celRegex.test(celular)) {
            alert("El número de celular debe contener exactamente 9 dígitos.");
            return;
        }

        // Configuramos parámetros para la plantilla de EmailJS
        const templateParams = {
            nombre: nombre,
            email: email,
            celular: celular,
            mensaje: mensaje,
            consulta: consulta
        };

        console.log("Enviando correo con los siguientes parámetros:", templateParams);

        // aqui se configura para Enviar correo usando EmailJS
        emailjs.send('service_l06e9tr', 'template_4lo28ek', templateParams)
            .then(function (response) {
                console.log("Correo enviado exitosamente:", response);
                alert("Correo enviado exitosamente!");
                form.reset(); // Limpiar el formulario después del envío
            })
            .catch(function (error) {
                console.error("Error al enviar el correo:", error);
                alert("Error al enviar el correo: " + error.text);
            });
    });
});
