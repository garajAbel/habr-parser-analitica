const axios = require('axios');

async function fetchHtml(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке страницы:', error.message);
    return null;
  }
}
//axios ошибка socket hang up - ошибка из за много запросов одновременно

const cheerio = require('cheerio');

async function scrapeWebsite(url) {
  const html = await fetchHtml(url);
  if (!html) return;

  const $ = cheerio.load(html);

  // Пример: получение заголовка страницы
//   const pageTitle = $('a');

  try {
    let data = []
    $('.tm-title__link').each( (i, link) => {
        const text = $(link).text();
        const href = $(link).attr('href');
        // console.log(`Text: ${text} | Href: ${href}`);
        data.push({
            text:text,
            href:href
        })
    });
    return data
  } catch (error) {
    return;
  }

  
  
//   console.log('Заголовок страницы:', pageTitle);
}

// Используйте свой URL
const targetUrl = 'https://habr.com/ru/articles/';
// let real_data = []
scrapeWebsite(targetUrl).then((data) => {
    console.log(data)
  })
// console.log(real_data)


