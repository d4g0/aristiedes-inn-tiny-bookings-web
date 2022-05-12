module.exports = {
    // ---------------
    // Global 
    // ---------------
    langSwitcher: {
        label: 'Selector de Lenguaje',
        optionsLabel: 'Options',
        menuHeading: 'Seleccione su lenguaje'
    },
    nav: {
        links: {
            home: 'Inicio',
            singup: 'Registrarse',
            bookings: 'Reservaciones',
            payments: 'Pagos',
            client_login: 'Iniciar sesión',
            admin_login: 'Iniciar sesión como Admin',
        },
        reserve: 'Reservar'
    },

    // ---------------
    // Metadata 
    // ---------------
    metadata: {
        home: {
            title: 'Reserva tu habitación en el hotel hoy.',
            description: `Nuestra infraestructura proporciona una atmósfera de calidez, modernidad y tranquilidad que caracterizan a nuestro hotel. `
        },

    },

    // ---------------
    // Home 
    // ---------------
    home: {
        // intro


    },

    // ---------------
    // Login 
    // ---------------
    login: {
        errors: {
            user_not_found: "El correo o la contraseña o ambos no coinciden",
            fetch_error: "Falló al enviar",
            validation_error: `El email que ha introducido no parece ser real, por favor  use solo un email real.`
        },
        form: {
            email: 'Correo',
            password: 'Contraseña',
            submit: 'Enviar',
            validation_errors_hints: {
                email: 'Se requiere un correo válido',
                password: 'Se requiere de una contraseña válida de al menos 8 caracteres y máximo 24'
            }
        }
    },

    singup: {
        errors: {
            name_error: 'Un nombre válido es requrido, debe tener  entre 1 y 60 caracteres.',
            last_name_error: 'Apellido válido es requrido, debe tener  entre 1 y 60 caracteres.',
            captcha_missing:'Por favor, démuestrenos que no es un robot',
            submition_fail:'Falló al enviar',
        },
        form: {
            names_title:'Díganos quien es:',
            client_name: 'Nombre',
            client_last_name: 'Apellido',
            next: 'Siguiente',
            back:'Atrás',
            credentials_title: 'Defina sus credenciales:'
        }
    },


    // ---------------
    // 404 
    // ---------------
    404: {
        heading: 'It looks like you got lost',
        description: 'No worrys, you always can go back.',
        homeLinkText: 'Go Home'
    },

}
