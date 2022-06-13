const { DateTime, Settings } = require("luxon");
Settings.defaultZone = "utc";



function toTimeZoneKeepenLocal(date, timeZone) {
  var _date = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(_date.valueOf())) {
    throw new Error("Non valid date param: ", date);
  }
  const mappedDate = DateTime.fromJSDate(_date).setZone(timeZone, {
    keepLocalTime: true,
  });
  return mappedDate;
}

function printNow(params) {
  const now = new Date();
  const nowInUtc = toTimeZoneKeepenLocal(now, "utc");
  console.clear()
  console.log(nowInUtc.toISO());

  setTimeout(printNow, 1e3);
}

printNow()
