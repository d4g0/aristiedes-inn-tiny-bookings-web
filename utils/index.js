import dayjs from 'dayjs';
import localeEn from 'dayjs/locale/en';
import localeEs from 'dayjs/locale/es';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

export const gql = String.raw;

export async function wait(seconds = 0) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}



export function getDatesRange(daysOffset = 0) {
    const now = new Date();
    const today = {
        year: null,
        month: null,
        day: null
    }

    today.year = now.getFullYear();
    today.month = now.getMonth();
    today.day = now.getDate();

    const nextDay = {
        year: today.year,
        month: today.month,
        day: today.day + daysOffset
    }

    return {
        startDate: new Date(today.year, today.month, today.day),
        endDate: new Date(nextDay.year, nextDay.month, nextDay.day),
    }
}


export function getMonthDayDate(date, locale) {
    // var locales = {
    //     es: localeEs,
    //     en: localeEn
    // }

    // var customLocale = locales[locale] ? locales[locale] : localeEn;


    var dateStr = dayjs(date).format('LL',);


    return dateStr;
}

export function getToDayDate(){
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return today
}

export function isDateAEqualOrGreaterThenB(dateA = new Date(), dateB = new Date()) {
    return dateA.valueOf() >= dateB.valueOf();
}

export function isValidDate(date) {
    return date instanceof Date && date.toString() != new Date(NaN).toString();
}