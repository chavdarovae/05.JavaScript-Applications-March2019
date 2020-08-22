const userService = (() => {
  function isAuth() {
    return sessionStorage.getItem('authtoken') !== null;
  }

  function saveSession(res) {
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('authtoken', res._kmd.authtoken);
    sessionStorage.setItem('creator', res._acl.creator);
  }

  function register(username, password) {
    return kinvey.post('user', '', 'basic', {
      username,
      password
    })
  }

  function login(username, password) {
    return kinvey.post('user', 'login', 'basic', {
      username,
      password
    });
  }

  function logout() {
    return kinvey.post('user', '_logout', 'kinvey');
  }

  function userRegisterValidation(username, password, repeatPass) {

    if (username.length < 3) {
      notifications.showError('The username should be at least 3 characters long.');
      $('#registerUsername').val('');
      return false;
    } else if (password.length < 6) {
      notifications.showError('The password should be at least 6 characters long.');
      $('#registerPassword').val('');
      ctx.params.password = '';
      return false;
    } else if (repeatPass != null && repeatPass !== password) {
      notifications.showError('The repeat password should be equal to the password.');
      $('#registerPassword').val('');
      $('#registerRepeatPassword').val('');
      ctx.params.repeatPass = '';
      return false;
    }

    return true;
  }

  function userLoginValidation(username, password) {

    if (username.length < 3) {
      notifications.showError('The username should be at least 3 characters long.');
      $('#loginUsername').val('');
      return false;
    } else if (password.length < 6) {
      notifications.showError('The password should be at least 6 characters long.');
      $('#loginPassword').val('');
      ctx.params.password = '';
      return false;
    }
    return true;
  }
  return {
    register,
    login,
    logout,
    saveSession,
    isAuth,
    userRegisterValidation,
    userLoginValidation
  }
})()