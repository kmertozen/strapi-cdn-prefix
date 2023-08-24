"use strict";

module.exports = ({ strapi }) => {
  const plugin = strapi.plugin("cdn-prefix").service("service");

  strapi.db.lifecycles.subscribe({
    afterFindOne(event) {
      event = plugin.replaceUploadsWithCdnFindOne(event);
    },
    afterFindMany(event) {
      event = plugin.replaceUploadsWithCdnFindMany(event);
    }
  });
};
