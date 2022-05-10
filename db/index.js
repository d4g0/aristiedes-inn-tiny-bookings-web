export const navigationLinks = {
    public: [
        {
            route: "/",
            i18nPath: "nav.links.home",
        },
        {
            route: "/login",
            i18nPath: "nav.links.login",
        },
        {
            route: "/singup",
            i18nPath: "nav.links.singup",
        },
    ],
    authenticatedClient: [
        {
            route: "/",
            i18nPath: "nav.links.home",
        },
        {
            route: "/bookings",
            i18nPath: "nav.links.bookings",
        },
        {
            route: "/payments",
            i18nPath: "nav.links.payments",
        },
    ],
    authenticatedAdmin: [
        {
            route: "/admin",
            i18nPath: "nav.links.home",
        },

    ]
}

export const AUTH_STORAGE_KEY = 'auth-storage';

export const EVENTS = {
    LOGIN: {
        FORM_SUBMITION_EVENT: "form-submition",
        SUCCESS: 'login-success',
    },
    SINGUP:{
        NAMES_FORM_SUBMISSION:'NAMES_FORM_SUBMISSION',
        FULL_FORM_SUBMIT:'FULL_FORM_SUBMIT'
    }
}

export const API_ERRORS = {
    USER_NOT_FOUND: 'NOT_FOUND_RECORD_ERROR',
    VALIATION_ERROR_KEY: 'NON VALID ARGUMENT'
}


export const TOAST_TYPES = {
    error: 'error-toast'
}


export const USER_ROLES = {
    FULL_ADMIN: 'FULL_ADMIN',
    BASIC_ADMIN: 'BASIC_ADMIN',
    CLIENT: 'CLIENT'
}

export const API_TOKEN_LIVE_HOURS = 2;