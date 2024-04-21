const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path =require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError= require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash   =   require("connect-flash");
const passport = require("passport");
const LocalStrategy =require("passport-local");
const User = require("./models/user.js");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const MONGO_URL=("mongodb://127.0.0.1:27017/wanderlust");


const sessionOptions = {
    secret:"mySuperSecretCode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    }
};


main().then(()=>{
    console.log("connecting to DB");
}).catch((err)=>console.log(err));

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
 res.send("hi i am root");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req ,res ,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/listings",listingRouter);
app.use("/listings/:id/review",reviewRouter);
app.use("/",userRouter);


app.all("*",(req,res,next)=>{
    next( new ExpressError(404,"Page not found"));
});

app.use((err,req,res,next)=>{
    let {statuscode=500,message="something went wrong"}=err;
    res.status(statuscode).render("listings/error.ejs",{message});
    // res.status(statuscode).send(message);
});

app.listen(8080,()=>{
 console.log("app is listening to port");
});