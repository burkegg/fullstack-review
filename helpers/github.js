const request = require('request');
const config = require('../config.js');

let getReposByUsername = function(name, callback) {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  //curl https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc
  console.log('inside getrepos');
  let myURL = `https://api.github.com/users/${name}/repos`
  let options = {
    url: myURL,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request.get(options,callback);
}



module.exports.getReposByUsername = getReposByUsername;

// Test Code:
// getReposByUsername('burkegg', function(error, response){
//   console.log('in get repos.........');
//   if (error) {
//     console.log(error);
//   }
//   else{
//     console.log('no errors');
//   }
// })