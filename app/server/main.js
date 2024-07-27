const express = require("express");
const router = express.Router();
const userService = require("./user/user.service");

router.get("/",async (req,res)=>{
    //id for cookie and session
    if(req.session.user){
        if(req.cookies.id){
            if(req.session.user.id == req.cookies.id){
                //completed
                let accounts = []
                req.session.user.accounts.forEach(element => {
                    accounts.push(element.username)
                });
                res.render("main-menu",{users:accounts})
            }
            else{
                //warning try hacking
                res.send("warning")
            }
        }
        else{
            res.cookie("id",req.session.user.id,{
                maxAge:(1000*60*60*24*1),
                httpOnly:true
            });
            //completed
            let accounts = []
            req.session.user.accounts.forEach(element => {
                accounts.push(element.username)
            });
            res.render("main-menu",{users:accounts})
        }
    }
    else{
        req.session.user = await userService.addUser();
        res.cookie("id",req.session.user.id,{
            maxAge:(1000*60*60*24*1),
            httpOnly:true
        });
        //completed
        let accounts = []
        req.session.user.accounts.forEach(element => {
            accounts.push(element.username)
        });
        res.render("main-menu",{users:accounts})
    }
})


//routers
const userController = require("./user/user.controller")
router.use(userController)

module.exports = router