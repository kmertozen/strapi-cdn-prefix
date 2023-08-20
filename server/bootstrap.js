"use strict";

module.exports = ({ strapi }) => {
  const plugin = strapi.plugin("cdn-prefix").service("service");
  console.log(strapi.config.middlewares[1].config.contentSecurityPolicy);
  strapi.db.lifecycles.subscribe({
    afterFindOne(event) {
      event = plugin.replaceUploadsWithCdn(event);
    },
    afterFindMany(event) {
      event = plugin.replaceUploadsWithCdn(event);
    },
  });
};
