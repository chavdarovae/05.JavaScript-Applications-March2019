const handlers = {}

$(() => {
  const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');
    // home page routes
    this.get('/index.html', handlers.getHome);
    this.get('/', handlers.getHome);
    this.get('#/home', handlers.getHome);

    // user routes
    this.get('#/register', handlers.getRegister);
    this.get('#/login', handlers.getLogin);

    this.post('#/register', handlers.registerUser);
    this.post('#/login', handlers.loginUser);
    this.get('#/logout', handlers.logoutUser);

    // additional routes
    this.get('#/carListings', handlers.getCarListings);
    this.get('#/myListings', handlers.getMyListings);
    this.get('#/createListing', handlers.getCreateListings);
    this.get('#/details/:id', handlers.getDetails);
    this.get('#/edit/:id', handlers.getEditCar);
    this.get('#/delete/:id', handlers.deleteCar);

    this.post('#/createListing', handlers.createListing);
    this.post('#/edit/:id', handlers.editCar);

    
  });
  app.run('#/home');
});