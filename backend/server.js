const express = require('express');
var bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
const PORT = 666;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

require('./routes')(app);

// * Puerto donde escucha las peticiones:
app.listen(PORT, () => {
  console.log('Server Online 🐸');
});
