handlers.getRegister = function (ctx) {
  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs'
  }).then(function () {
    this.partial('../../templates/register.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.getLogin = function (ctx) {
  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs'
  }).then(function () {
    this.partial('../../templates/login.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.registerUser = function (ctx) {
  let username = ctx.params.username;
  let password = ctx.params.password;
  if(username.length<3){    
    userService.clearInputForm();
    notifications.showError('Username must be at least 3 symbols');
    return;
  }else if(password.length<6){    
    userService.clearInputForm();
    notifications.showError('Username must be at least 6 symbols');
    return;
  };
  
  userService.register(username, password).then((res) => {
    userService.saveSession(res);
    userService.clearInputForm();
    notifications.showSuccess('User registration successful.');
    ctx.redirect('#/home');
  }).catch(function (err) {
    userService.clearInputForm();
    notifications.showError(err.responseJSON.description);
  });
}

handlers.logoutUser = function (ctx) {
  userService.logout().then(() => {
    sessionStorage.clear();
    notifications.showSuccess('Logout successful.');
    ctx.redirect('#/home');
  })
}

handlers.loginUser = function (ctx) {
  let username = ctx.params.username;
  let password = ctx.params.password;

  if(username.length<3){    
    userService.clearInputForm();
    notifications.showError('Username must be at least 3 symbols');
    return;
  }else if(password.length<6){    
    userService.clearInputForm();
    notifications.showError('Username must be at least 6 symbols');
    return;
  };

  userService.login(username, password).then((res) => {
    userService.saveSession(res);
    userService.clearInputForm();
    notifications.showSuccess('Login successful.');    
    ctx.redirect('#/home');
  }).catch(function (err) {
    userService.clearInputForm();
    notifications.showError(err.responseJSON.description);
  });
}