module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "./public/style.scss";
        `
      }
    }
  }
};