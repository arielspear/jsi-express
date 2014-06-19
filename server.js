var env = process.env.NODE_ENV || 'development';
var _ = require('lodash');
var express = require('express');
var knexConfig = require('./knexfile.js')[env];
var knex = require('knex')(knexConfig);
var bluebird = require('bluebird'), Promise = bluebird;
var bookshelf = require('bookshelf')(knex);

var app = express();

app.use(require('morgan')('dev'));
app.use(require('body-parser')());
app.use(require('method-override')('_method'));
app.use(express.static(__dirname + '/public'));

var Person = bookshelf.Model.extend({
  tableName: 'people'
});

var people = {};

app.get('/', function(req, res) {
  res.redirect('/home/');
});

app.get('/api/people', function(req, res) {
  Person.fetchAll()
  .then(function(fetchedPeople){
    var people = fetchedPeople.toJSON().map(function(person) {
      return _.omit(person, 'id');
    });
    res.json({ people: people });
  })
  .done();
});

app.post('/api/people', function(req, res) {
  var name = req.param('name');
  Person.forge({
    name: name 
  })
  .save()
  .then(function() { console.log('Saved person: ' + name);})
  .done();
});

app.put('/api/people/:id', function(req, res) {
  Promise.resolve()
  .then(function(arg) {
    return Person.where({ id: req.params.id } ).fetch();
  })
  .then(function(person) {
    return person.save({ name: req.param('name') }, { patch: true });
  })
  .then(function(person) {
    res.json({ person: person });
  })
  .done();
});

app.delete('/api/people/:id', function(req, res) {
  var deleted = !!people[req.params.id];
  delete people[req.params.id];
  res.json({ status: deleted ? 'deleted' : 'ok' });
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port %d', server.address().port);
});
