const {
    DateTime,
    Settings
} = require('luxon');
Settings.defaultZone = 'utc'




// ------------------------------------------------------------------------
// calculateNightsInBetweenDateObj
// ------------------------------------------------------------------------

const fix_start_obj = {
    "year": 2022,
    "month": 5,
    "day": 1,
    "hour": 13,
    "minute": 30,
    "second": 0
}

const fix_end_obj = {
    "year": 2022,
    "month": 5,
    "day": 31,
    "hour": 12,
    "minute": 0,
    "second": 0
}


calculateNightsInBetweenDateObj(fix_start_obj, fix_end_obj);



function calculateNightsInBetweenDateObj(start_obj, end_obj) {

    var nights = 0;

    // 1 set input dates is times to midnight to track as full days
    const midnight_start_obj = setDateObjToMidNigth(start_obj);
    const midnight_end_obj = setDateObjToMidNigth(end_obj);


    // init 
    // 2 get time diff
    const start_luxon = DateTime.fromObject(midnight_start_obj);
    const end_luxon = DateTime.fromObject(midnight_end_obj);

    const time_diff_ms = end_luxon.diff(start_luxon).milliseconds;
    const day_ms = 24 * 60 * 60 * 1000;
    const full_days = time_diff_ms / day_ms;
    // nights are = then full_days because end day it's set to midnight (start)
    // so it dosen't count his night part
    // so instead setting to midnigth of next day to do so
    // we just compute that in the nights keeping as same as full days
    nights = full_days;



    console.log({
        start_luxon_c: start_luxon.c,
        end_luxon_c: end_luxon.c,
        time_diff_ms,
        full_days,
        nights
    })


    return nights;
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








// ------------------------------------------------------------------------









// ------------------------------------------------------------------------
// observ how luxon.DateTime{from,to}Object really work
// ------------------------------------------------------------------------
// no shift detected on pure obj operations
// shift of -1 month in obj to iso str convertions
// ---------

// 1 set the now Date
// var now = new Date();

// 2 parse to object
// var nowObj = jsDateToObjInMidnight(now);

// 3 observ the luxon from Object
// var luxonFrom = DateTime.fromObject(nowObj).setZone('utc', { keepLocalTime: true });


// 4 observ luxon obj to objec
// var luxonObj = luxonFrom.toObject();


// console.log({
//     now,
//     nowObj,
//     luxonFromObj:luxonFrom.c,
//     luxonFromISO: luxonFrom.toISO(),
//     luxonObj,
// })


// function jsDateToObjInMidnight(date) {
//     return {
//         year: date.getFullYear(),
//         month: date.getMonth(),
//         day: date.getDate(),
//         hour: 0,
//         minute: 0,
//         second: 0
//     }
// }

// ------------------------------------------------------------------------







// ------------------------------------------------------------------------
// check for a non iso usage equivalent alternative
// ------------------------------------------------------------------------

// const TZ = 'UTC';


// function date_obj_and_time_zone_to_utc_obj(dateObj, timeZone) {
//     const localizedDate = toTimeZoneKeepenLocal(dateObj, timeZone);
//     const localizedDateISOStr = localizedDate.toISO();
//     const utcObj = getDateObjFromISO(localizedDateISOStr);
//     return utcObj
// }


// function date_obj_and_time_zone_to_utc_obj_2(dateObj, timeZone) {
//     const localizedDate = toTimeZoneKeepenLocal(dateObj, timeZone);
//     const utcObj = localizedDate.toObject();
//     return utcObj
// }


// const fromIsoObj = date_obj_and_time_zone_to_utc_obj(nowObj, TZ);
// const fromIsoObj2 = date_obj_and_time_zone_to_utc_obj_2(nowObj, TZ);




// console.log({
//     fromIsoObj,
//     fromIsoObj2
// })










// deps
// function toTimeZoneKeepenLocal(dateObj, timeZone) {
//     const date = DateTime.fromObject(dateObj).setZone(timeZone, { keepLocalTime: true });
//     return date;
// }

// function getDateObjFromISO(isoStr) {
//     return DateTime.fromISO(isoStr).toObject()
// }


// ------------------------------------------------------------------------







// -------------------------------------------------------------------------------------------
// OBJ LUXON SHIFT +1 MONTH RESPECTIVE JS NATIVE DATE OBSERVATION (NOT OBSERVERD)
// const timeStr = '00:00:00';

// function getDateObjFromDateAndTimeStr(date = new Date(), timeStr) {

//     const timeObj = sqlTimeStrToTimeObj(timeStr);
//     const dateObj = {
//         year: date.getFullYear(),
//         month: date.getMonth(),
//         day: date.getDate(),
//         hour: timeObj.hour,
//         minute: timeObj.minute,
//         second: timeObj.second
//     }

//     return dateObj;
// }


// function toTimeZoneKeepenLocal(dateObj, timeZone) {
//     const date = DateTime.fromObject(dateObj).setZone(timeZone, { keepLocalTime: true });
//     return date;
// }


// function getDateObjFromISO(isoStr) {
//     return DateTime.fromISO(isoStr).toObject()
// }

// function date_obj_and_time_zone_to_utc_obj(dateObj, timeZone) {
//     const localizedDate = toTimeZoneKeepenLocal(dateObj, timeZone);
//     const localizedDateISOStr = localizedDate.toISO();
//     const utcObj = getDateObjFromISO(localizedDateISOStr);
//     return utcObj
// }

// const now = new Date();
// // follow searchCtrl flow
// // 1 get obj from native date
// const now_obj = getDateObjFromDateAndTimeStr(now, timeStr);
// // 2 date_obj_and_time_zone_to_utc_obj
// const utc_luxon_obj = date_obj_and_time_zone_to_utc_obj(now_obj,'utc');


// console.log({
//     now: now.toISOString(),
//     jsNowMonth: now.getMonth(),
//     nowLuxonObjMonth: utc_luxon_obj.month,
//     // utcLuxonMonth: utcLuxon.c.month
// })






// function sqlTimeStrToTimeObj(timeStr = '') {
//     var parts = timeStr.split(':');
//     var time = {
//         hour: parseInt(parts[0]),
//         minute: parseInt(parts[1]),
//         second: parseInt(parts[2]),
//     }

//     return time;
// }


// const dateObj = { year: 2022, month: 4, day: 15, hour: 21, minute: 0, second: 0 };



















// -------------------------------------------------------------------------------------------
// OTHER  TEST

// const MINUTES = new Date().getMinutes()
// const dateObj = { year: 2022, month: 4, day: 15, hour: 21, minute: MINUTES, second: 0 };
// const limaTZ = 'America/Lima';
// const limaDate = toTimeZoneKeepenLocal(dateObj, limaTZ);
// const limaDateStr = limaDate.toString();
// const limaDateStrToUTC = new Date(limaDateStr).toISOString();


// console.log({
//     '0_limaDateStr': limaDate.toObject(),
//     '0_limaDateISO': limaDate.toISO(),
//     '1_limaDateStr': limaDateStr,
//     '2_limaDateOnCuba': limaDate.toJSDate().toString(),
//     '3_limaDateStrToUTC': limaDateStrToUTC,
//     '4_limaDateToUtc': getDateObjFromISO(limaDateStrToUTC),
//     '5_limaDateToUtc': date_obj_and_time_zone_to_utc_obj(dateObj, limaTZ),


// })


// function testFrontValues() {
//     const obj = {
//         "year": 2022,
//         "month": 4,
//         "day": 15,
//         "hour": 13,
//         "minute": 30,
//         "second": 0
//     }

//     const obj2 = {
//         "year": 2022,
//         "month": 4,
//         "day": 16,
//         "hour": 12,
//         "minute": 0,
//         "second": 0
//     }

//     const utc_obj = date_obj_and_time_zone_to_utc_obj(obj, limaTZ);
//     const utc_obj2 = date_obj_and_time_zone_to_utc_obj(obj2, limaTZ);

//     console.log({ obj, utc_obj, obj2, utc_obj2 })
// }


// testFrontValues()



























// const now = new Date();
// const tm = {
//     year: now.getFullYear(),
//     month: now.getMonth(),
//     day: now.getDate(),
//     hour: now.getHours(),
//     minute: MINUTES,
//     second: 0
// }
