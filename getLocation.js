const { getLocation } = require('./device-admin');

// const config = require('config');
// const fetch = require('cross-fetch');
// const https = require('https');

// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false,
// });

// const user = config.get('user');
// const password = config.get('password');

// function getLocation() {
//   return new Promise((resolve, reject) => {
//     fetch(
//       'https://ise.acme.com/api/v1/policy/network-access/dictionaries/DEVICE/attribute/Location',
//       {
//         method: 'GET',
//         headers: {
//           Authorization:
//             'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
//           Accept: 'application/json',
//         },
//         agent: httpsAgent,
//       }
//     )
//       .catch((err) => {
//         reject(err);
//       })
//       .then(async (response) => {
//         let body = await response.text();
//         body ? (body = JSON.parse(body)) : null;
//         resolve(body);
//       });
//   });
// }

getLocation().then((result) => {
  console.dir(result, { depth: null });
});
