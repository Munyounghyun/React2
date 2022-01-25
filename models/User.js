const mongoose = require("mongoose");
const bcrpt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //스페이스바를 없애줌
    unique: 1, //똑같은 걸 사용하지 못하게함
  },
  password: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  //비밀번호를 암호화 시킨다.
  var user = this;
  if (user.isModified("password")) {
    //비밀번호를 바꿀때만 암호화
    bcrpt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrpt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    //비밀번호를 바꾸는게 아니라 다른거를 바꿀때 next()안해주면 멈춰버림
    next(); //
  }
});

userSchema.methods.comparePasssword = function (plainPassword, cb) {
  //plainPasssword 1234567 데이터베이스에있는 암호화된 비밀번호
  bcrpt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
