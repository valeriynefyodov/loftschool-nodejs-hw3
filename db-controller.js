const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const db = low(new FileSync('db.json'))

function init(defaults) {  
  defaults 
  ? db.defaults(defaults)
      .write()
  : db.defaults({ goods: [], user: {}, feedbacks: [], skills: {} })
      .write()
}

function addFeedback(feedback) {
  db.get('feedbacks')
    .push(feedback)
    .write();
}

function saveUser(user) {
  db.set('user.email', user.email)
    .set('user.password', user.password)
    .write();
}

function updateSkills(skills) {
  db.set('skills.age', skills.age)
    .set('skills.concerts', skills.concerts)
    .set('skills.cities', skills.cities)
    .set('skills.years', skills.years)
    .write();
}

function addProduct(product) {
  db.get('goods')
    .push(product)
    .write();
}

module.exports = {
  init,
  addFeedback,
  saveUser,
  updateSkills,
  addProduct
}