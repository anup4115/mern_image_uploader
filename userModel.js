import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    image:{type:String}
})
const userModel = mongoose.model('image',userSchema)
export default userModel