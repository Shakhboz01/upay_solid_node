const express = require('express');
const router = express.Router();
const request = require('request')

router.get('/countries', (req, res) => {

  const options = {
    'method': "GET",
    'url': `${process.env.REMOTE_SERVER_URL}/api/countries.json`,
    'json': true,
    'headers': {
      'Content-Type': 'application/json',
      'Content-Language': req.headers['content-language']
    }
  }

  try {
    request(options, function (error, response, body){
      console.log('get providers')
      res.json({countries: response.body});
    });
  } catch (error) {
    res.json({success: false, error: true, message: error})
  }
})

module.exports = router;
