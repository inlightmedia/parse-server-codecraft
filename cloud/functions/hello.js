Parse.Cloud.define('hello', function(req, res) {
  res.success('world');
});

Parse.Cloud.define('ping', function(req, res) {
  res.success('pong');
});