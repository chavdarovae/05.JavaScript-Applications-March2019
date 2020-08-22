handlers.getDashboard = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  ctx.pets = await petService.getAllPets();
  ctx.pets.forEach(pet => {
    pet.notMyPet = pet._acl.creator !== sessionStorage.getItem('creator');
  });

  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs',
    otherPet: '../templates/otherPet.hbs'
  }).then(function () {
    this.partial('../../templates/dashboard.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.getMyPets = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  ctx.pets = await petService.getMyPets();
  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs',
    myPet: '../templates/myPet.hbs'
  }).then(function () {
    this.partial('../../templates/my-pets.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.getDetailsOtherPet = async function (ctx) {
  try {
    let pet = await petService.getPetById(ctx.params.id);
    ctx.name = pet.name;
    ctx.description = pet.description;
    ctx.imageURL = pet.imageURL;
    ctx.likes = pet.likes;
    ctx._id = pet._id;

    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs',
    }).then(function () {
      this.partial('../../templates/detailsOtherPet.hbs');
    }).catch(function (err) {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
}

handlers.likePet = async function (ctx) {
  try {
    let currPet = await petService.getPetById(ctx.params.id);
    currPet.likes = Number(currPet.likes) + 1;

    petService.likePet(ctx.params.id, currPet).then(function (res) {
      ctx.redirect('#/dashboard');
    })
  } catch (error) {
    console.log(error);
  }
}

handlers.getCreate = function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs'
  }).then(function () {
    this.partial('../../templates/create.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.createPet = function (ctx) {
  let name = ctx.params.name;
  let description = ctx.params.description;
  let imageURL = ctx.params.imageURL;
  let category = ctx.params.category;
  let petObj = { name, description, imageURL, category, likes: 0 };

  petService.createPet(petObj).then(function (res) {
    notifications.showSuccess('Pet created.');
    ctx.redirect('#/home');
  }).catch(function (error) {
    console.log(error);
  });

}

handlers.getDetailsMyPet = async function (ctx) {
  try {
    let pet = await petService.getPetById(ctx.params.id);
    ctx.name = pet.name;
    ctx.description = pet.description;
    ctx.imageURL = pet.imageURL;
    ctx.likes = pet.likes;
    ctx._id = pet._id;

    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs',
    }).then(function () {
      this.partial('../../templates/detailsMyPet.hbs');
    }).catch(function (err) {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
}

handlers.getDeletePet = async function (ctx) {
  try {
    let pet = await petService.getPetById(ctx.params.id);
    ctx.name = pet.name;
    ctx.description = pet.description;
    ctx.imageURL = pet.imageURL;
    ctx.likes = pet.likes;
    ctx._id = pet._id;

    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs',
    }).then(function () {
      this.partial('../../templates/deletePet.hbs');
    }).catch(function (err) {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
}

handlers.deletePet = function (ctx) {
  console.log(ctx.params.id);
  petService.deletePet(ctx.params.id).then(function (res) {
    console.log(res);
    notifications.showSuccess('Pet removed successfully!');
    ctx.redirect('#/home');
  }).catch(function (err) {
    console.log(err);
  })
}

handlers.saveDetails = function (ctx) {

  petService.getPetById(ctx.params.id).then(function (res) {
    let currPet = res;
    console.log(currPet.description);
    currPet.description = ctx.params.description;
    petService.saveDetails(ctx.params.id, currPet).then(function () {
      notifications.showSuccess('Updated successfully!')
      ctx.redirect('#/dashboard');
    }).catch(function (err) {
      console.log(err);
    });
  }).catch(function (err) {
    console.log(err);
  })
}

handlers.getCategoryCats = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  ctx.pets = await petService.getAllCats();
  ctx.pets.forEach(pet => {
    pet.notMyPet = pet._acl.creator !== sessionStorage.getItem('creator');
  });

  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs',
    otherPet: '../templates/otherPet.hbs'
  }).then(function () {
    this.partial('../../templates/dashboard.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.getCategoryDogs = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  ctx.pets = await petService.getAllDogs();
  ctx.pets.forEach(pet => {
    pet.notMyPet = pet._acl.creator !== sessionStorage.getItem('creator');
  });

  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs',
    otherPet: '../templates/otherPet.hbs'
  }).then(function () {
    this.partial('../../templates/dashboard.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.getCategoryParrots = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  ctx.pets = await petService.getAllParrots();
  ctx.pets.forEach(pet => {
    pet.notMyPet = pet._acl.creator !== sessionStorage.getItem('creator');
  });

  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs',
    otherPet: '../templates/otherPet.hbs'
  }).then(function () {
    this.partial('../../templates/dashboard.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.getCategoryReptiles = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  ctx.pets = await petService.getAllReptiles();
  ctx.pets.forEach(pet => {
    pet.notMyPet = pet._acl.creator !== sessionStorage.getItem('creator');
  });

  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs',
    otherPet: '../templates/otherPet.hbs'
  }).then(function () {
    this.partial('../../templates/dashboard.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.getCategoryOther = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  ctx.pets = await petService.getAllOther();
  ctx.pets.forEach(pet => {
    pet.notMyPet = pet._acl.creator !== sessionStorage.getItem('creator');
  });

  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs',
    otherPet: '../templates/otherPet.hbs'
  }).then(function () {
    this.partial('../../templates/dashboard.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}