const express = require("express")
const router = express.Router()
const parser = require("../parsing/addUserAccount")
const userService = require("./user.service")
router.get("/update/:name",async (req,res)=>{
    try {
        
        const name = req.params.name;
        const username = name.split("@")[1]
        console.log(username)
        if(req.session.user){
            let accounts = req.session.user.accounts
            for(let i =0;i < accounts.length;i++){
                if(name === accounts[i].username){
                
                    const account = await parser.generateURL(username)
                    if(account){
                        const ifTrue = await userService.updateAccount(account,req.session.user.id)
                        if(ifTrue){
                            req.session.user.accounts[i] = account
                            res.redirect("/account/"+ name)
                        }
                        else{
                            res.send("error account is not updated").status(301)
                        }
                    }else{
                        res.send("account is null").status(404)
                    }
                }
            }
            res.send("account is not founded").status(404)
        }
        else{
            res.send("<a href='/' >переходите по ссылке чтобы заработало</a>")
        }
    } catch (error) {
        res.send("<h1 style='color:red;text-align:center' >error 404</h1>").status(404)
    }
})

module.exports = router