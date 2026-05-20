// sync_tweets.js
// Fetches the latest 10 tweets from updates.json (FootParadise private app repo)
// and writes them to tweets.json in the public FootParadiseWeb repo.
// Runs daily via GitHub Actions (.github/workflows/sync-tweets.yml).

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const UPDATES_URL = 'https://raw.githubusercontent.com/elchinoga/FootParadise/main/updates.json';
const OUTPUT_PATH = path.join(process.cwd(), 'tweets.json');
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatDate(dateStr) {
    // "2026-05-19" → "May 19"
    const parts = dateStr.split('-');
    const month = parseInt(parts[1], 10);
    const day   = parseInt(parts[2], 10);
    return MONTHS[month - 1] + ' ' + day;
}

function extractImgId(imagePath) {
    // "imagenes/2056851589462151635.jpg" → "2056851589462151635"
    return path.basename(imagePath, '.jpg');
}

https.get(UPDATES_URL, function(res) {
    if (res.statusCode !== 200) {
        console.error('HTTP ' + res.statusCode + ' fetching updates.json');
        process.exit(1);
    }

    let data = '';
    res.on('data', function(chunk) { data += chunk; });
    res.on('end', function() {
        let json;
        try {
            json = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing updates.json:', e.message);
            process.exit(1);
        }

        // updates[] is newest-first (highest id first)
        const top10 = json.updates.slice(0, 10);

        const tweets = top10.map(function(u) {
            return {
                text: u.description,
                img:  extractImgId(u.image),
                date: formatDate(u.date),
                url:  u.twitter
            };
        });

        const newContent = JSON.stringify(tweets, null, 2) + '\n';
        const oldContent = fs.existsSync(OUTPUT_PATH)
            ? fs.readFileSync(OUTPUT_PATH, 'utf8')
            : '';

        if (oldContent === newContent) {
            console.log('tweets.json sin cambios.');
        } else {
            fs.writeFileSync(OUTPUT_PATH, newContent);
            console.log('tweets.json actualizado con ' + tweets.length + ' tweets.');
        }
    });
}).on('error', function(e) {
    console.error('Error de red:', e.message);
    process.exit(1);
});
