const userService = (() => {
    function register(username, password) {
        return kinvey.post('user', '', 'basic', { username, password })
    }

    function login() {

    }

    function logout() {

    }

    return {
        register,
        login,
        logout
    }
})();