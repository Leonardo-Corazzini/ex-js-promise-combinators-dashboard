// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).
// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).
// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
}
async function getDashboardData(query) {
    const promise1 = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`)
    const promise2 = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
    const promise3 = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)
    const result = await Promise.all([promise1, promise2, promise3])
    console.log(result)
    const data = {
        city: result[0][0] ? result[0][0].name : null,
        country: result[0][0] ? result[0][0].country : null,
        temperature: result[1][0] ? result[1][0].temperature : null,
        weather: result[1][0] ? result[1][0].weather_description : null,
        airport: result[2][0] ? result[2][0].name : null
    }
    return data

}









getDashboardData('vienna')
    .then(data => {
        console.log('Dasboard data:', data);
        if (data.temperature) {
            console.log(
                `${data.city} is in ${data.country}.\n` +
                `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
                `The main airport is ${data.airport}.\n`
            );
        } else {
            console.log(
                `${data.city} is in ${data.country}.\n` +
                `The main airport is ${data.airport}.\n`
            );
        }

    })
    .catch(error => console.error(error));