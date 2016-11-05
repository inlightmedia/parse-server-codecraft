Parse.Cloud.beforeSave("ChatMessage", function(request, response) {
  if (!request.object.get("name") || !request.object.get("name") ) {
    response.error("must have a name and message");
  } else {
    response.success();
  }
});