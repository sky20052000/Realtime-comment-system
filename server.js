require("dotenv").config();
const express = require("express");
 const cors = require("cors");
const app = express();

app.use(express.static('public'));

 require("./db");
const Comment = require('./models/comment');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Routes 
app.post('/api/comments', (req, res) => {
    const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment
    })
    comment.save().then(response => {
        res.send(response)
    });

});

app.get('/api/comments', (req, res) => {
    Comment.find().then(function(comments) {
        res.send(comments)
    })
});


const server = app.listen(process.env.Port, () => {
    console.log(`Server listening on the:${process.env.Host}:${process.env.Port}`);
})

let io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    // Recieve event
    socket.on('comment', (data) => {
        data.time = Date()
        socket.broadcast.emit('comment', data);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data) ;
    })
})