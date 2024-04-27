const Express = require("express")
const app = Express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGODB_CONNECTION

app.get("/",(req,res)=>{
    res.send("This is TechNestle")
})

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("Database connected successfully")
    app.listen(PORT,()=>{
        console.log(`Server is running on the port ${PORT}`)
    })
})
.catch((error)=> console.log("Error in connecting to database",error.message) )
