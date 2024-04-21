
const express = require("express");
const  app = express();
const router =express.Router();

router.get("/",(req,res)=>{
    res.send("root route");
});

router.get("/",(req,res)=>{
    res.send("get for users");
});

// show route
router.get("/:id",(req,res)=>{
    res.send("show  for user");
});
// create route
router.post("/",(req,res)=>{
    res.send("create for user");
});
//delete route
router.delete("/:id",(req,res)=>{
    res.send("delete for user");
});

module.exports= router;