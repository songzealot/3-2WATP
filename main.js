const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const users = require("./routes/users");
const dbConfig = require("./config/database");
const { Passport } = require("passport");

const app = express();

// 포트
const port = 3000;

// express 서버 구동
app.listen(port, () => {
  console.log(`express server started with port number - ${port}`);
});

// cors 미들웨어
app.use(cors());

//JSON 사용
app.use(express.json());

//URL 인코딩 데이터 활용 미들웨어
app.use(express.urlencoded({ extended: true }));

// 정적 컨텐츠
app.use(express.static(path.join(__dirname, "public")));

// ---- passport ----
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// ---- 라우팅 ----
// 라우팅 - users
app.use("/users", users);

// ---- 몽고DB ----
// 몽고DB 연결
mongoose.connect(dbConfig.db);
mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
});
// 몽고DB 에러 처리
mongoose.connection.on("error", (err) => {
  console.log("mongodb error");
});
