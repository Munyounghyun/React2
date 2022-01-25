const express = require("express"); //express 모듈 가져옴
const app = express();
const port = 5000;

//mongodb+srv://fldh3369:cldrn5623@cluster0.3rvhs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://fldh3369:cldrn5623@cluster0.3rvhs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
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
  res.send("Hello World! 안녕하세요");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
