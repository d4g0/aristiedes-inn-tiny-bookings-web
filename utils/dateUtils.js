import { DateTime, Settings } from "luxon";
Settings.defaultLocale = "UTC";

export const dateTime = DateTime;
const toZonedDateTimeFromJsDate = (jsDate, timeZone) =>
  DateTime.fromJSDate(jsDate).setZone(timeZone, { keepLocalTime: false });

const toZonedDateFromDateStr = (date, timeZone) => {
  return date.setZone(timeZone, { keepLocalTime: false }).toString();
};

/**
 * js_date_to_zoned_date_time_to_utc
 * @param {Date} jsDate
 * @param {String} timeZone
 * @returns
 */
export const js_date_to_zoned_date_time_to_utc = (jsDate, timeZone) =>
  toZonedDateFromDateStr(toZonedDateTimeFromJsDate(jsDate, timeZone), "UTC");

const utc_sql_date_str_to_zoned_str = (utc_sql_date_str, timeZone) =>
  DateTime.fromSQL(utc_sql_date_str)
    .setZone(timeZone, { keepLocalTime: false })
    .toFormat("yyyy-MM-dd hh:mm");

export default {
  js_date_to_zoned_date_time_to_utc,
  utc_sql_date_str_to_zoned_str,
  DateTime,
};

// formating

const simpleFormat = "yyyy-MM-dd T";
const simpleFormatS = "yyyy-MM-dd TT";

export function from_utc_sql_fromat_to_local(utc_date_str, timeZone) {
  const _date = dateTime
    .fromFormat(utc_date_str, simpleFormatS)
    .setZone(timeZone)
    .toFormat(simpleFormat);
  return _date;
}

export function fromUTCFormatToLocal(utc_date_str, timeZone) {
  const _date = dateTime
    .fromFormat(utc_date_str, simpleFormatS)
    .setZone(timeZone)
    .toFormat(simpleFormat);
  return _date;
}

export function getLocalTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
