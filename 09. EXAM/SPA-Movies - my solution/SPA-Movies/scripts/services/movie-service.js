const movieService = (() => {
    function getAllMovies() {
    return kinvey.get('appdata', 'movies', 'kinvey')
  }

  function getMyMovies() {
    return kinvey.get('appdata', `movies?query={"_acl.creator":"${sessionStorage.getItem('creator')}"}`, 'kinvey')
  } 
  
  function createMovie(data) {
    return kinvey.post('appdata', 'movies', 'kinvey', data)
  }

  function getMovieById(id) {
    return kinvey.get('appdata', `movies/${id}`, 'kinvey')
  }

  function buyTickets(id, data) {
    return kinvey.update('appdata', `movies/${id}`, 'kinvey', data)
  }

  function deleteMovie(id) {
    return kinvey.remove('appdata', `movies/${id}`, 'kinvey')
  }

  function editMovie(id, data) {
    return kinvey.update('appdata', `movies/${id}`, 'kinvey', data)
  }

  function movieInputIsValid(obj) {
    let genresPattern = /^[A-Za-z ]{1,}$/;

    if (obj.title.length < 6) {
      notifications.showError('The title should be at least 6 characters long.');
      return false;
    } else if (obj.description.length < 10) {
      notifications.showError('The description should be at least 10 characters long.');
      return false;
    } else if (!(obj.imageUrl.startsWith('http://') || obj.imageUrl.startsWith('https://'))) {
      notifications.showError('The image should start with "http://" or "https://".');
      return false;
    } else if (isNaN(obj.tickets)) {
      notifications.showError('The available tickets should be a number');
      return false;
    } else if (!genresPattern.exec(obj.genres)) {
      notifications.showError('The genres must be separated by a single space.');
      return false;
    }
    return true;
  }

  return {
    getAllMovies,
    getMyMovies,
    createMovie,
    getMovieById,
    buyTickets,
    deleteMovie,
    editMovie,
    movieInputIsValid
  }
})()