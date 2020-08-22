const carService = (() => {

  function register(username, password) {
    return kinvey.post('user', '', 'basic', {
      username,
      password
    })
  }

  function getAllCars() {
    return kinvey.get('appdata', 'cars', 'kinvey')
  }

  function getMyCars() {
    return kinvey.get('appdata', `cars?query={"_acl.creator":"${sessionStorage.getItem('creator')}"}`, 'kinvey')
  }

  function createListing(data) {
    return kinvey.post('appdata', 'cars', 'kinvey', data)
  }

  function getCarById(id) {
    return kinvey.get('appdata', `cars/${id}`, 'kinvey')
  }

  function editCar(id, data) {
    return kinvey.update('appdata', `cars/${id}`, 'kinvey', data)
  }

  function deleteCar(id) {
    return kinvey.remove('appdata', `cars/${id}`, 'kinvey')
  }

  function carValidation(obj) {

    if (obj.title === '' || obj.title.length > 33) {
      notifications.showError('The title length must not exceed 33 characters or should not be empty!');
      return false;
    } else if (obj.description === '' || obj.description.length < 30 || 450 < obj.description.length) {
      notifications.showError('The description length must not exceed 450 characters and should be at least 30 or should not be empty!');
      return false;
    } else if (obj.model==='' || obj.model.length > 11 || obj.brand==='' || obj.brand.length > 11 || obj.fuel==='' || obj.fuel.length > 11) {
      notifications.showError('The brand,fuelType and model length must not exceed 11 characters or should not be empty!');
      return false;
    } else if (obj.model.length < 4) {
      notifications.showError('The model length should be at least 4 characters or should not be empty!');
      return false;
    } else if (obj.year==='' || obj.year.length < 4) {
      notifications.showError('The year must be only 4 chars long or should not be empty!');
      return false;
    } else if (obj.price==='' ||obj.price > 1000000) {
      notifications.showError('The maximum price is 1000000$ or should not be empty.');
      return false;
    } else if (!obj.imageUrl.startsWith('http') || obj.imageUrl==='') {
      notifications.showError('Link url should always start with “http” or should not be empty.');
      return false;
    }
    return true;
  }

  return {
    register,
    getAllCars,
    getMyCars,
    createListing,
    getCarById,
    editCar,
    deleteCar,
    carValidation
  }
})()