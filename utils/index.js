const {
    DateTime,
    Settings
} = require('luxon');
Settings.defaultZone = 'utc'

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
    const localizedDateISOStr = localizedDate.toISO();
    const utcObj = getDateObjFromISO(localizedDateISOStr);
    return utcObj
}