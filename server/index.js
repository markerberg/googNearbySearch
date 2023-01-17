const express = require('express');
const app = express();
const axios = require("axios");


let PORT = 5000;

const PUBLIC_API_KEY = 'AIzaSyDIb6tuC5IBX5yf8pYBMs_hLkZicqDHZ9k';

app.get("/api/:location/:activity", async (req, res) => {
    const location = req.params.location;
    const activity = req.params.activity;
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=1500&type=${activity}&key=${PUBLIC_API_KEY}`;
    var config = {
        method: 'get',
        url,
        headers: { }
    };

    axios(config)
        .then(function (response) {
            res.json(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
            // come back and handler better here
        });
})

app.listen(PORT, () => {
    console.log('Server listening at port: ', PORT);
})