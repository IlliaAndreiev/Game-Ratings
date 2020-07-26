const express = require('express')
const app = express()

require('./db');

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const blogRouter =  require('./routes');

app.use('/api', blogRouter);
 
app.listen(8000)