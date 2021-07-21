// server/index.js

const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();
var views = 0;
var cookieSession = require('cookie-session')
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cookieSession({
  name: 'session',
  keys: ['key1','key2'],
  maxAge: 30000,
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
}));
//api is the route, req is the request and res is our response
app.get("/test",(req,res,next) => {
  views++;
  res.json({
    message: 'sent the view count',
    views: views + ' views',
    id: req.session.id,
  });
});
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
