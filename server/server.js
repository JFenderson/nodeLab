const path = require('path');
const fs = require('fs');
const rp = require('request-promise')

const dataPath = path.join(__dirname, '../chirps.json');
const reddits = path.join(__dirname, '../reddit.js');
// const reddits = [];

//reddits.push();

// const chirps = [
//     {
//         "name": "joseph",
//         "chirp": "helow there"
//     },
//     {
//         "name": "joseph",
//         "chirp": "helow there"
//     },
//     {
//         "name": "joseph",
//         "chirp": "helow there"
//     },
//     {
//         "name": "joseph",
//         "chirp": "helow there"
//     },
//     {
//         "name": "joseph",
//         "chirp": "helow there"
//     }
// ]

// fs.writeFile(dataPath, JSON.stringify(chirps), function(err) {
//     if(err) {
//         console.log(err);
//         return;
//     }

//     const contents = fs.readFile(dataPath, 'UTF-8', function (err,data) {
//     console.log(JSON.stringify(contents));
//         return;
//     })

// });
    
// rp('https://reddit.com/r/popular.json')
//     .then((res) => {
//         const parsed = JSON.parse(res);
//         const articles = parsed.data.children;
//         const filteredArticles = articles.map((article) =>{
//             return {
//                 title: article.data.title,
//                 author: article.data.author,
//                 url: article.data.url
//             };
//         });

//         fs.writeFile(dataPath, JSON.stringify(filteredArticles) , (err) => {
//             console.log('wrote to file');
//         })
//     })

rp('https://reddit.com/r/popular.json')
.then((res) => {
    const parsed = JSON.parse(res);
    const articles = parsed.data.children;
    let downloads = []
    articles.map((article) =>{
        if(!article.preview.reddit_video_preview.is_gif){
            return;
        }

        downloads.push(rp(article.data.url).pipe(fs.createWriteStream(path.join(__dirname, 'downloads', `${article.data.id}.gif`))));
    });

    Promise.all(downloads)
        .then((res) => {
            console.log('yay')
        })
})

