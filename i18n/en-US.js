module.exports = {
    // ---------------
    // Global 
    // ---------------
    langSwitcher: {
        label: 'Language Switcher',
        optionsLabel: 'Options',
        menuHeading: 'Choose your language'
    },
    nav: {
        links: {
            home: 'Home',
            login: 'Login',
            singup: 'Sing Up',
            bookings: 'Bookings',
            payments: 'Payments',
        },
        reserve: 'Book Now'
    },

    // ---------------
    // Metadata 
    // ---------------
    metadata: {
        home: {
            title: 'Book your room in the hotel today',
            description: `Our infrastructure provides an atmosphere of warmth, modernity and tranquility that characterize our hotel. `
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
            user_not_found: "Email or password or both don't match",
            fetch_error: "Failed to Fetch",
            validation_error: `Provided email it's not supported, please  use real a email only.`
        },
        form: {
            email: 'Email',
            password: 'Password',
            submit: 'Submit',
            validation_errors_hints: {
                email: ' A valid email is required',
                password: 'A valid password is required, with 8 characters at least and 24 max'
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