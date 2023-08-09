const express = require('express');
const router = express.Router();
const request = require('request')

router.post('/send-otp', (req, res) => {
  const body = {api_user: {
    phone_number: req.body.phone_number
  }};

  try {
    request({
      url: `${process.env.REMOTE_SERVER_URL}/api/v4/user/send-otp`,
      method: "POST",
      json: true,
      body
    }, function (error, response, body){
        res.json({success: response.body.success});
    });
  } catch (error) {
    res.json({success: false, error})
  }
})

router.post('/verify-number', async(req, res) => {
  const { phone_number, otp } = req.body;
  const body = {
    api_user: {
      phone_number, otp
    }
  }

  request({
    url: `${process.env.REMOTE_SERVER_URL}/api/login.json`,
    method: "POST",
    json: true,
    body: body
  }, function (error, response, body){
      res.json({
        response: response.body.response,
        success: response.body.success,
        jwt: response.body.jwt
      });
  });
})

router.post('/user-profile', async(req, res) => {
  const { firstname, surname, phone_number, email, password, passwordConfirmation} = req.body;
  const { authorization, contentLanguage } = req.headers;
  console.log(authorization)
  if(password !== passwordConfirmation){
    return res.json({
      success: false,
        response: 'Password does not match'
    })
  }

  const body = {
    api_user: {
      firstname, surname, email, password, phone_number
    }
  }

  const options = {
    'method': "PATCH",
    'url': `${process.env.REMOTE_SERVER_URL}/api/v4/profile.json`,
    'json': true,
    'headers': {
      'Authorization': authorization,
      'Content-Type': 'application/json',
      'Content-Language': contentLanguage
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
