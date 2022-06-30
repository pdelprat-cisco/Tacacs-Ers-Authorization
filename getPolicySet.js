const { getPolicySet } = require('./device-admin');

getPolicySet().then((result) => {
  console.dir(result);
});
