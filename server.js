const http = require('http')
const app = require('./app')
const express = require("express");
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

const index = require("./routes/index");
app.use(index);

app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    next()
})

const normalizePort = val => {
    const port = parseInt(val,10)
    if(isNaN(port)){return val;}
    if(port>=0){return port;}
    return false
}
const port = normalizePort(process.env.PORT||3000)

app.set('port',port)

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

const errorHandler = error =>{
    if(error.syscall !== 'listen'){
        throw error
    }
    const address = server.address()
    const bind = typeof address ==='string' ? 'pipe' + address : 'port: ' +port
    switch(error.code){
        case 'EACCES':
            console.error(bind + 'require Privilege')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' already use')
            process.exit(1)
            break
        default:
            throw error
    }
}
//const port = (process.env.PORT||3000)
//app.set('port', process.env.PORT||3000)

server.on('error',errorHandler)
server.on('listening', ()=>{
    const address = server.address()
    const bind = typeof address ==='string' ? 'pipe' + address : 'port: ' +port
    console.log('écoute '+ bind)
})

server.listen(port)