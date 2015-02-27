var inbox = require("inbox");
var secret = require("./.secret");

var client = inbox.createConnection(false, "imap.gmail.com", {
  secureConnection: true,
    auth:{
      user: secret.gmail.mail,
      pass: secret.gmail.pass
    }
});

client.connect();

client.on("connect", function(){
  client.openMailbox("INBOX", function(error, info){
    if(error) throw error;

    client.listMessages(-10, function(err, messages){
      messages.forEach(function(message){
        console.log(message.UID + ": " + message.title);
      });
    });

  });
  client.on("new", function(message){
    console.log("New incoming message " + message.title);
  });
});
