'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('cdn-prefix')
      .service('myService')
      .getWelcomeMessage();
  },
});
