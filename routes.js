const routes = require('next-routes')();

routes
  .add({name: 'landing', pattern: '/', page: 'home'})
  .add({name: 'newLanding', pattern: '/filter', page: 'home'});

module.exports = routes;