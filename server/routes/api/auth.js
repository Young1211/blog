import express from "express";
import bcrypt from "bcryptjs"; //인증
import jwt from "jsonwebtoken"; //토큰
import auth from "../../middleware/auth"; //미들웨어
import config from "../../config/index";

const {JWT_SECRET} = config; //bcrypt를 사용하기 위해서는 secret값 필요!

//Model
import User from "../../models/user";

const router = express.Router();

//로그인 
// @route POST api/auth - 로그인 post router
// @desc Auth user -- 유저 인증
// @access Public

//로그인은 모든 사람이 접근할 수 있어야 한다!
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요" });
  }
  // Check for existing user
  User.findOne({ email }).then((user) => { //괄호에 user가 아니라 result라고 적어도 됨
    if (!user)  
      return res.status(400).json({ msg: "유저가 존재하지 않습니다." });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
        //user가 존재한다면 password 검증 
      if (!isMatch) //두 개의 값이 일치하지 않는다면 
        return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
      jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: "2 days" },//기한
        (err, token) => {
          if (err) throw err;
          res.json({
            token, //토큰
            user: {
              id: user.id, //user 모델에서 찾은 결과값
              name: user.name,
              email: user.email,
              role: user.role, //개발자만 글을 쓸 수 있게 role 반환!
            },
          });
        }
      );
    });
  });
});

//로그아웃-상태는 리덕스 사가로 관리

router.post("/logout", (req,res)=>{
    res.json("로그아웃 성공")
});


router.get("/user", auth, async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        if (!user) throw Error("유저가 존재하지 않습니다");
        res.json(user);
    }catch(e){
        console.log(e);
        res.status(400).json({msg: e.message});
    }
})

export default router;



/*

* password와 userpassword의 차이
password -> 현재 로그인하고자 하는 사람이 입력한 password
user.password -> 이메일을 통해서 찾은 결과값의 password

*user.id 
->user 모델에서 찾은 결과값

*토큰값은 매번 로그인할 때마다 변화함. 

*findone
-한 명의 유저를 찾는 것이기 때문에 fineone 사용


*/