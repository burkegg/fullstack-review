const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('connected to database!');
})


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // username and an array of repo links, stored as strings.
  username : { type: String},
  repo:{ type: String, unique: true},
  stargazers_count: {type: Number}
});


var RepoModel = mongoose.model('RepoModel', repoSchema);


// [username, reponame, stargazers]
let save = (dataArray, callback) => {
  let aRepo = new RepoModel({
    username: dataArray[0],
    repo: dataArray[1],
    stargazers_count: dataArray[2]
  });
  
  
  // If not already in database:
  
  // the save fn.
  aRepo.save(function(err, aRepo){
    if(err) return console.error(err);
    console.log('aRepo saved');
  })
  
  
}

let getRecs = (searchTerm = {}, callback) => {
  console.log('inside getRecs');
  let ouput = RepoModel.find( searchTerm, function(err, data){
    if(err){
      console.log('error got called');
      callback(err);
      //return console.error(err);
    } else {
      console.log(data);
      console.log('successfully got recs?!?!  WHERE ARE THEY!?!?!')
      callback(null, data);
    }
  } );
}

module.exports = {
  save,
  getRecs
}

// module.exports.save = save;
// module.exports.getRecs = getRecs;









