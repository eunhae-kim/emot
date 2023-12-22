const CERT_ROOT = `${__dirname}/../../cert`;
const CERT_KEY_PATH = `${CERT_ROOT}/local-key.pem`;
const CERT_PATH = `${CERT_ROOT}/local-cert.pem`;
const CA_CERT_PATH = `${CERT_ROOT}/local-ca.crt`;

module.exports = {
  CERT_ROOT,
  CERT_KEY_PATH,
  CERT_PATH,
  CA_CERT_PATH
}
