// require('./deploy/env');

if(process.env.npm_package_config_ENV) {
  process.env.ENV = process.env.npm_package_config_ENV;
}

const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const myapp = express();
const server = require('http').Server(myapp);
const auth = require('basic-auth');


const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev: process.env.NODE_ENV !== 'production' });

// myapp.get('/', function(req, res, next) {
//   res.sendFile('./deploy/static/coming_soon.html', { root: __dirname });
// });

// myapp.get(/^\/(en|ar)$/, function(req, res, next) {
//   res.sendFile('./deploy/static/coming_soon.html', { root: __dirname });
// });

const authHandler = function(request, response, next) {
  var user = auth(request);

  // if (!user || !admins[user.name++++++++++++++++++++++] || admins[user.name].password !== user.pass) {
  //   response.set('WWW-Authenticate', 'Basic realm="example"');
  //   return response.status(401).send();
  // }

  return next();
};

const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
    app.render(req, res, route.page, query);
});

app.prepare().then(() => {
  // const Sentry  = require('./utils/sentry')({ release: app.buildId }).Sentry
  myapp
    // .use(Sentry.Handlers.requestHandler())
    .use(authHandler)
    .use(
      bodyParser.urlencoded({
        extended: true
      })
    )
    .use(bodyParser.json())
    .use(handler);
  // .use(Sentry.Handlers.errorHandler())
  server.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});

