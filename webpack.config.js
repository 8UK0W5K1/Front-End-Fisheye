const path = require('path');

module.exports = {
  entry: {
    scripts: [
      './scripts/factories/lightbox.js',
      './scripts/factories/medias.js',
      './scripts/factories/photographer.js',
      './scripts/pages/index.js',
      './scripts/pages/photographerPage.js',
      './scripts/utils/contactForm.js',
      './scripts/utils/fetch.js',
      './scripts/utils/likes.js',
    ],
  },

  output: {
    // filename: '[name].js',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
