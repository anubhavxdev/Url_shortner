import { getShortUrl, deleteShortUrlDao } from "../dao/short_url.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req,res)=>{
    const data = req.body
    let shortUrl
    if(req.user){
        shortUrl = await createShortUrlWithUser(data.url,req.user._id,data.slug)
    }else{  
        shortUrl = await createShortUrlWithoutUser(data.url)
    }
    res.status(200).json({shortUrl : (process.env.APP_URL || 'http://localhost:3000/') + shortUrl})
})

export const deleteShortUrl = wrapAsync(async (req,res)=>{
    const {short_url} = req.params;
    const userId = req.user._id;
    const deleted = await deleteShortUrlDao(short_url, userId);
    if(!deleted) return res.status(404).json({message: "Short URL not found or unauthorized"});
    res.status(200).json({message: "Short URL deleted successfully"});
})


export const redirectFromShortUrl = wrapAsync(async (req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(!url) throw new Error("Short URL not found")
    res.redirect(url.full_url)
})

export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const {url,slug} = req.body
    const shortUrl = await createShortUrlWithoutUser(url,slug)
    res.status(200).json({shortUrl : (process.env.APP_URL || 'http://localhost:3000/') + shortUrl})
})