const {
    DateTime,
    Settings
} = require('luxon');
Settings.defaultZone = 'utc'

function toTimeZoneKeepenLocal(dateObj, timeZone) {
    const date = DateTime.fromObject(dateObj).setZone(timeZone, { keepLocalTime: true });
    return date;
}


function getDateObjFromISO(isoStr) {
    return DateTime.fromISO(isoStr).toObject()
}

function date_obj_and_time_zone_to_utc_obj(dateObj, timeZone) {
    const localizedDate = toTimeZoneKeepenLocal(dateObj, timeZone);
    const localizedDateISOStr = localizedDate.toISO();
    const utcObj = getDateObjFromISO(localizedDateISOStr);
    return utcObj
}



const MINUTES = new Date().getMinutes()
const dateObj = { year: 2022, month: 4, day: 15, hour: 21, minute: MINUTES, second: 0 };
const limaTZ = 'America/Lima';
const limaDate = toTimeZoneKeepenLocal(dateObj, limaTZ);
const limaDateStr = limaDate.toString();
const limaDateStrToUTC = new Date(limaDateStr).toISOString();


console.log({
    '0_limaDateStr': limaDate.toObject(),
    '0_limaDateISO': limaDate.toISO(),
    '1_limaDateStr': limaDateStr,
    '2_limaDateOnCuba': limaDate.toJSDate().toString(),
    '3_limaDateStrToUTC': limaDateStrToUTC,
    '4_limaDateToUtc': getDateObjFromISO(limaDateStrToUTC),
    '5_limaDateToUtc': date_obj_and_time_zone_to_utc_obj(dateObj, limaTZ),


})


function testFrontValues() {
    const obj = {
        "year": 2022,
        "month": 4,
        "day": 15,
        "hour": 13,
        "minute": 30,
        "second": 0
    }

    const obj2 = {
        "year": 2022,
        "month": 4,
        "day": 16,
        "hour": 12,
        "minute": 0,
        "second": 0
    }

    const utc_obj = date_obj_and_time_zone_to_utc_obj(obj, limaTZ);
    const utc_obj2 = date_obj_and_time_zone_to_utc_obj(obj2, limaTZ);

    console.log({ obj, utc_obj, obj2, utc_obj2 })
}


testFrontValues()



























// const now = new Date();
// const tm = {
//     year: now.getFullYear(),
//     month: now.getMonth(),
//     day: now.getDate(),
//     hour: now.getHours(),
//     minute: MINUTES,
//     second: 0
// }
