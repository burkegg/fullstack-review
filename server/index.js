const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var {getReposByUsername} = require ('../helpers/github.js');

//var {save} = require('../database/index.js');


var db = require('../database/index.js');




let app = express();


app.use(bodyParser.json());

app.use('/', function(request, response, next) {
  console.log('request method: ', request.method);
  // if (request.method !== 'GET'){
  //   console.log('request', request);
  // }
  
  next();
});

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getReposByUsername(req.body.username, function(error, response){
    if(error){
      console.log(error);
      return;
    }
    // tuple or three tuple
    // [username, reponame, stargazers]
    let data = JSON.parse(response.body);
    let dataForClient = [];
    for (let idx = 0; idx < data.length; idx++){
      let dataToSave = [];
      dataToSave[0] = req.body.username;
      dataToSave[1] = data[idx].name;
      dataToSave[2] = data[idx].stargazers_count;
      dataForClient.push(dataToSave);
      db.save(dataToSave, function(error, data){
        if (error) {
          console.log(error);
          res.send(404, 'error');
        } else {
          //console.log('saved data ', dataToSave);
        }
      })
    }
    if (error){
      res.send(404, 'error');
    } else {
      console.log('the data for client*****************');
      console.log('data: ', dataForClient);
      res.send(201, JSON.stringify(dataForClient));
    }
  });
});


app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  
  db.getRecs(function(err, resp){
    console.log('the callback in getRecs'); 
    if (err) {
      res.send(404, 'error!');
    } else {
      res.send(resp);
    }
  });
  
  
});




let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

