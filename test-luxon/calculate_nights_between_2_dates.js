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

const fix_start_str = '2022-05-01T17:13:30.000Z';
const fix_end_str = '2022-06-30T12:00:00.000Z';

// calculateNightsInBetweenDateObj(fix_start_obj, fix_end_obj);

calculateNightsInBetweenDateStr(fix_start_str, fix_end_str);






function calculateNightsInBetweenDateStr(start, end) {

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



    console.log({
        start_luxon_c: start_luxon.c,
        end_luxon_c: end_luxon.c,
        time_diff_ms,
        full_days,
        nights
    })


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





// midnight str sub test
// const s1 = "2022-05-20T17:00:00.000Z";
// const s1_m = setDateStrToMidNigth(s1);

// console.table([ s1, s1_m ]);




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
