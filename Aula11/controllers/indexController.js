const Users = require('../sequelize').Users;
var jwt = require('jsonwebtoken');

function generateAccessToken(email, password) {
    var token = jwt.sign({ email, password }, process.env.TOKEN_SECRET, 
        { expiresIn: '18000s' });
    console.log(token);
    return token;
}

exports.signup = function (req, res, next) {
    var { email } = req.body;
    var { password } = req.body;

    Users.findOne({
        where: {
            email: email
        }
    }).then(result => {
        if (result == null) {
            Users.create({ 'email': email, 'password': password })
                .then(user => {
                    var token = generateAccessToken(email, password);
                    req.session.user = user;
                    req.session.token = token;
                    res.redirect('/profile');
                });
        }
        else {
            req.flash('signupMessage', 'That e-mail is already taken.'); // req.flash is the way to set flashdata using connect-flash                   
            res.redirect('/signup');
        }
    }).catch(function (err) {
        // handle error;
        req.flash('signupMessage', err); // req.flash is the way to set flashdata using connect-flash                   
        res.redirect('/signup');
    });
}


exports.login = function (req, res, next) {
    var { email, password } = req.body;
         Users.findOne({
            where: {
                email: email
            }
    }).then(user => {
        if (user == null) {
            req.flash('loginMessage', 'No user found with that e-mail.'); // req.flash is the way to set flashdata using connect-flash
            res.redirect('/login');
        }
        else if (user.password != password) {
            req.flash('loginMessage', 'Oops! Wrong password.'); // create the loginMessage and save it to session as flashdata{
            res.redirect('/login');
        } else {
            const token = generateAccessToken(email, password);
            req.session.user = user;            
            req.session.token = token;           
            console.log(token);
            res.redirect('/profile');
            //res.cookie('access_token', token, {
            //    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            //}).redirect('/profile');
        }
    }).catch(function (err) {
        // handle error;
        req.flash('loginMessage', err); // req.flash is the way to set flashdata using connect-flash                   
        res.redirect('/login');
    });
}