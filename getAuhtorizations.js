const { getAuthorizations } = require('./device-admin');

getAuthorizations('10cc95bf-8e25-4d6c-b684-b4b01e6e9bf3').then((result) => {
  console.dir(result, { depth: null });
});
