const { getLocation } = require('./device-admin');

getLocation().then((result) => {
  console.dir(result, { depth: null });
});
