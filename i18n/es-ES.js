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
            login: 'Iniciar Sessión',
            singup: 'Registrarse',
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
            fetch_error:"Falló al enviar",
            validation_error:`El email que ha introducido no parece ser real, por favor  use solo un email real.`
        },
        form:{
            email:'Correo',
            password:'Contraseña',
            submit:'Enviar',
            validation_errors_hints:{
                email:'Se requiere un correo válido',
                password:'Se requiere de una contraseña válida de al menos 8 caracteres y máximo 24'
            }
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
