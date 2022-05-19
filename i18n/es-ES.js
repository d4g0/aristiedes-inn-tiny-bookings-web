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
    colorSelector: {
        label: 'Color Mode Picker',
        btnLabel: 'Color Mode',
        colorModes: [
            {
                code: 'system',
                text: 'system'
            },
            {
                code: 'ligth',
                text: 'ligth'
            },
            {
                code: 'dark',
                text: 'dark'
            }
        ]
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
        search: {
            title: 'Busque su habitación',
            searchBtn: 'Buscar',
            errors: {
                selection_error: 'Por favor seleccione al menos una noche',
                hotel_load_error: 'Falló al cargar la información del hotel, por favor intente de nuevo',
                listings_load_error: 'Falló al cargar la información de las habitaciones, por favor intente de nuevo',

            },
        },

        listings:{
            listing_unit:{
                addToBookingBtn:'Añadir a mi cesta',
                night:'Noche',
                bed:'cama',
                guest:'invitado',
                details:{
                    expanded:'Ver menos detalles',
                    not_expanded:'Ver mas detalles'
                }
            }
        },

        basket:{
            cartToogleBtn:{
                expanded:'Colapse la cesta',
                not_expanded:'Expanda la cesta'
            },
            bookBtn:'Reserve Ahora',
            room:{
                singular:'Habitación',
                plural:'Habitaciones'
            }
        },

        basket_exp:{
            backBtn:'Ir atrás',
            rooms_key:'Habitaciones',
            room_item:{
                removeBtn:'Remover'
            },
            summary:{
                summary_key:'Resumen',
                nights:'Noches',
                check_in:'Fecha de entrada',
                check_out:'Fecha de salida',
                check_in_time:'Hora de entrada',
                check_out_time:'Hora de salida'
            }

        }

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
            captcha_missing: 'Por favor, démuestrenos que no es un robot',
            submition_fail: 'Falló al enviar',
        },
        form: {
            names_title: 'Díganos quien es:',
            client_name: 'Nombre',
            client_last_name: 'Apellido',
            next: 'Siguiente',
            back: 'Atrás',
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
