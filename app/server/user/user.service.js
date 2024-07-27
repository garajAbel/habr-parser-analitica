let users = [
    {id:0,accounts:[]}
];
let id = 1;

async function addAccount(account,id){
    try {
        const user = await findUserById(id);
        if(user){
            user.accounts.push(account)
            return true
        }else{
            return false;
        }
    } catch (error) {
        return false
    }
    
}
async function findUserById(id){
    for(let i = 0;i < users.length ; i++){
        if(users[i].id == id){
            return users[i]
        }
    }
    return null;
}

async function addUser(){
    try {
        const user = {id:id,accounts:[]}
        users.push(user) 
        id++
        return user
    } catch (error) {
        return ;   
    }
}
async function updateAccount(account,id){
    for(let i =0;i < users.length;i++){
        if(users[i].id == id){
            for(let j = 0;j < users[i].accounts.length;j++){
                if(users[i].accounts[j].username === account.username){
                    users[i].accounts[j] = account;
                    return true
                }
            }
        }
    }
    return false
}

async function sortByRating(array){
    array.sort(function(a, b) {
        return b.rating - a.rating;
      });
    for(let i = 0;i < array.length;i++){
        console.log(array[i].rating)
    }
    // console.log(array)
    return array
}

module.exports = {
    addUser,addAccount,updateAccount,sortByRating
}