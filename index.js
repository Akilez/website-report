var hapi = require("hapi");

var server = new hapi.Server();
server.connection({port:8000});

var io = require('socket.io')(server.listener);

io.on('connection', function (socket) {
  console.log("Client connected!");
  socket.emit('Oh hii!');
  socket.emit('event', { some: 'data' });
  socket.on('burp', function () {
    socket.emit('Excuse you!');
    console.log("whew!");
  });

  var sp = require('wordsworth').getInstance();

  sp.initialize('seed.txt','training.txt', function() {

    console.log('Initialized!');
    request('http://www.ulc.org', function(error, response, body) {
      //console.log(body);
      /*checker.check(body, function(error, result) {
      if (error) console.log(error);
      console.log(result);
      });
      checker.check('This is an exmaple', function(err, result) {
      console.log(result);
      });
      teacher.check(body, function(err, result){
      console.log(result);
      });
      //console.log(sp.analyze(body));

      xml2js(body, function (err, result) {
        console.log(result);
      });*/

      var doc = $.parseHTML(body);
      console.log(doc);
      var StrippedString = body.replace(/<script([\S\s]*?)>([\S\s]*?)<\/script>/ig,"");
      StrippedString = StrippedString.replace(/(<style(.*)>[A-Za-z0-9{}\-:;%,()\[\]\s\.#=*/+"'!><@\\_]*<\/style>)/ig,"");
      StrippedString = StrippedString.replace(/(<([^>]+)>)/ig,"\n");
      StrippedString = StrippedString.replace(/(&[^\s]*;)[st]/ig,"");
      //console.log(StrippedString);
    });
  });
  /*var pageUrl = "http://www.ulc.org/category/medical-marijuana/"
  var baseUrl = "http://www.ulc.org/"

  plc.check(pageUrl, baseUrl, function (err, responses) {
    var links = [];
    responses = responses.filter(function (response) {
      if (links.indexOf(response.link.href) < 0 && response.request.statusCode == 200) {
        links.push(response.link.href);
      }
      return response.request.statusCode !== 200
    });

    console.log("Broken links:", responses);
    console.log("(valid) Link List: ", links)
  });*/
});

server.start(function() {
  console.log("Server is started!");
});

server.views({
  path: "views/templates",
  layoutPath: "views",
  layout: "default",
  engines: {
    html: require("handlebars")
  },
  isCached:false,
  context: {
    dev: true
  }
});

server.route(require("./routes"));
