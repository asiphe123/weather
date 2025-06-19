const { fetchweather } = require('./fetchweather');
async function main() {
    const cities = process.argv.slice(2);

    if (cities.length === 0) {
        console.log('Usage: node weather.js city1 [city2]');
        process.exit(1);
    }
    for (const city of cities){
        const result = await fetchweather(city);
        if (result.error){
            console.log(`[${result.city}] Error: ${result.error}`);
        }
        else{
            console.log(`[${result.city}] Temp: ${result.tempC}°C | Weather: ${result.desc}`);
        }
    }
}

if (require.main === module) {
    main();
}

module.exports = { fetchweather };