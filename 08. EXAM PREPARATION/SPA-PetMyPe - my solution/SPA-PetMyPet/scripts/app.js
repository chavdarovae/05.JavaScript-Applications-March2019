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
    this.get('#/dashboard', handlers.getDashboard);
    this.get('#/create', handlers.getCreate);
    this.get('#/myPets', handlers.getMyPets);
    this.get('#/detailsOtherPet/:id', handlers.getDetailsOtherPet);
    this.get('#/detailsMyPet/:id', handlers.getDetailsMyPet);
    this.get('#/like/:id', handlers.likePet);
    this.get('#/delete/:id', handlers.getDeletePet);
    this.get('#/category/all', handlers.getDashboard);
    this.get('#/category/cats', handlers.getCategoryCats);
    this.get('#/category/dogs', handlers.getCategoryDogs);
    this.get('#/category/parrots', handlers.getCategoryParrots);
    this.get('#/category/reptiles', handlers.getCategoryReptiles);
    this.get('#/category/other', handlers.getCategoryOther);

    this.post('#/create', handlers.createPet);
    this.post('#/delete/:id', handlers.deletePet);
    this.post('#/save/:id', handlers.saveDetails);

  });
  app.run('#/home');
});