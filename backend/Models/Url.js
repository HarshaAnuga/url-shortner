import mongoose from "mongoose";

const UrlSchema=new mongoose.Schema({
    originalUrl:{type:String,required:true},
    shortId:{type:String,required:true},
    clicks:{type:Number,default:0},
},  {timpestamps:true});

export default mongoose.model("Url",urlSchema);