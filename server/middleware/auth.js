//인증(auth) 미들웨어 

import jwt, { decode } from "jsonwebtoken"; //json web Token 손쉽게 생성, 검증 가능!
import config from "../config/index";
const {JWT_SECRET} = config;


//header에 토큰 값을 집어넣ㄴ느다
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) { //토큰 값이 존재하지 않는다면
    return res.status(401).json({ msg: "토큰 없음. 인증이 거부됨!!!" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "토큰이 유효하지 않습니다." });
  }
};

export default auth;





/*

*인증 미들웨어 
-토큰을 가져오면 토큰을 해석해서 유저와 해석된 값이
 같다고 하면 다음으로 넘어가는 형식 

*/