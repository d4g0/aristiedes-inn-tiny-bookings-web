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
            singup: 'Sing Up',
            bookings: 'Bookings',
            payments: 'Payments',
            client_login: 'Login',
            admin_login: 'Login as Admin',
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
        search: {
            title: 'Search your room',
            searchBtn: 'Search',
            errors: {
                selection_error: 'Please select an interval with a least one night',
                hotel_load_error: 'Hotel data fail to load, please try again'
            },

        }

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

    singup: {
        errors: {
            name_error: 'Valid name required, it must have 1 to 60 characters.',
            last_name_error: 'Valid last name required, it must have 1 to 60 characters .',
            captcha_missing: 'Please show us you are not a robot',
            submition_fail: 'Failed to send'
        },
        form: {
            names_title: 'Tell us how you are:',
            client_name: 'Name',
            client_last_name: 'Last Name',
            next: 'Next',
            back: 'Back',
            credentials_title: 'Set up your credentials:'
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