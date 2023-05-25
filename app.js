require('dotenv').config();
const express = require('express');
const app = express();

const apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
const unit = 'units=metric';
const apiKey = '&appID=' + process.env.API_KEY + '&';

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res)=> {
    res.render("weatherinfo", {dataLocation: "", description: "", temperature: ""});
});

app.post("/", (req, res)=> {
    let userInput = req.body.location;
    userInput = userInput.trim();
    if (userInput.length === 0) {
        res.redirect("/");
    } else {
        async function getWeatherData() {
            let finalUrl = apiEndpoint + unit + apiKey + 'q=' + userInput;

            const response = await fetch(finalUrl, {mode: 'cors'});

            if (response.status == 404) {
                res.render("weatherinfo", {dataLocation: "Error: "+404, temperature: "Message: " +"City Not Found!", description: "Enter valid City name. Name entered: " + userInput});
            } else {
                const responseData = await response.json();
                const temp = responseData['main']['temp'] + '\u00B0 Celsius';
                const description = responseData['weather'][0]['description'];
                const dLocation = responseData['name'];

                res.render("weatherinfo", {temperature: "Temperature: "+temp, description: "Description: "+description, dataLocation: "Location: "+dLocation});
            }
        }

        getWeatherData();
    }
});


app.listen(process.env.PORT || 3000, ()=> {
    console.log("Server started.")
});