handlers.getCarListings = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  try {
    ctx.cars = await carService.getAllCars();
    ctx.isNotEmpty = ctx.cars.length !== 0;
    ctx.cars.forEach(car => {
      car.isCreatedByCurrUser = car._acl.creator === sessionStorage.getItem('creator');
    });

    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs',
      allListingsCard: '../templates/allListingsCard.hbs',
    }).then(function () {
      this.partial('templates/car-listings.hbs');
    }).catch(function (err) {
      notifications.showError(err.responseJSON.description);
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
}

handlers.getMyListings = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  try {
    ctx.cars = await carService.getMyCars();
    ctx.isNotEmpty = ctx.cars.length !== 0;

    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs',
      myListingsCard: '../templates/myListingsCard.hbs',
    }).then(function () {
      this.partial('templates/my-listings.hbs');
    }).catch(function (err) {
      notifications.showError(err.responseJSON.description);
    });
  } catch (error) {
    console.log(error);
  }
}

handlers.getCreateListings = function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs'
  }).then(function () {
    this.partial('templates/create-listing.hbs');
  }).catch(function (err) {
    notifications.showError(err.responseJSON.description);
  });
}

handlers.createListing = function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  let _id = ctx.params._id;
  let brand = ctx.params.brand;
  let description = ctx.params.description;
  let fuel = ctx.params.fuelType;
  let imageUrl = ctx.params.imageUrl;
  let isAuthor = ctx.params.isAuthor;
  let model = ctx.params.model;
  let price = ctx.params.price;
  let seller = sessionStorage.getItem('username');
  let title = ctx.params.title;
  let year = ctx.params.year;
  let carObj = { _id, brand, description, fuel, imageUrl, isAuthor, model, price, seller, title, year };
  
  if(!carService.carValidation(carObj)){
    return;
  }
  carService.createListing(carObj).then(function (res) {
    notifications.showSuccess('listing created.');
    ctx.redirect('#/carListings')
  }).catch(function (err) {
    console.log(err);
  })
}

handlers.getDetails = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  try {
    let currCar = await carService.getCarById(ctx.params.id);
    ctx._id = currCar._id;
    ctx.brand = currCar.brand;
    ctx.description = currCar.description;
    ctx.fuel = currCar.fuel;
    ctx.imageUrl = currCar.imageUrl;
    ctx.isAuthor = currCar.isAuthor;
    ctx.model = currCar.model;
    ctx.price = currCar.price;
    ctx.seller = currCar.seller;
    ctx.title = currCar.title;
    ctx.year = currCar.year;
    ctx.isCreatedByCurrUser = currCar._acl.creator === sessionStorage.getItem('creator');

    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs'
    }).then(function () {
      this.partial('templates/listing-details.hbs');
    }).catch(function (err) {
      notifications.showError(err.responseJSON.description);
    });
  } catch (error) {
    console.log(error);
  }
}

handlers.getEditCar = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  try {
    let currCar = await carService.getCarById(ctx.params.id);
    console.log(currCar);
    ctx._id = currCar._id;
    ctx.brand = currCar.brand;
    ctx.description = currCar.description;
    ctx.fuel = currCar.fuel;
    ctx.imageUrl = currCar.imageUrl;
    ctx.model = currCar.model;
    ctx.price = currCar.price;
    ctx.seller = currCar.seller;
    ctx.title = currCar.title;
    ctx.year = currCar.year;

    if(!carService.carValidation(currCar)){
      return;
    }

    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs'
    }).then(function () {
      this.partial('templates/edit-listing.hbs');
    }).catch(function (err) {
      notifications.showError(err.responseJSON.description);
    });
  } catch (error) {
    console.log(error);
  }
}

handlers.editCar = function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  let _id = ctx.params._id;
  let brand = ctx.params.brand;
  let description = ctx.params.description;
  let fuel = ctx.params.fuelType;
  let imageUrl = ctx.params.imageUrl;
  let isAuthor = ctx.params.isAuthor;
  let model = ctx.params.model;
  let price = ctx.params.price;
  let seller = sessionStorage.getItem('username');
  let title = ctx.params.title;
  let year = ctx.params.year;
  let carObj = { _id, brand, description, fuel, imageUrl, isAuthor, model, price, seller, title, year };

  carService.editCar(ctx.params.id, carObj).then(function (res) {
    notifications.showSuccess(`Listing ${title} updated.`);
    ctx.redirect('#/carListings')
  }).catch(function (err) {
    console.log(err);
  })
}

handlers.deleteCar = function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  carService.deleteCar(ctx.params.id).then(function (res) {
    notifications.showSuccess('Listing deleted.');
    ctx.redirect('#/carListings')
  }).catch(function (err) {
    console.log(err);
  })
}