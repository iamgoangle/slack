var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://hooks.slack.com/services/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',
  'headers': {
    'Content-type': 'application/json'
  },
  body: JSON.stringify({"text":"Hello, World!"})

};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});
