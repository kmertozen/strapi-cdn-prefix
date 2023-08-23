"use strict";

const CDNKEY = process.env.CDN_IMAGES_BASE_PATH || "";

const replaceUploadsWithCdn = (obj) => {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = replaceUploadsWithCdn(obj[i]);
    }
  } else if (typeof obj === "object" && obj !== null) {
    for (let key in obj) {
      if (typeof obj[key] === "string" && obj[key].startsWith("/uploads")) {
        obj[key] = obj[key].replace(/\/uploads/g, CDNKEY);
      } else {
        console.log("obj[key] -->", replaceUploadsWithCdn(obj[key]));
        //obj[key] = replaceUploadsWithCdn(obj[key]);
      }
    }
  }
  return obj;
};

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },

  replaceUploadsWithCdn(obj) {
    return replaceUploadsWithCdn(obj);
  },
});
