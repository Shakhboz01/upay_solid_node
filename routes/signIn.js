const express = require('express');
const router = express.Router();
const request = require('request')

router.post('/login', (req, res) => {
  const {login, password} = req.body;
  const body = {
    api_user: { login, password }
  }
  const options = {
    'method': "POST",
    'url': `${process.env.REMOTE_SERVER_URL}/api/login.json`,
    'json': true,
    'headers': {
      'Content-Type': 'application/json',
    },
    'body': body
  }
  request(options, function (error, response, body){
    res.json({
      response: response.body.response,
      success: response.body.success,
    });
  });
})

module.exports = router;
