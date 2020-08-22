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
  let repeatPass = ctx.params.repeatPass;

  if(!userService.userValidation(username, password, repeatPass)){
    return;
  }

  userService.register(username, password).then((res) => {
    userService.saveSession(res);
    notifications.showSuccess('User registration successful.');
    $('#username').val('');
    $('#password').val('');
    $('#repeatPass').val('');
    ctx.redirect('#/carListings');
  }).catch(function (err) {
    $('#username').val('');
    $('#password').val('');
    $('#repeatPass').val('');
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

  if(!userService.userValidation(username, password)){
    return;
  }
  
  userService.login(username, password).then((res) => {
    userService.saveSession(res);
    $('#username').val('');
    $('#password').val('');
    notifications.showSuccess('Login successful.');
    ctx.redirect('#/home');
  }).catch(function (err) {
    $('#username').val('');
    $('#password').val('');
    notifications.showError(err.responseJSON.description);
  });
}