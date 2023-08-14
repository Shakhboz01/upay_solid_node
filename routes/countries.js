const express = require('express');
const router = express.Router();
const request = require('request')
const options = require('../components')

router.get('/countries', (req, res) => {
  const data = options('GET', req, 'api/v4/countries');
  try {
    request(data, function (error, response, body){
      const countries = response.body
      res.json({countries});
    });
  } catch (error) {
    res.json({success: false, message: error, error: true})
  }
})

module.exports = router;
