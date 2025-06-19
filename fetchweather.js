const https = require('https');
const { resolve } = require('path');

function fetchweather(city) {
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;

    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';

            if (res.statusCode !== 200){
                resolve({city, error: `HTTP error: ${res.statusCode}`});
                return;
            }
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const condition = json.current_condition?.[0];
                    const tempC = condition.temp_C;
                    const desc = condition.weatherDesc[0].value;

                    resolve({city, tempC, desc});
                }catch (e) {
                    resolve({city, error: 'Failed to parse response'});
                }
            });
        }).on('error',(err) => {
            resolve({city, error: `Network error: ${err.message}`});
        });

    });

}

if (require.main === module) {
    main();
}

module.exports = { fetchweather };