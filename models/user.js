const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.plugin(passportLocalMongoose, {
    errorMessages: {
        MissingPasswordError: 'パスワードを入力してください。',
        AttemptTooSoonError: 'アカウントがロックされています。時間を開けて再度試してください。',
        TooManyAttemptsError: 'ログインの失敗が続いてため、アカウントをロックしました。',
        NoSaltValueStoredError: '認証ができませんでした。',
        IncorrectPasswordError: 'パスワードまたはユーザー名が間違っています',
        IncorrectUsernameError: 'パスワードまたはユーザー名が間違っています。',
        MissingUsernameError: 'ユーザー名が与えられていません。',
        UserExistsError: 'そのユーザー名はすでに使われています。別のユーザーで登録しなおしてください。'
    }
});

module.exports = mongoose.model('User', userSchema);