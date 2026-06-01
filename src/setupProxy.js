const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api-srf',
    createProxyMiddleware({
      target: 'https://wmtippspiel.srf.ch',
      changeOrigin: true,
      pathRewrite: {
        '^/api-srf': '',
      },
      followRedirects: true
    })
  );
};