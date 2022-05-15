import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';
import { DAYS_STORE_KEY } from '~/db';
import { getToDayDate, isDateAEqualOrGreaterThenB, isValidDate } from '~/utils';

export const useDaysStore = defineStore(DAYS_STORE_KEY, () => {

    // state
    const check_in_date = ref(new Date());
    const check_out_date = ref(new Date());


    function setDates({ check_in = new Date(), check_out = new Date(check_in) }) {
        check_in_date.value = check_in;
        check_out_date.value = check_out;
        saveDates();
    }

    function saveDates() {
        if (!process.client) {
            return
        }


        const data = JSON.stringify({
            check_in_date: check_in_date.value.toISOString(),
            check_out_date: check_out_date.value.toISOString(),
        })
        localStorage.setItem(DAYS_STORE_KEY, data)
    }



    function initWithFalback(start_date, end_date) {
        if (!process.client) {
            return
        }


        var rawDatesData = localStorage.getItem(DAYS_STORE_KEY);
        var datesData = rawDatesData ? JSON.parse(rawDatesData) : null;

        // init with defaults if nothing found 
        if (!datesData) {
            check_in_date.value = start_date;
            check_out_date.value = end_date;
            return
        }

        // continue with defaults if old session is not usefull
        const check_in = check_in_date.value;
        const today = getToDayDate();
        if (!isDateAEqualOrGreaterThenB(check_in, today)) {
            // clear non valid session
            resetStorage();
            check_in_date.value = start_date;
            check_out_date.value = end_date;
            return
        }

        // finaly all cristal clear, continue with recover session dates
        check_in_date.value = new Date(datesData.check_in_date);
        check_out_date.value = new Date(datesData.check_out_date);
    }

    function resetStorage() {
        if (!process.client) {
            return
        }
        localStorage.removeItem(DAYS_STORE_KEY);
        check_in_date.value = new Date();
        check_out_date.value = new Date();
    }

    return {
        check_in_date,
        check_out_date,
        setDates,
        saveDates,
        initWithFalback,
    }
})

