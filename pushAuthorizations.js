const { pushAuthorization } = require('./device-admin');

const sites = ['Paris', 'Nice', 'Toulouse'];

const policyId = '10cc95bf-8e25-4d6c-b684-b4b01e6e9bf3';

let promises = [];
sites.map((site) => {
  console.log(site);
  promises.push(pushAuthorization(policyId, site, 'RW'));
  promises.push(pushAuthorization(policyId, site, 'RO'));
});

Promise.all(promises).then((response) => {
  console.dir(response, { depth: null });
});
