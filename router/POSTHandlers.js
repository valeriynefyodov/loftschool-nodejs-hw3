const path = require('path');
const db = require('../db-controller');
const { PUBLIC_PATH, IMG_UPLOAD_PATH } = require('../config');

db.init();

function registerPOSTHandlers(router) {
  router.post('/', function (req, res) {
    const { name, email, message } = req.body;

    if (!name || !email) {
      req.flash('indexStatus', 'Пожалуйста, заполните обязательные поля.');
      return  res.status(400).redirect('/');
    }

    db.addFeedback({ name, email, message });
    
    req.flash('indexStatus', 'Спасибо за Ваш отзыв! :)');
    return res.status(200).redirect('/');
  });

  router.post('/login', function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash('loginStatus', 'Введите все данные пользователя!');
      return res.status(400).redirect('/login');
    }
    
    if (!db.checkUser({ email, password })) {
      req.flash('loginStatus', 'Неверный email и/или пароль');
      return res.status(400).redirect('/login');
    }

    db.authUser({ email, password });

    req.flash('loginStatus', 'Вы успешно авторизированы!');
    return res.status(200).redirect('/admin');
  });

  router.post('/admin/skills', function (req, res) {
    const { age, concerts, cities, years } = req.body;

    if (!age || !concerts || !cities || !years) {
      req.flash('skillsStatus', 'Пожалуйста, заполните все поля.');
      return res.status(400).redirect('/admin');
    }

    db.updateSkills({ age, concerts, cities, years });

    req.flash('skillsStatus', 'Счётчики обновлены!');
    return res.status(200).redirect('/admin');
  });

  router.post('/admin/upload', function (req, res) {
    const { name, price } = req.body;

    if (!req.files || !name || !price) {
      req.flash('uploadStatus', 'Пожалуйста, заполните все поля.');
      return res.status(400).redirect('/admin');
    }

    const productImage = req.files.photo;
    const productImageFilename = productImage.name;

    productImage
      .mv(path.join(PUBLIC_PATH, IMG_UPLOAD_PATH, productImageFilename))
      .then(() => {
        db.addProduct({ 
          src: `${IMG_UPLOAD_PATH}/${productImageFilename}`, 
          name, 
          price 
        });
        
        req.flash('uploadStatus', 'Продукт успешно сохранён!');        
        return res.status(200).redirect('/admin');
      })
      .catch(err => {
        req.flash('uploadStatus', 'Ошибка при загрузке файла!');   
        return res.status(400).redirect('/admin');
      });
  });
}

module.exports = {
  registerPOSTHandlers: registerPOSTHandlers
}