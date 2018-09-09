const db = require('../db-controller');

db.init();

function registerPOSTHandlers(app) {
  app.post('/', function (req, res) {
    const { name, email, message } = req.body;

    if (!name || !email) {
      req.flash('indexStatus', 'Пожалуйста, заполните обязательные поля.');
      return  res.status(400).redirect('/');
    }

    db.addFeedback({ name, email, message });
    
    req.flash('indexStatus', 'Спасибо за Ваш отзыв! :)');
    return res.status(200).redirect('/');
  });

  app.post('/login', function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash('loginStatus', 'Введите все данные пользователя!');
      return res.status(400).redirect('/login');
    }

    db.saveUser({ email, password });

    req.flash('loginStatus', 'Вы успешно авторизированы!');
    return res.status(200).redirect('/login');
  });

  app.post('/admin/skills', function (req, res) {
    const { age, concerts, cities, years } = req.body;

    if (!age || !concerts || !cities || !years) {
      req.flash('skillsStatus', 'Пожалуйста, заполните все поля.');
      return res.status(400).redirect('/admin');
    }

    db.updateSkills({ age, concerts, cities, years });

    req.flash('skillsStatus', 'Счётчики обновлены!');
    return res.status(200).redirect('/admin');
  });

  app.post('/admin/upload', function (req, res) {
    const { photo, name, price } = req.body;

    if (!photo || !name || !price) {
      req.flash('uploadStatus', 'Пожалуйста, заполните все поля.');
      return res.status(400).redirect('/admin');
    }

    db.addProduct({ photo, name, price });
    
    req.flash('uploadStatus', 'Продукт успешно сохранён!');
    return res.status(200).redirect('/admin');
  });

}

module.exports = {
  registerPOSTHandlers: registerPOSTHandlers
}