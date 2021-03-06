Parse.Cloud.afterSave("ChatMessage", function(request, response) {
  
  var contentString = request.object.get("content"); 
  console.log(contentString + 'AfterSave has run.');
  var wordArray = contentString.split(' ');

  for (var i = 0; i < wordArray.length; i++){
    console.log('Searching for relevant tags...');
    if (wordArray[i] === "@bot") {
      console.log('@bot has been found.');
      Parse.Cloud.useMasterKey();
      var ChatMessage = Parse.Object.extend("ChatMessage");      
      var message = new ChatMessage();
      message.set("name", "bot");
      var greeting = 'Hia @' + request.object.get("name");
      console.log(request);
      message.set("content", greeting);
      console.log('Replying from chat bot...');
      message.save().then(function success(result) {
        console.log('Chat bot reply sent.');
      }, function error(e) {console.log('Could not save.')});
    }
  }
  
  
     
});