import app from './app';
import config from './config/index'

const {PORT} = config // .env에 입력한 port 값

app.listen('7000', ()=>{
    console.log(`Server started on Port ${PORT}`); //`` -> 텍스트+변수 섞어서 문장 사용 가능
})





//env 값이 nodemon에서 감지못하도록 되어있어서 
//undefined가 뜸. 서버 재시작 하면 포트 번호가 정상적으로 뜬다!
