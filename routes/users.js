const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(users.register);

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), users.login);

// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
//     req.flash('success', 'おかえりなさい');
//     let redirectUrl = '/campgrounds'; // デフォルトのリダイレクト先
//     if (req.session.returnTo) {
//         redirectUrl = req.session.returnTo; // returnTo があればその値を使用
//         req.session.returnTo = null; // リダイレクト後に returnTo を削除
//     }
//     req.session.save((err) => {
//         if (err) {
//             console.error('Session save error:', err);
//         }
//         console.log('After setting redirectUrl', redirectUrl);
//         res.redirect(redirectUrl);
//     });
// });


router.get('/logout', users.logout);

module.exports = router;