const Express = require("express")
const app = Express()

app.get("/",(req,res)=>{
    res.send("This is TechNestle")
})

app.listen(8080,()=>{
    console.log("Server is running on the port 8080")
})