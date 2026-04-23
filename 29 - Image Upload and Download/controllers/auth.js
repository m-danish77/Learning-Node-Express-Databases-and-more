const User = require('../Models/user');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const getSignup = (req, res) => {
  res.render('auth/signup', {
    pageTitle: 'SignUp Page',
    isLoggedIn: false,
    oldInput: { fname: '', lname: '', email: '', userType: '' },
    errors: [],
    user: {},
  });
};
const postSignup = [
  check('fname')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long')
    .matches(/^[a-zA-Z]+$/)
    .withMessage('First name must contain only alphabetic characters'),

  check('lname')
    .matches(/^[a-zA-Z]*$/)
    .withMessage('Last name must contain only alphabetic characters'),

  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),

  check('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).*$/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),

  check('cPassword')
    .trim()
    .custom((value, meta) => {
      // meta is the full object provided by express-validator
      if (value !== meta.req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  check('userType')
    .notEmpty()
    .withMessage('User type is required')
    .isIn(['guest', 'host'])
    .withMessage('Invalid user type'),

  check('terms')
    .notEmpty()
    .withMessage('You must agree to the Terms & Conditions'),

  async (req, res) => {
    const { fname, lname, email, userType, terms, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render('auth/signup', {
        pageTitle: 'SignUp Page',
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { fname, lname, email, userType, terms },
        user: {},
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      userType,
    });
    user
      .save()
      .then(() => {
        res.redirect('/login');
      })
      .catch((err) => {
        return res.status(500).render('auth/signup', {
          pageTitle: 'SignUp Page',
          isLoggedIn: false,
          errors: [err.message],
          oldInput: { fname, lname, email, userType, terms },
          user: {},
        });
      });
  },
];

const getLogin = (req, res) => {
  res.render('auth/login-page', {
    pageTitle: 'Login Page',
    isLoggedIn: false,
    errors: false,
    user: {},
  });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  // find User
  const user = await User.findOne({ email: email });

  // User Not Found
  if (!user) {
    return res.status(401).render('auth/login-page', {
      pageTitle: 'Login Page',
      isLoggedIn: false,
      errors: 'Invalid Email or Password',
      user: {},
    });
  }

  // User Found and matching its password with database stored password
  const doMatch = await bcrypt.compare(password, user.password);

  // if passwords match, create session and redirect
  if (doMatch) {
    req.session.isLoggedIn = true;
    req.session.userId = user._id.toString();

    return req.session.save((err) => {
      if (err) {
        console.log(err.message);
      } else {
        res.redirect('/');
      }
    });
  }

  // if passwords dont match then show errors
  res.status(401).render('auth/login-page', {
    pageTitle: 'Login Page',
    isLoggedIn: false,
    errors: 'Invalid email or password.',
    user: {},
  });
};

const postLogout = (req, res) => {
  req.session.destroy((e) => {
    if (e) {
      console.log(e.message);
      return res.redirect('/');
    }
    res.clearCookie('Danish');
    res.redirect('/');
  });
};

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
};
