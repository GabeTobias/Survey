const { User } = require('../models/user');
const bcryptjs = require('bcryptjs');

exports.getLogin = async (req, res) => {
  res.render('auth/login.ejs', { error: "" });
}

exports.getRegister = async (req, res) => {
  res.render('auth/register.ejs', { passwordMatch: true, emailExists: false });
}

exports.postRegister = async (req, res) => {
  let form = req.body;
  let hash = await bcryptjs.hash(form.password, 10);

  let newUser = new User({
    Email: form.email,
    Password: hash
  });

  if(form.password != form.passwordConfirm) {
    return res.render('auth/register.ejs', { passwordMatch: false, emailExists: false });
  } else {
    try {
      await newUser.save();
    } catch(err) {
      return res.render('auth/register.ejs', { passwordMatch: true, emailExists: err.code === 11000 });
    }
  }

  res.redirect('/login');
}

exports.postLogin = async (req, res) => {
  let form = req.body;
  
  const user = await User.findOne({ Email: form.email });
  if(!user){
    return res.render('auth/login.ejs', { error: "No user with that email was found" });
  }
  
  let passwordMatch = await bcryptjs.compare(form.password, user.Password);
  if(!passwordMatch){
    return res.render('auth/login.ejs', { error: "Incorrect password" });
  }

  req.session.user = user;

  res.redirect('/admin');
}

exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    req.session.user = undefined;
    res.redirect('/login')
  });
}