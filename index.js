var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 3000;

var numUsers = 0;

io.on('connection', function(socket) {
    var addedUser = false;

    console.log('a user connected');

    socket.on('chat-message', function(msg) {
        io.emit('chat-message',{
            message: msg,
            username: socket.username
        });
        console.log(socket.username + ' said: ' + msg);
    });

    socket.on('add-user', function(username) {
        if (addedUser) return;

        socket.username = username;
        ++numUsers;
        addedUser = !addedUser;


        console.log('I just added user: ' + username);
        if (numUsers == 1) {
            console.log('There is ' + numUsers + ' user connected');
        } else {
            console.log('There are now ' + numUsers + " users connected");
        }
    });

    socket.on('remove-user', function(username) {
         delete socket.username;
        --numUsers;
        addedUser = !addedUser;

        console.log('I just removed user: ' + username);
        if (numUsers == 1) {
            console.log('There is ' + numUsers + ' user connected');
        } else {
            console.log('There are now ' + numUsers + " users connected");
        }
        });


    socket.on('disconnect', function () {
        if (addedUser) --numUsers;
        console.log('a user disconnected. There are now: ' + numUsers + ' users.');

    });

});

http.listen(port, function () {
   console.log('listening on port ' + port);
});
