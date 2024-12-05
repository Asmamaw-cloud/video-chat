import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { Console } from "node:console";
import onCall from "./socket-events/onCall.js";
import onWebrtcSignal from "./socket-events/onWebrtcSignal.js";
import onHangup from "./socket-events/onHangup.js"

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

export let io;

app.prepare().then(() => {
  const httpServer = createServer(handler);

  io = new Server(httpServer);
  let onlineUsers = [];

  io.on("connection", (socket) => {
    //add user
    socket.on('addNewUser', (clerkUser) =>{
      clerkUser && !onlineUsers.some(user => user?.userId === clerkUser.id) && onlineUsers.push({
        userId: clerkUser.id,
        socketId: socket.id,
        profile: clerkUser
      })

      //send active users
      io.emit('getUsers', onlineUsers)
    })

    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)

      //send active users
      io.emit('getUsers', onlineUsers)

    })

    //call event
    socket.on('call', onCall) 
    socket.on('webrtcSignal', onWebrtcSignal)
    socket.on('hangup', onHangup )
  });


  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});