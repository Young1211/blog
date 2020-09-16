//회원가입,로그인 처리하는 유저 라우터

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import config from "../../config/index";
const {JWT_SECRET} = config;


//Model
import User from "../../models/user";

const router = express.Router();

// @routes Get api/user
// @desc Get all user
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
// @desc    Register   user
// @access  public


//회원가입 처리
//회원가입 -> 뭔 가를 쓰는 것 -> post! 

router.post("/", (res, res) => {
  console.log(req);
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "모든 빌드를 채워주세요" });
  }
  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다" });
    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.getSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 3600 },
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

json 형식으로 된 토큰 안에 일정한 정보를 담아서 
로그인을 하거나 글을 작성할 때 인증된 회원만 글을 쓸 수 있도록
토큰을 보내주면 서버에서 이를 인증해서 성공하면 로그인,글 작성을 
할 수 있게 함 

-> 이를 사용하면 서버에서 유저가 로그인 했는지를 보관할 필요X
-> 단지 요청이 있을 때 인증된 유저만이 글을 쓸 수 있다고 가정할 때
토큰 값이 유효한 지 판단,접근 여부 허용. 서버측 부담 줄어듦  

*/

