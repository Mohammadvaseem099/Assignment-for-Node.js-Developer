const express = require("express")
const mongoose = require("mongoose")
const app = express()

const route = require("./routes/route")
app.use("/", route)

// const mongoose = require("mongoose")
const abc = mongoose.set("strictQuery", true)
mongoose
.connect(
    "mongodb+srv://Mohammadvaseem099:uDNTAkafkNrYLe0C@cluster0.2npclft.mongodb.net/Mohammadvaseem099", 
    {useNewUrlParser: true}
)
.then(()=> console.log("MongoDB is connected"))
.catch((err)=> console.log(err))


app.listen(3001, function(){
    console.log("Express is connected in port:", 3001)
})