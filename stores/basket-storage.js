import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';
import { calculateNightsInBetweenDateStr, remove, search } from '~/utils';


export const useBasketStore = defineStore('BASKET_STORE', () => {

    // the listings reference store
    const items = ref([]);
    const check_in_date = ref('');
    const check_out_date = ref('');
    const nights = ref(0);


    // adds a room listings to basket
    // should remove from listings rendered list when added
    function addToBasket(item) {
        items.value.push(item);
    }

    function getItemByID(id) {
        const pos = search(items.value, id);
        if (pos == -1) {
            return null;
        }
        return items.value[pos];
    }

    function removeFromBasket(id) {
        remove(items.value, id)
    }

    // 
    function initBasketDates(start, end) {
        check_in_date.value = start;
        check_out_date.value = end;
        nights.value = calculateNightsInBetweenDateStr(start, end)
    }


    // clear basket
    function clearBasket() {
        items.value = [];
        check_in_date.value = '';
        check_out_date.value = '';
        nights.value = 0;
    }

    // Ui Only
    const isBasketExpanded = ref(false);
    function toogleBasketExpansion() {
        isBasketExpanded.value = !isBasketExpanded.value;
    }

    // Dev only
    const listingSample = {
        id: 30,
        hotel_id: 1,
        room_name: "Outlander #012",
        night_price: 160,
        capacity: 4,
        number_of_beds: 2,
        room_type_id: 2,
        room_type_key: "Cuadruple",
        room_pictures: [
            {
                room_picture_id: 3,
                filename: "13.jpg",
            },
        ],
        room_amenities: [
            {
                amenity_id: 1,
                amenity: "TV",
            },
            {
                amenity_id: 2,
                amenity: "Aire Aconicionado",
            },
        ],
    }
    function populateForDevelopment() {
        // * init dates
        console.log('populating basket for Development')
        addToBasket(listingSample)
    }
    // 

    return {
        // data
        items,
        check_in_date,
        check_out_date,
        nights,
        // fn
        addToBasket,
        getItemByID,
        removeFromBasket,
        populateForDevelopment,
        initBasketDates,
        clearBasket,
        // ui
        isBasketExpanded,
        toogleBasketExpansion,
    }
})






//  FOR API INTEGRATION


// const bookingParams = {
    //     "input": {
    //         "start_date": {
    //             "year": 2022,
    //             "month": 3,
    //             "day": 10,
    //             "hour": 10,
    //             "minute": 0
    //         },
    //         "end_date": {
    //             "year": 2022,
    //             "month": 3,
    //             "day": 12,
    //             "hour": 10,
    //             "minute": 0
    //         },
    //         "rooms_ids": [102],
    //         "hotel_id": 39,
    //         "client_name": "Lolo ",
    //         "client_last_name": "Zanchez de la Concepcion",
    //         "total_price": 200,
    //         "currency_id": 1,
    //         "payment_type_id": 1,
    //         "number_of_guests": 2
    //     }
    // }

    // function initBasket(params) {

    // }

    // function clearBasket() {

    // }
