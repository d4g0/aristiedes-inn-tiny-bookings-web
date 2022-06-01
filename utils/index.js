import {
    DateTime,
    Settings
} from 'luxon';
Settings.defaultZone = 'utc'

/**
 * Basic gql syntax higligth 
 */
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




export function getToDayDate() {
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

export function sqlTimeStrToTimeObj(timeStr = '') {
    var parts = timeStr.split(':');
    var time = {
        hour: parseInt(parts[0]),
        minute: parseInt(parts[1]),
        second: parseInt(parts[2]),
    }

    return time;
}


/**
 * Returns a Date object for use with native js date api
 * @param {Date} date 
 * @param {String} timeStr 
 * @returns 
 */
export function getDateObjFromDateAndTimeStr(date = new Date(), timeStr) {

    const timeObj = sqlTimeStrToTimeObj(timeStr);
    const dateObj = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: timeObj.hour,
        minute: timeObj.minute,
        second: timeObj.second
    }

    return dateObj;
}


/**
 * Returns a Date object for use with the luxon api
 * @param {Date} date 
 * @param {String} timeStr 
 * @returns 
 */
export function get_luxon_ready_date_obj_from_js_date_and_sql_time_str(date = new Date(), timeStr) {

    const timeObj = sqlTimeStrToTimeObj(timeStr);
    const dateObj = {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // luxon expect 1-12 instead 0-11 native js. lets add 1
        day: date.getDate(),
        hour: timeObj.hour,
        minute: timeObj.minute,
        second: timeObj.second
    }

    return dateObj;
}


// special luxons
function toTimeZoneKeepenLocal(dateObj, timeZone) {
    const date = DateTime.fromObject(dateObj).setZone(timeZone, { keepLocalTime: true });
    return date;
}


function getDateObjFromISO(isoStr) {
    return DateTime.fromISO(isoStr).toObject()
}

export function date_obj_and_time_zone_to_utc_obj(dateObj, timeZone) {
    const localizedDate = toTimeZoneKeepenLocal(dateObj, timeZone);
    const utcObj = localizedDate.toObject();
    return utcObj
}


export function date_obj_and_time_zone_to_localized_date_to_utc_str(dateObj, timeZone) {
    const localizedDate = toTimeZoneKeepenLocal(dateObj, timeZone);
    const utc_str = localizedDate.setZone('utc').toISO();
    return utc_str
}


// collections ops

export function search(collection = [{ id: 0 }], id) {
    var pos = -1;

    for (let i = 0; i < collection.length; i++) {
        if (collection[i].id == id) {
            pos = i;
            break;
        }
    }

    return pos;
}

export function remove(collection = [], id) {
    const pos = search(collection, id);

    // not found
    if (pos == -1) {
        return
    }
    collection.splice(pos, 1);
}



// nights calculation
export function calculateNightsInBetweenDateStr(start, end) {

    var nights = 0;

    // 1 set input dates is times to midnight to track as full days
    const midnight_start = setDateStrToMidNigth(start);
    const midnight_end = setDateStrToMidNigth(end);


    // init 
    // 2 get time diff
    const start_luxon = DateTime.fromISO(midnight_start);
    const end_luxon = DateTime.fromISO(midnight_end);

    const time_diff_ms = end_luxon.diff(start_luxon).milliseconds;
    const day_ms = 24 * 60 * 60 * 1000;
    const full_days = time_diff_ms / day_ms;
    // nights are = then full_days because end day it's set to midnight (start)
    // so it dosen't count his night part
    // so instead setting to midnigth of next day to do so
    // we just compute that in the nights keeping as same as full days
    nights = full_days;

    return nights;
}


function setDateStrToMidNigth(dateStr) {
    const temp = DateTime.fromISO(dateStr);
    const tempMid = setDateObjToMidNigth(temp.toObject())
    return DateTime.fromObject(tempMid).toISO()
}

function setDateObjToMidNigth(date) {
    return {
        "year": date.year,
        "month": date.month,
        "day": date.day,
        "hour": 0,
        "minute": 0,
        "second": 0,
        "millisecond": 0
    }
}

export function getCurrentTimeZone() {
    const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone
    return localTZ;
}

export function isInCollection(
    collection = [{ searchKey: "" }],
    searchKey,
    element
) {

    var isIn = false;
    for (let i = 0; i < collection.length; i++) {
        // cohercion intentionally allowed
        if (collection[i][searchKey] == element) {
            isIn = true;
            break;
        }
    }
    return isIn;
}