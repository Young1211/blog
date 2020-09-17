//회원가입,로그인 처리하는 유저 라우터

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import config from "../../config/index";
const {JWT_SECRET} = config;


//User Model
import User from "../../models/user";

const router = express.Router(); //express에서 router 불러오기

// @routes Get api/user
// @desc Get all user -모든 유저 불러오기
// @access public

//정보를 가져옴! 
router.get("/", async(req,res)=>{
    try{
        const users = await User.find(); //user가 존재한다면 user 모델에서 찾아주세요
        if(!users) throw Error("No users"); //user가 존재하지 않으면 에러 던짐 
        res.status(200).json(users);
    } catch(e){
        console.log(e);
        res.status(400).json({msg: e.message});
    }
});

// @routes  Post api/user
// @desc    Register user -유저 등록
// @access  public


//회원가입 처리
//회원가입 -> 뭔가를 써서 보냄 -> post! 


router.post("/", (req, res) => {
  //console.log(req);  
  const { name, email, password } = req.body; 

  //req.body로 name, email, password를 가지고 온다.

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요" });
  }
  //Check for existing user
  User.findOne({ email }).then((user) => { //이메일을 통해 유저 가입 판별
    if (user) //findOne에서 찾은 값이 then에 들어감
      return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다" });
    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => { //bcrypt-해시를 쉽게 만들어줌. 암호화 
      bcrypt.hash(newUser.password, salt, (err, hash) => { 
        if (err) throw err;
        newUser.password = hash; 
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            JWT_SECRET, //비밀값 
            { expiresIn: 3600 },//만기일-보통 단위 10h(10시간)
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});



export default router;










/*

jwt
--json 형식으로 된 토큰 안에 일정한 정보를 담아서 
로그인을 하거나 글을 작성할 때 인증된 회원만 글을 쓸 수 있도록
토큰을 보내주면 서버에서 이를 인증해서 성공하면 로그인,글 작성을 
할 수 있게 함 
--이를 사용하면 서버에서 유저가 로그인 했는지를 보관할 필요X
--단지 요청이 있을 때 인증된 유저만이 글을 쓸 수 있다고 가정할 때
토큰 값이 유효한 지 판단,접근 여부 허용. 서버측 부담 줄어듦  


*브라우저에서는 express 서버로 정보를 보낼 때 
body에 정보를 넣어서 보냄



*/

