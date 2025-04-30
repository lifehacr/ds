const fetch = require('node-fetch');

async function checkDomainAvailability(domainName) {
  const response = await fetch(`https://api.godaddy.com/v1/domains/available?domain=${domainName}`, {
    headers: {
      Authorization: `sso-key your-key:your-secret`,
    },
  });

  const data = await response.json();
  return data.available;
}

module.exports = { checkDomainAvailability };