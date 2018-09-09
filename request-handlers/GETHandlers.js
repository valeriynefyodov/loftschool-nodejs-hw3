function registerGETHandlers(app) {
  app.get('/index', function (req, res) {
    const flashStatus = req.flash('indexStatus');

    res.render('./pages/index', { 
      msgemail: flashStatus.length ? flashStatus : null 
    });
  });
  
  app.get('/login', function (req, res) {
    const flashStatus = req.flash('loginStatus');

    res.render('./pages/login', { 
      msglogin: flashStatus.length ? flashStatus : null 
    });
  });
  
  app.get('/admin', function (req, res) {
    const flashSkillsStatus = req.flash('skillsStatus');
    const flashUploadStatus = req.flash('uploadStatus');

    res.render('./pages/admin', { 
      msgskill: flashSkillsStatus.length ? flashSkillsStatus : null,
      msgfile: flashUploadStatus.length ? flashUploadStatus : null
    });
  });
}

module.exports = {
  registerGETHandlers: registerGETHandlers
}