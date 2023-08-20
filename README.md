# Strapi CDN Prefix Plugin

This Strapi plugin allows you to automatically prepend a CDN link to your image URLs on both Admin Panel and API's.

## ⚙️ Installation

```bash
#  NPM
npm install strapi-plugin-cdn-prefix

# Yarn
yarn add strapi-plugin-cdn-prefix
```

## 🌐 Environment Configuration

For the plugin to work correctly, you need to add specific environment variables to your Strapi project. Add the following to your `.env` file:

```bash
#  .env
CDN_DOMAIN=cdn.example.com
CDN_IMAGES_BASE_PATH=https://cdn.example.com/images/uploads
```

## 🚀 Usage

Once the plugin is installed and configured:

1. Upload a new image or use an existing one from the Media Library.
2. The image URL will automatically have the CDN base path prepended.
   For example, if the image's path is /uploads/image.jpg, the output will be https://yourcdnlink.com/uploads/image.jpg.
