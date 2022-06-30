const { getCommandSets } = require('./device-admin');

getCommandSets().then((result) => {
  console.dir(result);
});
