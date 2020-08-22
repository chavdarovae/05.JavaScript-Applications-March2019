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

  function clearInputForm() {
    $('#username').val('');
    $('#password').val('');
  };

  return {
    register,
    login,
    logout,
    saveSession,
    isAuth,
    clearInputForm
  }
})()