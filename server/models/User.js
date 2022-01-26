const mongoose = require("mongoose");
const bcrpt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

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
    maxlength: 100,
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

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPasssword 1234567 데이터베이스에있는 암호화된 비밀번호
  bcrpt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  //jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // user.id + 'secretToken' = token
  // -> 'secretToken' -> user._id

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  //토큰을 decode한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 token과
    //DB에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
