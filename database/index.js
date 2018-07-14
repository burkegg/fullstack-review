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
  username: String,
  repo: String,
  stargazers_count: Number
});


var RepoModel = mongoose.model('RepoModel', repoSchema);


// [username, reponame, stargazers]
let save = (dataArray, callback) => {
  let aRepo = new RepoModel({
    username: dataArray[0],
    repo: dataArray[1],
    stargazers_count: dataArray[2]
  });
  
  aRepo.save(function(err, aRepo){
    if(err) return console.error(err);
    console.log('aRepo saved');
  })
}

let getRecs = (callback) => {
  console.log('inside getRecs');
  let ouput = RepoModel.find( {stargazers: { $gt : 2 } }, function(err, data){
    if(err){
      return console.error(err);
    } else {
      console.log('successfully got recs?!?!  WHERE ARE THEY!?!?!')
    }
  } );
}


module.exports = {
  save,
  getRecs
}

// module.exports.save = save;
// module.exports.getRecs = getRecs;









