const petService = (() => {

  function getAllPets() {
    return kinvey.get('appdata', 'pets?query={}&sort={"likes": -1}', 'kinvey')
  }

  function getMyPets() {
    return kinvey.get('appdata', `pets?query={"_acl.creator":"${sessionStorage.getItem('creator')}"}&sort={"likes": -1}`, 'kinvey')
  }

  function getPetById(id) {
    return kinvey.get('appdata', `pets/${id}`, 'kinvey')
  }

  function likePet(id, data) {
    return kinvey.update('appdata', `pets/${id}`, 'kinvey', data)
  }

  function createPet(data) {
    return kinvey.post('appdata', 'pets', 'kinvey', data)
  }

  function deletePet(id) {
    return kinvey.remove('appdata', `pets/${id}`, 'kinvey')
  }

  function saveDetails(id, data) {
    return kinvey.update('appdata', `pets/${id}`, 'kinvey', data)
  }

  function getAllCats() {
    return kinvey.get('appdata', 'pets?query={"category": "Cat"}&sort={"likes": -1}', 'kinvey')
  }

  
  function getAllDogs() {
    return kinvey.get('appdata', 'pets?query={"category": "Dog"}&sort={"likes": -1}', 'kinvey')
  }
  
  function getAllParrots() {
    return kinvey.get('appdata', 'pets?query={"category": "Parrot"}&sort={"likes": -1}', 'kinvey')
  }

  function getAllReptiles() {
    return kinvey.get('appdata', 'pets?query={"category": "Reptile"}&sort={"likes": -1}', 'kinvey')
  }

  function getAllOther() {
    return kinvey.get('appdata', 'pets?query={"category": "Other"}&sort={"likes": -1}', 'kinvey')
  }

  return {
    getAllPets,
    getMyPets,
    getPetById,
    likePet,
    createPet,
    deletePet,
    saveDetails,
    getAllCats,
    getAllDogs,
    getAllParrots,
    getAllReptiles,
    getAllOther
  }
})()