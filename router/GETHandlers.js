const db = require('../db-controller');

function indexRouteHandler(req, res) {
  const flashStatus = req.flash('indexStatus');
  const products = db.getProducts();
  const skills = db.getSkills();
  const isUserAuth = db.isUserAuth();

  return res.render('./pages/index', { 
    products,
    skills,
    userauth: isUserAuth, 
    msgemail: flashStatus.length ? flashStatus : null
  });
}

function registerGETHandlers(router) {
  router.get('/', indexRouteHandler);
  router.get('/index', indexRouteHandler);
  
  router.get('/login', function (req, res) {
    const flashStatus = req.flash('loginStatus');
    const isUserAuth = db.isUserAuth();

    if (isUserAuth) {
      return res.redirect('/admin');
    }

    return res.render('./pages/login', { 
      msglogin: flashStatus.length ? flashStatus : null 
    });
  });

  router.get('/logout', function (req, res) {
    db.logoutUser();

    req.flash('loginStatus', 'Всего хорошего! :)');
    return res.redirect('/login');
  })
  
  router.get('/admin', function (req, res) {
    const flashLoginStatus = req.flash('loginStatus');
    const flashSkillsStatus = req.flash('skillsStatus');
    const flashUploadStatus = req.flash('uploadStatus');
    const isUserAuth = db.isUserAuth();

    if (!isUserAuth) {
      req.flash('loginStatus', 'Пожалуйста, авторизируйтесь!');
      return res.redirect('/login');
    }

    return res.render('./pages/admin', { 
      msgauth: flashLoginStatus.length ? flashLoginStatus : null,
      msgskill: flashSkillsStatus.length ? flashSkillsStatus : null,
      msgfile: flashUploadStatus.length ? flashUploadStatus : null
    });
  });
}

module.exports = {
  registerGETHandlers: registerGETHandlers
}