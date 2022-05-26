// links
export const navigationLinks = {
    public: [
        {
            route: "/",
            i18nPath: "nav.links.home",
        },
        {
            route: "/contact",
            i18nPath: "nav.links.contact",
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
        // dashoard home
        {
            route: "/admin",
            i18nPath: "nav.links.home",
        },

        // rooms
        {
            route: "/admin/rooms",
            i18nPath: "nav.links.dashboard.rooms",
        },
        // bookings
        {
            route: "/admin/bookings",
            i18nPath: "nav.links.dashboard.bookings",
        },
        // calendar
        {
            route: "/admin/calendar",
            i18nPath: "nav.links.dashboard.calendar",
        },

    ],
    adminLogin: {
        route: "/admin_login",
        i18nPath: "nav.links.admin_login",
    },
    terms: {
        route: "/terms",
        i18nPath: "nav.links.terms",
    },
    dashAdminLink: {
        route: "/admin/admins",
        i18nPath: "nav.links.dashboard.admins",
    },
    // hotels
    dashHotelLink: {
        route: "/admin/hotels",
        i18nPath: "nav.links.dashboard.hotels",
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
    CLIENT: {
        SEARCH_ROOM: {
            DATES_PICKER: {
                DATES_RANGE_SELECTED: 'DATES_RANGE_SELECTED'
            },
            SEARCH_REQUEST: 'SEARCH_REQUEST'
        },
        BASKET: {
            BASKET_EXPANSION: {
                ROOM_ITEM: {
                    REMOVAL_REQUEST: 'REMOVAL-REQUEST'
                }
            }
        }
    },
    ADMIN: {
        HOTELS: {
            CREATE_HOTEL: 'CREATE_HOTEL',
            EDIT_HOTELS: {
                LIST: {
                    EDIT_HOTEL: 'EDIT_HOTEL',
                    DELETE_HOTEL: 'DELETE_HOTEL'
                }
            }
        }
    }
}



// toasts
export const TOAST_TYPES = {
    error: 'error-toast',
    success: 'success'
}


// API VALUES

// errors
export const API_ERRORS = {
    USER_NOT_FOUND: 'NOT_FOUND_RECORD_ERROR',
    VALIATION_ERROR_KEY: 'NON VALID ARGUMENT',
    UNAUTHENTICATED: "UNAUTHENTICATED",
    DB_UNIQUE_CONSTRAINT_ERROR: 'DB_UNIQUE_CONSTRAINT_ERROR',
    FORBIDDEN: "FORBIDDEN",
}

export const USER_ROLES = {
    FULL_ADMIN: 'FULL_ADMIN',
    BASIC_ADMIN: 'BASIC_ADMIN',
    CLIENT: 'CLIENT'
}

export const API_TOKEN_LIVE_HOURS = 2;