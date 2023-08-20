"use strict";

const CDNDOMAIN = process.env.CDN_DOMAIN || "";

module.exports = ({ strapi }) => {
  const pluginMiddleware = {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "img-src": ["'self'", "data:", "blob:", CDNDOMAIN],
          "media-src": ["'self'", "data:", "blob:", CDNDOMAIN],
          upgradeInsecureRequests: null,
        },
      },
    },
  };

  const merge = (target, source) => {
    for (const key of Object.keys(source)) {
      if (Array.isArray(source[key])) {
        Object.assign(source[key], [
          ...new Set(target[key].concat(source[key])),
        ]);
      }

      if (source[key] instanceof Object && !Array.isArray(source[key])) {
        Object.assign(source[key], merge(target[key], source[key]));
      }
    }

    Object.assign(target || {}, source);

    return target;
  };

  for (let index = 1; index < strapi.config.middlewares.length; index++) {
    let item = strapi.config.middlewares[index];

    if (typeof item === "object" && item.name === "strapi::security") {
      let mergedSettings = merge(item.config, pluginMiddleware.config);
      strapi.config.middlewares.splice(index, 1, {
        name: "strapi::security",
        config: mergedSettings,
      });
      break;
    } else if (typeof item === "string" && item === "strapi::security") {
      strapi.config.middlewares.splice(index, 1, pluginMiddleware);
      break;
    } else {
      strapi.config.middlewares.push(pluginMiddleware);
      break;
    }
  }
};
