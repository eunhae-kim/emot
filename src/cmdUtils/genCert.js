const mkcert = require('mkcert');
const fs = require('fs');
const { CERT_ROOT, CERT_KEY_PATH, CERT_PATH, CA_CERT_PATH } = require('./const');

const main = async () => {
  const ca = await mkcert.createCA({
    organization: 'SKT',
    countryCode: 'KR',
    state: '',
    locality: '',
    validityDays: 365,
  });

  const cert = await mkcert.createCert({
    domains: ['v6local.tworld.co.kr', '127.0.0.1', 'localhost'],
    validityDays: 365,
    caKey: ca.key,
    caCert: ca.cert,
  });

  if (!fs.existsSync(CERT_ROOT)) {
    fs.mkdirSync(CERT_ROOT);
  }
  fs.writeFileSync(CERT_KEY_PATH, `${cert.key}\n${ca.key}`);
  fs.writeFileSync(CERT_PATH, `${cert.cert}\n${ca.cert}`);
  fs.writeFileSync(CA_CERT_PATH, `${ca.cert}`);
};

main();
