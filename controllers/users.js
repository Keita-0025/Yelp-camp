const User = require('../models/user');


module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err)
                return next(err);
            req.flash('success', 'Yelp Campへようこそ!');
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'おかえりなさい');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    console.log('Before delete', req.session);
    delete req.session.returnTo;
    req.session.save((err) => {
        if (err) {
            console.error('Session save error:', err);
        }
        console.log('After delete', req.session);
        res.redirect(redirectUrl);
    });
}


module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        };
        req.flash('success', 'ログアウトしました');
        res.redirect('/campgrounds');
    });
}