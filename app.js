const express = require('express');
const cors = require('cors')  //cors penghubung antara frontend dan backend "npn i cors"
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rhidayscrew:gantipassword@cluster0-v5hvq.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true,  useUnifiedTopology:
true})


mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const port = 4000;
const Attandance = require('./model.js');
const app = express();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Success connect to database!')
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))


app.get('/', function(req, res) {
  Attandance
    .find({})
    .then(data => {
      res
        .json({
          data
        })
    })
    .catch(error => {
      res
        .json({
          error: error.message
        })
    })
})

app.post('/create', function(req, res) {
  const person = req.body

  Attandance
    .create({
      name: person.name,
      address: person.address,
      email: person.email,
      phone: person.phone
    })
    .then(data => {
      res
        .json({
          data
        })
    })
    .catch(error => {
      res
        .json({
          error: error.message
        })
    })
})

app.patch('/update/:id', function(req, res) {
  const person = req.body
  const { id } = req.params

  Attandance
    .findOneAndUpdate({_id: id}, person)
    .then(data => {
      res
        .json({
        //  data
          'message': 'update'

        })
    })
    .catch(error => {
      res
        .json({
          error: error.message
        })
    })
})

app.delete('/delete/:id', function(req, res) {
  const { id } = req.params

  Attandance
    .findOneAndRemove({_id: id})
    .then(data => {
      res
        .json({
          data
          // 'message': 'Delete'
        })
    })
    .catch(error => {
      res
        .json({
          error: error.message
        })
    })
})

app.listen(port, function() {
  console.log(`Server Ready on http://localhost:${port}`)  //pake bactick di keyboard atas kiri paling ujung
})