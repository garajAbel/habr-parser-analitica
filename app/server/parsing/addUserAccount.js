const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")
const habrURL = "https://habr.com/ru/users/";

async function getHtml(url){
    try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error('Ошибка при загрузке страницы:', error.message);
        return null;
      }
}
async function parsing(url){
    try{
        const html = await getHtml(url);
        if(!html) return null;
        const $ = cheerio.load(html);
        let posts = []
        const userName = $(".router-link-active.tm-user-card__nickname.tm-user-card__nickname.tm-user-card__nickname_variant-profile").text();
        const karma = $(".tm-karma__votes.tm-karma__votes_positive").text()
        const rating = $(".tm-votes-lever__score-counter.tm-votes-lever__score-counter.tm-votes-lever__score-counter_rating").text()
        $(".tm-articles-list__item").each((i,link)=>{ // .tm-title__link
            const text = $(link).find(".tm-title__link").text()
            const href = $(link).find(".tm-title__link").attr("href")
            let lvl = $(link).find(".tm-votes-meter__value.tm-votes-meter__value.tm-votes-meter__value_positive.tm-votes-meter__value_appearance-article.tm-votes-meter__value_rating").text()
            const comments = $(link).find(".tm-article-comments-counter-link__value").text()
            const saves = $(link).find(".bookmarks-button__counter").text()
            if(lvl === ""){
                lvl = 0
            }else{
                lvl = lvl.split("+")[1]
                lvl = Number(lvl)
            }
            
            if(text !== ""){
                posts.push({text:text,href:href,rating:lvl,comments:comments,saves:saves})
            }
            
        })
        const user = {username:userName,karma:karma,rating:rating,posts:posts}
        return user;
    }catch(error){
        console.log(error);
        return null;
    }
}
async function generateURL(username){
    const url = habrURL + username + "/publications/articles/"
    const user = await parsing(url)
    // console.log(user)
    return user   
}

module.exports = {
    generateURL
}