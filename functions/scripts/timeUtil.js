const pixelHour = 80;  // fixed pixel height

function getTimestampOfNextDays(n) {
    const result = [];
    const timestamp = Date.now();
    for (let index = 0; index < n; index += 1) {
      const date = new Date(timestamp);
      const newDate = date.setDate(date.getDate() + index);
      result.push(newDate);
    }
    return result;
  }

function translatePixelSizeIntoTime(startingPoint, endPoint, timestamp) {
  return {since: calcTime(startingPoint, timestamp), until: calcTime(endPoint, timestamp)};
}

function calcTime(pixelSize, timestamp) {
  // start is in 6:30 (0 px)
  const time = new Date(timestamp);
  const offset = pixelSize / pixelHour;
  time.setSeconds(0);
  time.setMinutes(30);
  time.setHours (6 + offset);
  if(pixelSize % pixelHour !== 0) {
    time.setMinutes(time.getMinutes() + 30);
  }
  return time;
}

module.exports.getTimestampOfNextDays = getTimestampOfNextDays;
module.exports.translatePixelSizeIntoTime = translatePixelSizeIntoTime;
module.exports.pixelHour = pixelHour;