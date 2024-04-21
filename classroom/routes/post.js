const express = require("express");
const  app = express();
const router =express.Router();

// posts
// index route
router.get("/posts",(req,res)=>{
    res.send("get for posts");
});

// show route
router.get("/posts/:id",(req,res)=>{
    res.send("show for post");
});
// create route
router.post("/posts",(req,res)=>{
    res.send("create for post");
});
//delete route
router.delete("/users/:id",(req,res)=>{
    res.send("delete for post");
});

module.exports= router;