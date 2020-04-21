const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
const port = process.env.PORT || 8080;

// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

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

app.listen(port);

