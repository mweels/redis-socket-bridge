var io = require('socket.io')(3000);
var redis = require("redis")
var subscriber = redis.createClient({host: 'server1'})
var _clients =  [];
var _socket;

subscriber.on("message", function(channel, message) {    
    _clients.forEach(function(client) {
       client.subs.forEach(function(sub){
          if (sub == channel) {
                client.socket.emit(channel,message + "::" + _clients.length);   
          }         
       });
    });
});
io.on('connection', function (socket) {
    console.log(socket.id);
    _socket = socket;
    var client = {
        socket : socket,
        subs : []
    };  
    _clients.push(client);
    socket.on('disconnect', function () {
        client.subs.forEach(function(key) {
            if (!subscribersLeft(key))
                subscriber.unsubscribe(key);                     
        });        
        _clients.splice( _clients.indexOf(client), 1);        
    });       
    _socket.on('subscribe',function(data) {
        client.subs.push(data.key);
        subscriber.subscribe(data.key);  
    });    
});


    refreshStatus();
function refreshStatus() {
    setTimeout(function() {
        status();
        refreshStatus();
    },200);
    }

 function status() {
     
     console.log("Clients Active : " + _clients.length);
     for (var i = 0 ;i < _clients.length; i++) {
         
          console.log("----------------------");
          console.log("Client : " + i);     
          if (_clients[i] && _clients[i].subs)
          {     
        for (var y = 0 ;y < _clients[i].subs.length; y++) {
            console.log(_clients[i].subs[y]);
        }   
          }
          console.log("----------------------");
 }
 }

 function subscribersLeft (key) {
     var l=false;
     _clients.forEach(function(client) {
       client.subs.forEach(function(sub){
           if (sub===key)
            l=true;
       });
     });
     return l;
 }
  
