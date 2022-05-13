<<<<<<< HEAD
//  CUSTOM MIDDLEWARE FUNCTION
const withAuth = (req, res, next) => {
    //if no session is open, redirect to login page
    if (!req.session.user_id) {
      res.redirect('/login');
    //else to to next middleware function
=======
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
>>>>>>> 37ef8606e6164becdaa5cd84bc94613f6329d373
    } else {
      next();
    }
  };
  
  module.exports = withAuth;