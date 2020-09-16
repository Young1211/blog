import express from "express";

//Model
import Post from "../../models/post";

const router = express.Router();


//api/post
router.get("/", async(req, res)=>{
    const postFindReslut = await Post.find();
    console.log(postFindResult, "All Post Get");
    res.json(postFindReslut);
});

router.post("/", async(req, res, next)=>{
    try{
        //console.log(req, "req"); 
        const {title, contents, fileUrl, creator} = req.body;
        const newPost = await Post.create({
            title,//유효성 에러
            contents, //유효성 에러
            fileUrl,
            creator,
        });
        res.json(newPost);
    } catch(e){
        console.log(e);
    }
})

export default router;





/*

* req
-요청, 브라우저에서 서버쪽으로 요청
* res
-응답, 서버에서 브라우저쪽으로 응답 
* body에 내용을 보내서 요청함. 구조 분해 문법(자주 쓰임)
* 몽구스에서 메서드를 사용할 때는 await 사용!
await를 쓰기 싫으면 끝에 .exec() 붙여줌 

find() 함수로 데이터 전체를 가져오면 과부하가 올 수 있어서 조건을 걸어둠

*/

