var cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const express = require('express')

const app = express()
require("./startup/routes")(app);


app.listen(process.env.PORT || 5000, () => console.log('server has started on ', process.env.PORT))
