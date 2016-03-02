var userController = require('../users/userController.js');
var photoController = require('../photos/photoController.js');
var stanzaController = require('../stanzas/stanzaController.js');
var helpers = require('./helpers.js');

module.exports = function(app, express) {

  // upload photo to imgur and store link in database
  app.post('/imgUpload',
    photoController.uploadPhoto,
    photoController.savePhotoModelToDB);

  // Fetching photos for the map view and user photos
  app.get('/fetchPhotos/', photoController.fetchPhotos);
  app.get('/fetchLocations/', photoController.fetchLocations);
  app.get('/fetchUserPhotos/', photoController.fetchUserPhotos);
  app.get('/fetchUserFavorites/', userController.fetchFavorites);

  // Deal with Stanzas
  app.post('/saveStanza/', stanzaController.saveStanzaModelToDB);

  // Increment views count on photo and add to Favorites
  app.get('/incrementViews/', photoController.incrementViews);
  app.get('/toggleFavorite/', userController.toggleFavorite);
  app.get('/getPhotoData/', userController.getPhotoData);

  // Sign in and sign up routes
  app.post('/login', userController.login);
  app.post('/signup', userController.signup);
  app.get('/checkJWT/:JWT', userController.checkJWT);

  // Change user information
  app.post('/changePassword', userController.changePassword);
  app.post('/changeUsername', userController.changeUsername);

  // Handle errors for unsupported requests
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
