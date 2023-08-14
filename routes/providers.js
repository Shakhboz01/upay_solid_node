const express = require('express');
const router = express.Router();
const request = require('request')
const options = require('../components')


router.post('/providers', (req, res) => {
  const { country } = req.body;
  const data = options('GET', req, 'api/v4/providers', {country})
  try {
    request(data, function (error, response, body){
      const activeProviders = response.body.schema.categories.filter(category => category.active == true)
      res.json({categories: activeProviders});
    });
  } catch (error) {
    res.json({success: false, error: true, message: error})
  }
})

router.get('/providers/:providerId', (req, res) => {
  const data = options('GET', req, `api/v4/providers/${req.params.providerId}`)
  try {
    request(data, function(error, response, body){
      res.json({provider: body})
    })
  } catch (error) {
    res.json({success: false, error: true, message: error})
  }
})

module.exports = router;
