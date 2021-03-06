// https://github.com/trending/developers/javascript?since=monthly
import * as cheerio from 'cheerio';
import * as fetch_ from 'node-fetch';

let fetch = fetch_;

export default function getDevelopers (FETCH_URL) {
  return new Promise((resolve, reject) => {
    fetch(FETCH_URL)
      .then(res => res.text())
      .then(body => {
        const $ = cheerio.load(body)
        const box = $('.Box article.Box-row');

        let result = box.get().map(el => {

          const author = $(el).find('.h3>a').text().trim();
          const username = $(el).find('.f4>a').text().trim();
          const avatar = $(el).find('.mx-3 img').attr('src');

          const reponame = $(el).find('article .h4.lh-condensed>a').text().trim();
          const repoUrl = $(el).find('article .h4.lh-condensed>a').attr('href').trim();
          const description = $(el).find('article .f6.text-gray.mt-1').text().trim();

          return {
            author,
            username,
            avatar,
            url: 'https://github.com/' + username,
            reponame,
            repourl: 'https://github.com' + repoUrl,
            description
          }

        });

        resolve(result);
      })
      .catch(e => { reject(e) })
  })
}