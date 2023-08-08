var cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const express = require('express')
const request = require('request')

const app = express()
var corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('server started')
})

app.post('/send-otp', (req, res) => {
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

app.post('/verify-number', async(req, res) => {
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

app.post('/user-profile', async(req, res) => {
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
  // const response = await axios.post(`${process.env.REMOTE_SERVER_URL}/api/v4/profile.json`, body, {
  //   headers: {
  //     // 'application/json' is the modern content-type for JSON, but some
  //     // older servers may use 'text/json'.
  //     // See: http://bit.ly/text-json
  //     'authorization': authorization,
  //     'content-type': 'application/json'
  //   }
  // });

  // res.json({response: response})
  // console.log(response)
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

app.post('/login', (req, res) => {
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

app.listen(process.env.PORT || 5000, () => console.log('server has started on ', process.env.PORT))
