const express = require("express"); //express 모듈 가져옴
const app = express();
const port = 5000;

const bodyParser = require("body-parser");

const config = require("./config/key");

const { User } = require("./models/User");

//application/x--www-form-urlencoded 를 분석해서 가져올수있게함
app.use(bodyParser.urlencoded({ extended: true }));
//application/json json타입을 분석해서 가져올수있게함
app.use(bodyParser.json());

const mongoose = require("mongoose");
const { request } = require("express");
mongoose
  .connect(
    config.mongoURI
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // } //에러방지?오히려 에러남
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("새해복 많이받으세요");
});

//회원가입
app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

//로그인
app.post("/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: request.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀0번호 인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      //비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {});
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
