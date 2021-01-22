const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api/token',
    createProxyMiddleware({
      target: 'https://accounts.spotify.com'
    })
  );
  app.use(
    '/v1/browse/new-releases',
    createProxyMiddleware({
      target: 'https://api.spotify.com'
    })
  );
};