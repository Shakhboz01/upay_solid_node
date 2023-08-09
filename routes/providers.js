const express = require('express');
const router = express.Router();
const request = require('request')

router.get('/providers', (req, res) => {
  const { country } = req.body;

  const options = {
    'method': "GET",
    'url': `${process.env.REMOTE_SERVER_URL}/api/v4/providers.json`,
    'json': true,
    'headers': {
      'Content-Type': 'application/json',
    },
    'body': { country }
  }

  try {
    request(options, function (error, response, body){
      res.json({categories: response.body.schema.categories,});
    });
  } catch (error) {
    res.json({success: false, error: true, message: error})
  }
})

module.exports = router;
