const express = require("express");
const router = express.Router();
const userService = require("./user.service");
const addUserAccount = require("../parsing/addUserAccount")

router.get("/add",async (req,res)=>{
    res.render("add")
})
router.post("/add",async (req,res)=>{
    if(req.session.user){
        if(req.session.user.id == req.cookies.id) {
            const username = req.body.username;
            const accounts = req.session.user.accounts
            if(accounts.length >= 3){
                res.send("не допустимый количество аккаунтов").status(200)
            }
            let ifTrue = true;
            for(let i =0;i < accounts.length;i++){
                if(" @"+username === accounts[i].username){
                    ifTrue = false
                }
            }
            if(ifTrue){
                const user = await addUserAccount.generateURL(username)
                //добавить этот аккаунт в бд и и в кэш
                const result = await userService.addAccount(user,req.cookies.id)
                if(result){
                    req.session.user.accounts.push(user)
                    res.redirect("/")
                }
                else{
                    res.send("err")
                }
            }
            else{
                res.send("аккаунт " + username + " уже существует в вашем списке")
            }
            
            
        }
    }else{
        res.send("err");
    }

})

router.get("/account/:username",async (req,res)=>{
    if(req.session.user){
        
        if(!req.session.user.accounts){
            req.session.user.accounts = []
            res.send("not founded").status(200)
        }
        const username = req.params.username
        const accounts = req.session.user.accounts
        console.log(username)
        // console.log(accounts)
        let account = null;
        for(let i = 0;i < accounts.length;i++){
            // console.log(accounts[i])
            if(username === accounts[i].username){
                console.log(true)
                account = accounts[i]
            }
        }
        // console.log("account : { \n" + account + "\n}")
        const array = await userService.sortByRating(account.posts)
        if(account){
            res.render("account",{user:account})
        }
        else{
            console.log(2)
            res.send("not founded").status(200)
        }
    }else{
        res.send("<a href ='/'>чтобы стала доступна нажми на ссылку<a>")
    }
    
    
})


//controllers
const userUpdate = require("./user.update")
router.use("/",userUpdate)


module.exports = router