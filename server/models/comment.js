
import mongoose from "mongoose";
import moment from "moment";


const CommentSchema = new mongoose.Schema({
    contents:{ //댓글 내용 
        type: String,
        required: true,//내용이 없는 댓글 허용x
    },
    date:{ 
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    creatorName: { type: String}, //작성자 이름 따로 빼놓음
});

const Comment = mongoose.model("comment", CommentSchema);

export default Comment; 
