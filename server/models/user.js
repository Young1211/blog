import moment from 'moment'
import mongoose from 'mongoose'

//유저에 관련된 모듈 만듦

//Create Schema 
const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true, //이메일로 신규,기존 유저 식별 -> 중복값 입력X
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["MainJuin", "SubJuin", "User"], //개발자만 글 작성 가능
        defalut:"User",
    },
    register_date:{ //가입일자
        type: Date,
        defalut: moment().format("YYYY-MM-DD hh:mm:ss") //2020-09-16
    },
    comments: [ //댓글 
        {
            post_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "posts",
            },
            comment_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "posts",
            },
        },
    ],
    post: [ //게시글 
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "posts", 
            
        },
    ],



});

const User = mongoose.model("user", UserSchema); //userschema를 user라고 사용하겠다
export default User; //모듈화해서 내보냄

/*

*유저 한 사람이 많은 수의 게시글을 쓸 수 있고, 
많은 수의 댓글을 달 수 있다 -> 일대다 관계!

*post 하나에 고유 아이디를 갖는다

*게시글을 지우고, 게시물에 달린 댓글까지 지울 경우에는
post_id, comment_id를 같이 적어준다 

*moment()
-현지 시간으로 시간을 제공



*/