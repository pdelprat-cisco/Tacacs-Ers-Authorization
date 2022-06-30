const { getShellProfiles } = require('./device-admin');

getShellProfiles().then((result) => {
  console.dir(result);
});
