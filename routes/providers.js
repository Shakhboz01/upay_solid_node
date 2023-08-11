const express = require('express');
const router = express.Router();
const request = require('request')

router.get('/providers/:country', (req, res) => {
  const { country } = req.headers;

  const options = {
    'method': "GET",
    'url': `${process.env.REMOTE_SERVER_URL}/api/v4/providers.json`,
    'json': true,
    'headers': {
      'Content-Type': 'application/json',
      'Content-Language': req.headers['content-language']
    },
    'body': { country }
  }

  try {
    request(options, function (error, response, body){
      const activeProviders = response.body.schema.categories.filter(category => category.active == true)
      res.json({categories: activeProviders});
    });
  } catch (error) {
    res.json({success: false, error: true, message: error})
  }
})

module.exports = router;
