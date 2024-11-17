import mongoose from 'mongoose'

const connectDB=async(DB_URL)=>{
    try{
        const DBOPTIONS={
            dbName:'fileDB'
        }
        await mongoose.connect(DB_URL,DBOPTIONS)
        console.log("Connected...")
    }catch(error){
        console.log(error)
    }
}
export default connectDB