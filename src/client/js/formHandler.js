function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => {
        return res.json()
    })
    .then(function(data) {
        document.getElementById('results').innerHTML = data.message
    })

    console.log("::: External Fetch Request Sent:::")

    const baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
    const key = '&APPID=36d7234802a84134f886ebad20d776d0';
    const zip = '94016'
    const res = getAPIData(baseURL,zip,key)
        .then((weatherData)=>updateUI(weatherData));
}

export { handleSubmit }

const getAPIData = async (baseURL='', zip='', key='') => {
    const res = await fetch(baseURL+zip+key);
    try{
        const weatherData = await res.json();
        return {
            temperature: weatherData.main.temp,
            date: new Date(weatherData.dt * 1000)
        };
    } catch(error) {
        console.log('error', error);
    }
}

const updateUI = async (weatherData) => {
    const temperature = weatherData.temperature;
    const date = weatherData.date;
    document.getElementById('results').innerHTML = temperature;
    return;
}