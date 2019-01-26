const rp = require('request-promise');
const domParser = require('dom-parser');
const timeUtil = require('./timeUtil');

const parser = new domParser();
const url = 'http://dekanka.e-rezervace.cz/Branch/Schedule.mobile?serviceId=40086&date={0}'

const pixelMargin = 2;

async function getFreeSpots(timestamp) {
  const freeSpots = [];
  const result = await rp(url.replace('{0}',timestamp))
  .then((html) => {
    const dom = parser.parseFromString(html);
    const timeContainer  = dom.getElementsByClassName('schedule-cols')[0];
    if(timeContainer) {
      const courtsCount = timeContainer.getElementsByClassName('schedule-col').length;
      for (let courtIndex = 0; courtIndex < courtsCount; courtIndex += 1) {
        const column = timeContainer.getElementsByClassName('schedule-col')[courtIndex];
        const countReservation = column.getElementsByClassName('schedule-reservation').length;

        let endTime = 0;
        for (let reservationIndex = 0;
          reservationIndex < countReservation; reservationIndex += 1) {
          const reservation = column.getElementsByClassName('schedule-reservation')[reservationIndex];
          const style = findStyles(reservation.attributes);
          const howLong = style.height;
          const from = style.top;
          if (from - endTime >= timeUtil.pixelHour) {
            // free
            time = timeUtil.translatePixelSizeIntoTime(endTime, from, timestamp);
            freeSpots.push({since: time.since, until: time.until, courtNumber: courtIndex +1});
          }
          endTime = from + howLong + pixelMargin;
        }
      }
    }
    return;
  })
  .catch((err) => console.log(err));
  return freeSpots;
}

function getTopHeightValue(values) {
    const items = values.split(';');
    const result = {top: null, height: null};
    for(let index= 0; index < items.length; index += 1) {
      const styleValues = items[index].split(':');
      if(styleValues[0].trim() === 'top') {
        result.top = parseInt(styleValues[1].trim().substring(0,styleValues[1].length - 2));
      }
      if (styleValues[0].trim() === 'height') {
       result.height = parseInt(styleValues[1].trim().substring(0,styleValues[1].length - 2));
      }
    }
    return result;
  }
function findStyles(attributes) {
    for (let index = 0; index < attributes.length; index += 1) {
      if (attributes[index].name === 'style') {
        return getTopHeightValue(attributes[index].value);
      }
    }
    return null;
}

module.exports.getFreeSpots = getFreeSpots;