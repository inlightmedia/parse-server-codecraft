Parse.Cloud.define('hello', function(req, res) {
  res.success('world');
});

Parse.Cloud.define('ping', function(req, res) {
  res.success('pong');
});

Parse.Cloud.beforeSave("ChatMessage", function(request, response) {
  if (!request.object.get("name") || !request.object.get("content") ) {
    response.error("must have a name and message");
  } else {
    response.success();
  }
});

Parse.Cloud.afterSave("ChatMessage", function(request, response) {
  
  var contentString = request.object.get("content"); 
  console.log(contentString + 'AfterSave has run.');
  var wordArray = contentString.split(' ');

  for (var i = 0; i < wordArray.length; i++){
    console.log(wordArray[i] + '<- just one item');
    console.log(wordArray + ' <- The whole array');
    
    if (wordArray[i] === "@bot") {
      console.log('@bot has been found.');
      Parse.Cloud.useMasterKey();
      var ChatMessage = Parse.Object.extend("ChatMessage");      
      var message = new ChatMessage();
      message.set("name", "bot");
      var greeting = 'Hia';
      message.set("content", greeting);
      message.save().then(function success(result) {
        console.log('SAVED new ChatMessage!');
      }, function error(e) {console.log(e)});
    }
  }
  
  
     
});