import express from 'express';
import mongoose from "mongoose";
import config from "./config";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
//코드 줄 방향 바꾸기 -> alt + 방향키 

//Routes
import postRoutes from "./routes/api/post";
import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth"; //에러 발생함

import morgan from "morgan";



const app = express();

const {MONGO_URI} = config;

app.use(hpp());
app.use(helmet()); //보안적인 측면 보완해주는 라이브러리

app.use(cors({origin:true, credentials: true})) //브라우저가 다른 도메인이나 포트가 다른 서버에 자원을 요청하도록 하는 것  
app.use(morgan("dev"));

app.use(express.json()); //express 서버에서 json 형태로 해석 요청


mongoose
    .connect(MONGO_URI, { //string,옵션
        useNewUrlParser: true, //옵션을 적어놔야 경고가 안 뜸
        useUnifiedTopology: true,
        useCreateIndex:true,
    })
    .then(()=>console.log("MongoDB connecting Success!!"))
    .catch((e)=>console.log(e))

//Use routes
app.get('/'); // '/'-홈
app.use("/api/post", postRoutes)
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
export default app;
//밖으로 내보내기

//npm run dev로 실행! nodemon 아님(can not find module 에러 발생)
