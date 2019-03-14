const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const WebSocketServer = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set counter for number of users
let onlineUsers = 0;

// Colors to give to users
let userColors = ['#3D50E2', '#6070E8', '#8995EF', '#1A31DB', '#0D20AC'];

wss.on('connection', (ws) => {
  // Sending & Displaying number of online users & assign color
  // Increase counter on connection and send the counter to the NavBar
  onlineUsers += 1;

  let numberOfUsers = JSON.stringify({
    type: "userCountChanged",
    userCount: onlineUsers,
  })

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocketServer.OPEN) {
      client.send(numberOfUsers);
    }
  });

  // give a color to a user
  ws.uniqueColor = userColors[onlineUsers % 5];

  // Receiving a message/notification from the front end
  // Send it back with unique ID and color for the user
  ws.on('message', (message) => {
    let obj = JSON.parse(message)

    switch(obj.type) {
      case "postMessage":
        let uniqueMessage = JSON.stringify({
          id: uuidv1(), 
          username: obj.username, 
          content: obj.content, 
          type: "incomingMessage",
          color: ws.uniqueColor});

        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocketServer.OPEN) {
            client.send(uniqueMessage);
          }
        });
        break;

      case "postNotification":
        let uniqueNotification = JSON.stringify({
          id: uuidv1(), 
          username: obj.username, 
          content: obj.content, 
          type: "incomingNotification"});
      
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocketServer.OPEN) {
            client.send(uniqueNotification);
          }
        });
        break;
        
      case "postImage":
        let image = JSON.stringify({
          id: uuidv1(), 
          username: obj.username, 
          content: obj.content, 
          type: "incomingImage",
          color: ws.uniqueColor});
          wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocketServer.OPEN) {
              client.send(image);
            }
          });
      break;
    }


  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    onlineUsers -= 1;
    console.log(onlineUsers);
  });

});