const userService = (() => {
  function isAuth() {
    return sessionStorage.getItem('authtoken') !== null;
  }

  function isNotAuth() {
    return sessionStorage.getItem('authtoken') === null;
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

  function userValidation(username, password, repeatPass) {
    let usernamePattern = /^[A-Za-z]{3,}$/;
    let passwordPattern = /^[A-Za-z0-9]{6,}$/;

    if (!usernamePattern.exec(username)) {
      notifications.showError('A username should be at least 3 characters long and should contain only english alphabet letters.');
      $('#username').val('');
      return false;
    } else if (!passwordPattern.exec(password)) {
      notifications.showError('A user‘s password should be at least 6 characters long and should contain only english alphabet letters and digits');
      $('#password').val('');
      ctx.params.password='';
      return false;
    } else if (repeatPass != null && repeatPass !== password) {
      notifications.showError('Both passwords must match.');
      $('#repeatPass').val('');
      ctx.params.repeatPass='';
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
    isNotAuth,
    userValidation
  }
})()