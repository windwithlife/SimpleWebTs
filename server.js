const express = require('express')
const next = require('next')
const CONFIG = require('./config')

const port = parseInt(process.env.PORT, 10) || 3000
console.log("now env===>" + process.env.NODE_ENV);
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var bodyParser=require('body-parser');
const rewrite = require('express-urlrewrite');

let project = CONFIG.getInitConfig().LOCATION_PREFIX;
let regString = '^\\/' + project + '\\/?(.*)';
console.log(regString)
let reg = new RegExp(regString);
app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({extended:true}));
    //server.use(rewrite(/^\/xauth\/?(.*)/,'/$1'));
    server.use(rewrite(reg,'/$1'));
    server.get('/a', (req, res) => {
      return app.render(req, res, '/b', req.query)
    })

    

    server.post('/gitPushHook', (req, res) => {
        console.log(req.body);
        res.sendStatus(200)
    });
;

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
