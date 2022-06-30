const { getAuthorizationProfiles } = require('./device-admin');

getAuthorizationProfiles().then((result) => {
  console.dir(result);
});
