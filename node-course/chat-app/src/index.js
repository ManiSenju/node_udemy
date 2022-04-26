const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const express = require('express')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/message')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/user')


const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketio(server)

//setup paths
const publicDirPath = path.join(__dirname,'../public')
app.use(express.static(publicDirPath))

io.on('connection',(socket)=>{
    console.log('New Web Socket Connection')
    socket.on('join',(options,callback)=>{
        const {error,user} = addUser({id:socket.id,...options})
        if(error){
            return callback(error)
        }

        socket.join(user.room)
        socket.emit('message',generateMessage('Admin','Welcome!'))
        socket.broadcast.to(user.room).emit('message',generateMessage('Admin',`${user.username} has joined!`))
        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
        callback()   
    })
    socket.on('sendMessage',(msg,callback)=>{
        const user = getUser(socket.id)
        if(!user){
            return callback('Action not allowed')
        }
        const filter = new Filter()
        if(filter.isProfane(msg)){
            return callback('Profanity is not allowed')
        }
        io.to(user.room).emit('message',generateMessage(user.username,msg))
        callback()
    })

    socket.on('sendLocation',(position,callback)=>{
        const user = getUser(socket.id)
        if(!user){
            return callback('Action not allowed')
        }
        io.to(user.room).emit('locationMessage',generateLocationMessage(user.username,`https://google.com/maps?q=${position.latitude},${position.longitude}`))
        callback()
    })

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',generateMessage('Admin',`${user.username} has Left`))
            io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
        }
    })
    
})

app.get('',(req,res)=>{
    res.render('index')
})

server.listen(port,()=>{
    console.log("Server is up and running on "+port)
})