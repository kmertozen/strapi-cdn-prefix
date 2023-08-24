"use strict";

const CDNKEY = process.env.CDN_IMAGES_BASE_PATH || "";

const replaceUploadsWithCdnFindOne = (obj) => {  
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = replaceUploadsWithCdnFindOne(obj[i]);
      }
    } else if (typeof obj === "object" && obj !== null) {
      for (let key in obj) {
        if (typeof obj[key] === "string" && obj[key].startsWith("/uploads") && key === "url") {
            obj[key] = obj[key].replace(/\/uploads/g, CDNKEY);
        } else {
            obj[key] = replaceUploadsWithCdnFindOne(obj[key]);
        }
      }
    }
    return obj;    
} 

const replaceUploadsWithCdnFindMany = (obj) => {  
  if(obj?.model?.uid == "plugin::upload.file"){
    if (obj.result.length > 0) {
      obj["result"].forEach((result, i) => {
        obj["result"][i]["url"] = obj["result"][i]["url"].replace(/\/uploads/g, CDNKEY);;
      });
    }
  }
} 

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },

  replaceUploadsWithCdnFindOne(obj) {
    return replaceUploadsWithCdnFindOne(obj);
  },

  replaceUploadsWithCdnFindMany(obj) {
    return replaceUploadsWithCdnFindMany(obj)
  },
});
