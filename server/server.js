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
    
rp('https://reddit.com/r/popular.json')
    .then((res) => {
        const parsed = JSON.parse(res);
        const articles = parsed.data.children;
        const filteredArticles = articles.map((article) =>{
            return {
                title: article.data.title,
                author: article.data.author,
                url: article.data.url
            };
        });

        fs.writeFile(dataPath, JSON.stringify(filteredArticles) , (err) => {
            console.log('wrote to file');
        })
    })

// rp('https://reddit.com/r/popular.json',(err, res, body) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log('reddit loaded');
    
//     JSON.parse(body).data.children.forEach(item => {
//         fs.appendFileSync(reddits, item.data.title + '\n');
//         fs.appendFileSync(reddits, item.data.url + '\n');
//         fs.appendFileSync(reddits, item.data.author + '\n');
        
//     });
//     console.log('json parsed');
//     // fs.writeFile(dataPath, res.body, err => {
//     //     if(err) console.log(err);
//     // });
// });
    

// fs.readFile(dataPath,'UTF-8',(err, data) => {

//     const chirp = JSON.parse(data);

//     console.log(chirp);
// })