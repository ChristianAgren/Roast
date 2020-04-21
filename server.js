const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io')

app.use(express.static(path.join(__dirname, 'build')));
const port = process.env.PORT || 8080;



const routesWithChildren = [
  '/'
];

routesWithChildren.forEach(function (rootPath) {
  app.get(rootPath + '*', function (req, res) {
    // Send or render whatever is appropriate here
    // You can use req.path to get the path that was requested
    // Eg: /dashboard/profile/user5
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
});

// THIS IS LISTEN DON'T GO IN FFS
const server = app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

// Socket setup
const io = socket(server)


// Connection, servern måste vara igång för att front-end ska fungera, front end görs på 3000
io.on('connection', function (socket) {
  console.log('made socket connection', socket.id)
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  })

  socket.on('test', (data) => {
    console.log(data);
  })
})




