// links
export const navigationLinks = {
    public: [
        {
            route: "/",
            i18nPath: "nav.links.home",
        },
        {
            route: "/client_login",
            i18nPath: "nav.links.client_login",
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
    ],
    adminLogin: {
        route: "/admin_login",
        i18nPath: "nav.links.admin_login",
    },

}

// stores keys
export const AUTH_STORAGE_KEY = 'auth-storage';

export const DAYS_STORE_KEY = 'days-storage';
// events
export const EVENTS = {
    LOGIN: {
        FORM_SUBMITION_EVENT: "form-submition",
        SUCCESS: 'login-success',
    },
    SINGUP: {
        NAMES_FORM_SUBMISSION: 'NAMES_FORM_SUBMISSION',
        FULL_FORM_SUBMIT: 'FULL_FORM_SUBMIT'
    },
    CAPTCHA: {
        COMPLETION: "CAPTCHA_COMPLETION",
        ERROR: "CAPTCHA_ERROR",
        EXPIRED: 'EXPIRED'
    },
    CLIENT:{
        SEARCH_ROOM:{
            DATES_PICKER:{
                DATES_RANGE_SELECTED:'DATES_RANGE_SELECTED'
            }
        }
    }
}



// toasts
export const TOAST_TYPES = {
    error: 'error-toast'
}


// API VALUES

// errors
export const API_ERRORS = {
    USER_NOT_FOUND: 'NOT_FOUND_RECORD_ERROR',
    VALIATION_ERROR_KEY: 'NON VALID ARGUMENT'
}

export const USER_ROLES = {
    FULL_ADMIN: 'FULL_ADMIN',
    BASIC_ADMIN: 'BASIC_ADMIN',
    CLIENT: 'CLIENT'
}

export const API_TOKEN_LIVE_HOURS = 2;