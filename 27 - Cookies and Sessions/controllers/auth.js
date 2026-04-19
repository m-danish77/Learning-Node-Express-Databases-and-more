const getLogin = (req, res) => {
  res.render('auth/login-page', {
    pageTitle: 'Login Page',
    isLoggedIn: false,
  });
};

const postLogin = (req, res) => {
  // It creates a session for the user
  // req.session.isLoggedIn = true. The server saves this to MongoDB and sends a Cookie with the Session ID back to the browser along with the Redirect instruction.

  req.session.isLoggedIn = true;

  // The browser receives the Redirect and the Cookie at the same time. It saves the Cookie.
  res.redirect('/');
};

const postLogout = (req, res) => {
  req.session.destroy((e) => {
    if (e) {
      console.log(e.message);
      return res.redirect('/');
    }
    res.clearCookie('session-sid');
    res.redirect('/');
  });
};
module.exports = {
  getLogin,
  postLogin,
  postLogout,
};
