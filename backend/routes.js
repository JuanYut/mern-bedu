require('dotenv').config();

// * MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@contactkeeper-ggs2y.mongodb.net/test?retryWrites=true&w=majority`;
let opc = { useUnifiedTopology: true };

module.exports = app => {
  // * Auth
  let auth = (req, res, next) => {
    console.log(process.env.SECRET);
    if (req.headers.token === process.env.SECRET) {
      next();
    } else {
      res.status(401).send({ msg: '401 - No estas autorizado' });
    }
  };

  // * GET - Mostrar usuarios.
  app.get('/api', (req, res) => {
    MongoClient.connect(url, opc, function(err, db) {
      if (err) throw err;
      var dbo = db.db('bedu');
      dbo
        .collection('users')
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          res.status(200).send(result);
          db.close();
        });
    });
    console.log('GET 🐸');
  });

  // * POST - Crear un nuevo usuario.
  app.post('/api', auth, (req, res) => {
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db('bedu');
      dbo.collection('users').insertOne(req.body, function(err, res) {
        if (err) throw err;
        console.log('1 document inserted');
        db.close();
      });
    });
    res.send('Post');
  });

  // * PUT - Modificar un usuario.
  app.put('/api', (req, res) => {
    // nada aun...

    res.send('PUT 🐸');
  });

  // * DELETE - Eliminar un usuario.
  app.delete('/api', (req, res) => {
    // nada aun...

    res.send('Delete Something ❌');
  });
};
