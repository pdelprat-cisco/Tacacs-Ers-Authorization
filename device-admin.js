const config = require('config');
const fetch = require('cross-fetch');
const https = require('https');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const user = config.get('ise.user');
const password = config.get('ise.password');
const fqdn = config.get('ise.fqdn')

function getLocation() {
  return new Promise((resolve, reject) => {
    fetch(
      `https://${fqdn}/api/v1/policy/network-access/dictionaries/DEVICE/attribute/Location`,
      {
        method: 'GET',
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
          Accept: 'application/json',
        },
        agent: httpsAgent,
      }
    )
      .catch((err) => {
        reject(err);
      })
      .then(async (response) => {
        let body = await response.text();
        body ? (body = JSON.parse(body)) : null;
        resolve(body);
      });
  });
}

function getAuthorizations(policyId) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://${fqdn}/api/v1/policy/device-admin/policy-set/${policyId}/authorization`,
      {
        method: 'GET',
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
          Accept: 'application/json',
        },
        agent: httpsAgent,
      }
    )
      .catch((err) => {
        reject(err);
      })
      .then(async (response) => {
        let body = await response.text();
        body ? (body = JSON.parse(body)) : null;
        resolve(body.response);
      });
  });
}

function getPolicySet() {
  return new Promise((resolve, reject) => {
    fetch(`https://${fqdn}/api/v1/policy/device-admin/policy-set`, {
      method: 'GET',
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
        Accept: 'application/json',
      },
      agent: httpsAgent,
    })
      .catch((err) => {
        reject(err);
      })
      .then(async (response) => {
        let body = await response.text();
        body ? (body = JSON.parse(body)) : null;
        resolve(body.response);
      });
  });
}

function deleteAuthorization(policyId, ruleId) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://${fqdn}/api/v1/policy/device-admin/policy-set/${policyId}/authorization/${ruleId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
          Accept: 'application/json',
        },
        agent: httpsAgent,
      }
    )
      .catch((err) => {
        reject(err);
      })
      .then(async (response) => {
        let body = await response.text();
        body ? (body = JSON.parse(body)) : null;
        resolve(response.status);
      });
  });
}

function pushAuthorization(id, site, role) {
  return new Promise((resolve, reject) => {
    const body = {
      rule: {
        default: false,
        name: `${site} ${role}`,
        rank: 0,
        state: 'enabled',
        condition: {
          link: null,
          conditionType: 'ConditionAndBlock',
          isNegate: false,
          children: [
            {
              link: null,
              conditionType: 'ConditionAttributes',
              isNegate: false,
              dictionaryName: 'Network Access',
              attributeName: 'AuthenticationStatus',
              operator: 'equals',
              dictionaryValue: null,
              attributeValue: 'AuthenticationPassed',
            },
            {
              link: null,
              conditionType: 'ConditionAttributes',
              isNegate: false,
              dictionaryName: 'DEVICE',
              attributeName: 'Location',
              operator: 'equals',
              dictionaryValue: null,
              attributeValue: `All Locations#${site}`,
            },
            {
              link: null,
              conditionType: 'ConditionAttributes',
              isNegate: false,
              dictionaryName: 'acme',
              attributeName: 'memberOf',
              operator: 'matches',
              dictionaryValue: null,
              attributeValue: `(.*)${site}-${role}(.*)`,
            },
          ],
        },
      },
      commands: ['AllowAllCommands'],
      profile: `Allow ${role}`,
    };
    console.dir(body, { depth: null });
    fetch(
      `https://${fqdn}/api/v1/policy/device-admin/policy-set/${id}/authorization`,
      {
        method: 'POST',
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
          Accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
        agent: httpsAgent,
      }
    )
      .catch((err) => {
        reject(err);
      })
      .then(async (response) => {
        let status = response.status;
        let body = await response.text();
        body ? (body = JSON.parse(body)) : null;
        const message = status == 201 ? 'Authorization created' : body.message;
        resolve({
          status,
          site,
          role,
          message,
        });
      });
  });
}



function getAuthorizationProfiles() {
  return new Promise((resolve, reject) => {
    fetch(`https://${fqdn}/api/v1/policy/network-access/authorization-profiles`, {
      method: 'GET',
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
        Accept: 'application/json',
      },
      agent: httpsAgent,
    })
      .catch((err) => {
        reject(err);
      })
      .then(async (response) => {
        let body = await response.text();
        body ? (body = JSON.parse(body)) : null;
        resolve(body);
      });
  });
}

function getShellProfiles() {
  return new Promise((resolve, reject) => {
    fetch(`https://${fqdn}/api/v1/policy/device-admin/shell-profiles`, {
      method: 'GET',
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
        Accept: 'application/json',
      },
      agent: httpsAgent,
    })
      .catch((err) => {
        reject(err);
      })
      .then(async (response) => {
        let body = await response.text();
        body ? (body = JSON.parse(body)) : null;
        resolve(body);
      });
  });
}


function getCommandSets() {
  return new Promise((resolve, reject) => {
    fetch(`https://${fqdn}/api/v1/policy/device-admin/command-sets`, {
      method: 'GET',
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
        Accept: 'application/json',
      },
      agent: httpsAgent,
    })
      .catch((err) => {
        reject(err);
      })
      .then(async (response) => {
        let body = await response.text();
        body ? (body = JSON.parse(body)) : null;
        resolve(body);
      });
  });
}

module.exports = {
  getLocation,
  getPolicySet,
  getAuthorizations,
  deleteAuthorization,
  pushAuthorization,
  getAuthorizationProfiles,
  getShellProfiles,
  getCommandSets,
};

