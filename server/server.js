const path = require('path');
const fs = require('fs');
const rp = require('request-promise')

const dataPath = path.join(__dirname, '../chirps.json');
const reddits = [];
//reddits.push();

rp('https://reddit.com/r/popular.json',(err, res, body) => {
    if(err) console.log(err);

    JSON.parse(body).data.children.forEach(item => {
        fs.appendFileSync(dataPath,item.data.title + '\n');
    });

    // fs.writeFile(dataPath, res.body, err => {
    //     if(err) console.log(err);
    // });
});
    

// fs.readFile(dataPath,'UTF-8',(err, data) => {

//     const chirp = JSON.parse(data);

//     console.log(chirp);
// })