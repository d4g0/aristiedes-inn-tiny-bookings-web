import { computed, onMounted, provide, watch } from "@nuxtjs/composition-api";
import { useLazyQuery } from "~/composables/useLazyAuthQuerySmart";
import { useContext } from "@nuxtjs/composition-api";
import { useToastStore } from "~/stores/toast-storage";
import { useRoomTypesStore } from "~/stores/room-types-storage";
import { API_ERRORS } from "~/db";
import { storeToRefs } from "pinia";
import { getRoomTypes } from "~/querys/getRoomTypes";
import { useRoomAmenitiesStore } from "~/stores/room-amenyties-storage";
import { getRoomAmenities } from "~/querys/getRoomAmenities";
import { getHotels } from "~/querys/hotels.js";
import { useHotelListStore } from "~/stores/hotel-list-storage";

export function useLoadRoomDeps() {

    const ctx = useContext();

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;
    //

    // -----
    // load all room entities
    // -----

    // -----
    // room types
    // -----

    // store
    const roomTypesStorage = useRoomTypesStore();
    const { populateRoomTypes } = roomTypesStorage;
    const { roomTypes } = storeToRefs(roomTypesStorage);

    // query
    const {
        result: resultRoomTypes,
        error: errorRoomTypes,
        load: loadRoomTypes,
        loading: loadingRoomTypes,
    } = useLazyQuery(ctx.$pinia)(getRoomTypes);

    // watchers
    // result
    watch(resultRoomTypes, (newR) => {
        if (newR?.data?.getRoomTypes) {
            // success
            populateRoomTypes(newR.data.getRoomTypes);
            return;
        }

        if (newR?.errors) {
            console.log("Api error");
            var error = newR.errors[0];
            console.log(error);
            // UNAUTHENTICATED
            if (error?.extensions?.code == API_ERRORS.UNAUTHENTICATED) {
                showToastWithText(
                    TOAST_TYPES.error,
                    "No tiene permiso para realizar esta operación",
                    true
                );
            }

            // Duplicated
            if (
                error?.extensions?.exception?.code ==
                API_ERRORS.DB_UNIQUE_CONSTRAINT_ERROR
            ) {
                showToastWithText(
                    TOAST_TYPES.error,
                    "Fallo al crear el tipo de habitación porque ya existe uno con ese nombre",
                    true
                );
            }

            // FORBIDDEN
            // Duplicated
            if (error?.extensions?.code == API_ERRORS.FORBIDDEN) {
                showToastWithText(
                    TOAST_TYPES.error,
                    "No tiene permiso para realizar esta operación",
                    true
                );
            }

            // errors
            return;
        }
    });
    // error
    watch(errorRoomTypes, (newE) => {
        if (newE) {
            console.log("fetch error");
            console.log(newE);
            showToastWithText(
                TOAST_TYPES.error,
                "Falló al contactar con el API",
                true
            );
        }
    });

    // -----
    // room amenities
    // -----
    // store
    const roomAmenitiesStorage = useRoomAmenitiesStore();
    const { populateRoomAmenities } = roomAmenitiesStorage;
    const { amenities } = storeToRefs(roomAmenitiesStorage);
    // query
    const {
        result: amenitiesResult,
        error: amenitiesError,
        load: loadAmenities,
        loading: loadingAmenities,
    } = useLazyQuery(ctx.$pinia)(getRoomAmenities);
    // watchers
    // result
    watch(amenitiesResult, (newR) => {
        const payload = newR?.data?.getRoomAmenities;
        if (payload) {
            // success
            populateRoomAmenities(payload);
            return;
        }

        // const temp_err = '';
        if (newR?.errors) {
            console.log("Api error");
            var error = newR.errors[0];
            console.log(error);
            // UNAUTHENTICATED
            if (error?.extensions?.code == API_ERRORS.UNAUTHENTICATED) {
                showToastWithText(
                    TOAST_TYPES.error,
                    "No tiene permiso para realizar esta operación",
                    true
                );
            }

            // Duplicated
            if (
                error?.extensions?.exception?.code ==
                API_ERRORS.DB_UNIQUE_CONSTRAINT_ERROR
            ) {
                showToastWithText(
                    TOAST_TYPES.error,
                    "Fallo al crear el tipo de habitación porque ya existe uno con ese nombre",
                    true
                );
            }

            // FORBIDDEN
            // Duplicated
            if (error?.extensions?.code == API_ERRORS.FORBIDDEN) {
                showToastWithText(
                    TOAST_TYPES.error,
                    "No tiene permiso para realizar esta operación",
                    true
                );
            }

            // errors
            return;
        }
    });
    // error
    watch(amenitiesError, (newE) => {
        if (newE) {
            console.log("fetch error");
            console.log(newE);
            showToastWithText(
                TOAST_TYPES.error,
                "Falló al contactar con el API",
                true
            );
        }
    });

    // -----
    // hotels
    // -----
    // store
    const hotelListSotre = useHotelListStore();
    const { hotels } = storeToRefs(hotelListSotre);
    const { populateHotels } = hotelListSotre;

    //
    const {
        result: resultHotels,
        error: errorHotels,
        load: loadHotels,
        loading: loadingHotels,
    } = useLazyQuery(ctx.$pinia)(getHotels);

    // result
    watch(resultHotels, (newR) => {
        if (newR?.data?.hotels) {
            // success
            populateHotels(newR.data.hotels);
            return;
        }

        if (newR?.errors) {
            console.log("Api error");
            var error = newR.errors[0];
            console.log(error);
            return;
        }
    });
    // error
    watch(errorHotels, (newE) => {
        if (newE) {
            console.log("fetch error");
            console.log(newE);
            showToastWithText(
                TOAST_TYPES.error,
                "Fallo al contactar con el API",
                true
            );
        }
    });

    //
    function mountSec() {
        if (!process.client) {
            return;
        }

        // load stuff
        loadRoomDependencies();
    }

    function loadRoomDependencies() {
        loadHotels();
        loadRoomTypes();
        loadAmenities();
    }

    // provide("loadRoomDependencies", loadRoomDependencies);

    const isLoadingDeps = computed(
        () =>
            loadingHotels.value || loadingAmenities.value || loadingRoomTypes.value
    );

    onMounted(mountSec);

    return {
        roomTypes,
        amenities,
        hotels,
        loadRoomDependencies,
        isLoadingDeps,
    };
};