const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const db = low(new FileSync('db.json'))

const initalState = {
  products: [
    {
      "src": "./assets/img/products/Work1.jpg",
      "name": "Вино вдохновение",
      "price": 600
    },
    {
      "src": "./assets/img/products/Work2.jpg",
      "name": "Вино вдохновение",
      "price": 600
    },
    {
      "src": "./assets/img/products/Work3.jpg",
      "name": "Вино вдохновение",
      "price": 600
    },
    {
      "src": "./assets/img/products/Work4.jpg",
      "name": "Вино вдохновение",
      "price": 600
    },
    {
      "src": "./assets/img/products/Work5.jpg",
      "name": "Вино вдохновение",
      "price": 600
    },
    {
      "src": "./assets/img/products/Work6.jpg",
      "name": "Вино вдохновение",
      "price": 600
    },
    {
      "src": "./assets/img/products/Work7.jpg",
      "name": "Вино вдохновение",
      "price": 600
    },
    {
      "src": "./assets/img/products/Work8.jpg",
      "name": "Вино вдохновение",
      "price": 600
    },
    {
      "src": "./assets/img/products/Work9.jpg",
      "name": "Вино вдохновение",
      "price": 600
    }
  ],
  skills: [
    {
      "id": 0,
      "number": 12,
      "text": "Возраст начала занятий на скрипке"
    },
    {
      "id": 1,
      "number": 76,
      "text": "Концертов отыграл"
    },
    {
      "id": 2,
      "number": 30,
      "text": "Максимальное число городов в туре"
    },
    {
      "id": 3,
      "number": 20,
      "text": "Лет на сцене в качестве скрипача"
    }
  ],
  accounts: [
    {
      "email": "archipov@gmail.com",
      "password": "archipov"
    },
    {
      "email": "admin@gmail.com",
      "password": "admin"
    },
    {
      "email": "some.user@gmail.com",
      "password": "some_user"
    }
  ],
  user: {}, 
  feedbacks: [], 
}

function init(defaults) {  
  defaults 
  ? db.defaults(defaults)
      .write()
  : db.defaults(initalState)
      .write()

  db.set('user', {})
    .write();
}

function addFeedback(feedback) {
  db.get('feedbacks')
    .push(feedback)
    .write();
}

function authUser(user) {
  db.set('user.email', user.email)
    .set('user.password', user.password)
    .write();
}

function logoutUser(user) {
  db.set('user', {})
    .write();
}

function updateSkills(skills) {
  Object.keys(skills).forEach((key, index) => {
    db.get('skills')
      .find({ id: index })
      .assign({ number: +skills[key] })
      .write();
  });
}

function addProduct(product) {
  db.get('products')
    .push(product)
    .write();
}

function isUserAuth() {
  const user = 
    db.get('user')
      .value();

  return !!user.email && !!user.password
}

function getProducts() {
  return db.get('products')
    .value();  
}

function getSkills() {
  return db.get('skills')
    .value();  
}

function checkUser({ email, password }) {
  const authUser = 
    db.get('accounts')
      .find({ email, password })
      .value();

  return !!authUser;
}

module.exports = {
  init,
  addFeedback,
  isUserAuth,
  checkUser,
  authUser,
  logoutUser,
  updateSkills,
  addProduct,
  getProducts,
  getSkills
}