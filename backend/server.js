const { WebSocketServer } = require('ws');
const crypto = require('crypto');
const http = require('http');

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const port = 443;
const host = '192.168.1.65';
const wsServer = new WebSocketServer({ server });
let clients = {};
let id = 0;

server.listen(port, host ,() => {
  console.log(`WebSocket server is running on port ${port}`);
});

wsServer.on('connection', ws => {
  console.log("New Client")
    ws.id = id++;
    clients[ws.id] = ws;
    ws.on('close', () => {
      delete clients[ws.id];
      sendAllExcept(`delete,${ws.id}`,ws.id)
    })
    ws.on('message', data => {
      sendAllExcept(data,ws.id)
    })
    ws.onerror = function () {
      console.log('websocket error')
    }
})

function sendAllExcept( message, ids ) {
  const users = Object.keys(clients)
  if( undefined === ids ) throw new Error( 'ids must be specified' );
  users.forEach((user)=>{
      if(user != ids){
        clients[user].send(`${message},${ids}`);
      }
  })
}

// wsServer.on('message', (messageAsString) => {
//     console.log("message recieved")
//     const message = JSON.parse(messageAsString);
//     const metadata = clients.get(wsServer);
//     console.log(message)

//     message.sender = metadata.id;
//     message.color = metadata.color;
//     const outbound = JSON.stringify(message);

//     [...clients.keys()].forEach((client) => {
//         client.send(outbound);
//     });
// });

