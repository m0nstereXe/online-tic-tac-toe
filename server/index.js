// server/index.js

const express = require("express");
const path = require('path');
const session = require('express-session');

const PORT = process.env.PORT || 3001;

const app = express();
var views = 0;
var uuid = 0;
var cookieSession = require('cookie-session')

function genuuid()
{
  uuid++;
  return uuid;
}
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.use(cookieSession({
    name: 'session',
    keys: ['key1','key2'],
    maxAge: 30000,
}));
//api is the route, req is the request and res is our response
app.get("/test",(req,res,next) => {
  views++;
  req.session.id = req.session.id ? req.session.id :  genuuid();
  res.json({
    data: ['sent the view count',views+ ' views',req.session.id],
  });
});
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
