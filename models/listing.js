
const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

 const listingSchema = new Schema({

title :{
    type:String,
    default:true,
},
description:{
    type:String,
},
image: {
    type:String,
   
},
price:Number,
location:String,
country:String,
reviews:[
    {
        type:Schema.Types.ObjectId,
        ref:"Review",
    },
],
 });

 listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
 });

 const Listing = mongoose.model("Listing",listingSchema);
 module.exports=Listing;