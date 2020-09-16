import mongoose from "mongoose";

// Create Schema

const CategorySchema = new mongoose.Schema({
    categoryName:{
        type: String,
        defalut: "미분류",
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post", //post schema 참조
        }
    ]
});


const Category = mongoose.model("category", CategorySchema);


export default Category;
