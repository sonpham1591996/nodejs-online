const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roleName: {
        type: String,
        require: true
    }
});

// pre
usersSchema.pre('save', function(next) {
    // hash password
    this.password = bcrypt.hashSync(this.password);
    next();
});

// ==>> Lưu ý phần này chỉ là demo - trong thực tế không nên log thông tin nhạy cảm ra.
usersSchema.post('save', function() {
    // hash password
    console.log(this.password);
});

const UsersModel = mongoose.model('users', usersSchema);

module.exports = UsersModel;