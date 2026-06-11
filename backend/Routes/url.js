import express from 'express';
import Url from '../Models/Url.js';
import { nanoid } from 'nanoid';

const router=express.Router();

router.post("/shorten",async(req,res)=>{
    try{
    const {originalUrl}=req.body;

    if(!originalUrl){
        return res.status(400).json({error:"Url is required"});

    }
    try{
        new URL(originalUrl)
    }catch{
        return res.status(400).json("error: Invalid URL");
    }

    let shortId;
    let exists=true;
    
    while(exists){
        shortId=nanoid(7);
        exists=await Url.findOne({shortid})
    }
    
    const url = await Url.create({
        shortId,
        originalUrl,
    });

    res.json({
        ShortId:url.shortId,
        ShortUrl:`${process.env.BASE_URL}/${url.shortId},`
    });
 } catch(error){
    console.log(error);
    res.status(500).json({error:"Server error"})
 } 
});

router.get("/shortenId", async(req,res)=>{
 try{
    const{shortId}=req.params;

    const url=await Url.findOne({shortId});
    if(!url) return res.status(404).json({error:"URL not found"});

    url.clicks=+1;
    await url.save();

    return res.redirect(url.originalUrl);
 } catch(error){
    console.log(error);
    res.status(500).json({error:"Server error"})
 } 
});

export default router;