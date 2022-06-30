const { getAuthorizations, deleteAuthorization } = require('./device-admin');

const policyId = '10cc95bf-8e25-4d6c-b684-b4b01e6e9bf3';

getAuthorizations(policyId).then((result) => {
    result.map((element) => {
      console.log(element.rule.id);
        deleteAuthorization(
          policyId,
          element.rule.id
        )
          .catch((error) => {
            throw error;
          })
          .then((result) => {
            console.dir(result);
          });
    })

});
