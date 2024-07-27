const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const urlEncoded = express.urlencoded({extended:true})

app.use(urlEncoded)

//view options
app.set("view engine","ejs");
app.set("views","./public")

//session
app.use(session({
    "secret":"1234Admin",
    "resave":false,
    "saveUninitialized":true
}))
//cookie
app.use(cookieParser())

//static css/js
app.use(express.static("./public/static"))
 

//main
const main = require("./server/main")
app.use("/",main)

const PORT = 3000
app.listen(PORT,()=>{
    console.log("http://localhost:"+PORT)
})