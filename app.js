import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import userModel from './userModel.js'
import connectDB from './connectdb.js'
const app=express()
const port=8000
const DB_URL='mongodb://localhost:27017'

app.use(cors())
app.use(express.json())
app.use('/public', express.static('public'));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname +"_"+Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})

app.post('/upload',upload.single('file'),async(req,res)=>{
    const newfile=await new userModel({image:req.file.filename}).save()
    const imageUrl = `http://localhost:${port}/public/images/${req.file.filename}`;
    return res.status(201).json({ status: 'success', data: imageUrl });
})
connectDB(DB_URL)
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})