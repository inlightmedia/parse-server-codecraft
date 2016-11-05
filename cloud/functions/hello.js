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
  var array = contentString.split(' ');

  for(word in array) {
    if (word = "@bot") {
      Parse.Cloud.useMasterKey();
	    var ChatMessage = Parse.Object.extend("ChatMessage");
      var message = new ChatMessage();
      message.set("name", '@bot');
      message.set("content", 'Hia @' + request.get("name") );        
      message.save().then(function success(result) {
        response.success('Message from @bot sent');
      }, function error(e) {
        console.log(e)
      });        
    }
  }    
});