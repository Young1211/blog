
//글 쓰기 모듈 

import mongoose from "mongoose";
import moment from "moment";


const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, //필수 입력 값
    index: true,
  },
  contents: {
    type: String,
    required: true, //필수 입력 값 
  },
  views: {
    type: Number,
    default: -2, //처음 본 사람의 조회수를 제외하기 위해 기본값을 2로 설정
  },
  fileUrl: {
    type: String,
    default: "http://source.unsplash.com/random/301x201",//이미지를 랜덤으로 불러옴
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  comments: [ //포스트 안에 여러 가지를 쓸 수 있어서 배열로 설정
    {
     type: mongoose.Schema.Types.ObjectId,
     ref: "comment",
    },
  ],
  creator: { //작성자
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", //user와 연결 
  },
});


const Post = mongoose.model("post", PostSchema);

export default Post;


/*

ref 
-서로 간에 참조를 할 때는 ref(User.js)에서 동일하게 맞춰줘야 함

$ref
-참조할 도큐먼트가 존재하는 컬렉션의 이름



*/