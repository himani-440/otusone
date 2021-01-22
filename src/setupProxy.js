const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api/token',
    createProxyMiddleware({
      target: 'https://accounts.spotify.com',
      changeOrigin: true
    })
  );
  app.use(
    '/v1/browse/new-releases',
    createProxyMiddleware({
      target: 'https://api.spotify.com',
      changeOrigin: true
    })
  );
  // app.use(
  //   '/maps/api/geocode/json',
  //   createProxyMiddleware({
  //     target: 'https://maps.googleapis.com',
  //     changeOrigin: true
  //   })
  // );
};
