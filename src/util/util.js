export function timeConverterUtil(UNIX_timestamp, timeScale){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var day = a.getDate();
    var withinYTD = day + ' ' + month
    var afterYTD = month + ' ' + year

    if (timeScale === "withinYTD") { return withinYTD } else { return afterYTD }
}


var moment = require('moment');
const yearsTill02 = moment().diff(moment("2002-01-01"), 'years')
export const momentManipulations = {
  today: moment().unix(),
  monthBefore: moment().subtract(1, 'month').unix(),
  six_monthBefore: moment().subtract(6, 'month').unix(),
  yearToDate: moment().startOf('year').unix(),
  yearBefore: moment().subtract(1, 'year').unix(),
  five_yearBefore: moment().subtract(5, 'year').unix(),
  maxBefore: moment().subtract(yearsTill02, 'year').unix(),
}