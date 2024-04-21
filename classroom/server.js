const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
 //const cookieParser = require("cookie-parser");
 const session = require("express-session");
 const path = require("path");
 const flash = require("connect-flash");
 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
 //app.use(cookieParser());


 /* app.get("/getcookies",(req,res)=>{
    res.cookie("greet","namaste");
    res.cookie("madeIn","india");
    let {name ="anonymous"}=req.cookies;

    res.send(`hi ,${name}`);
});
*/

const sessionOptions = {
    secret:"mysupersecretstring" ,
     resave:false,
     saveUninitialized:true,
};
app.use(session(sessionOptions));
app.use(flash());

app.get("/register",(req,res)=>{
  let {name = "anonymous"} = req.query;
  req.session.name = name;
  if(name ==="anonymous"){
    req.flash("error","user not registered");
  }
  else{
  req.flash("success","user registered successfully");
  }
  res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errMsg = req.flash("error");
    res.render("page.ejs",{name: req.session.name});
});


app.get("/test",(req,res)=>{
    res.send("test successful");
});

app.get("/reqCount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    res.send(`you sent a request ${req.session.count} times`);
});

app.use("/users",users);
app.use("/posts",posts);


app.listen(3000,()=>{
    console.log("server is listening to port");
});