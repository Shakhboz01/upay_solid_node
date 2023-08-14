const request = require('request')

const options = (method, req, url, body = {}) => {
  return {
    'method': method,
    'url': `${process.env.REMOTE_SERVER_URL}/${url}`,
    'json': true,
    'headers': {
      'Content-Type': 'application/json',
      'Content-Language': req.headers['content-language']
    },
    'body': body
  }
}

module.exports = options;
