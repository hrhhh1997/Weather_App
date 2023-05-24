require('dotenv').config();
const express = require('express');
const app = express();

const apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";

app.use(express.static(__dirname + "/public"));


app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/index.html");
});


app.listen(process.env.PORT || 3000, ()=> {
    console.log("Server started.")
});