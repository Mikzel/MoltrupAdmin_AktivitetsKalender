const schedule = require('node-schedule');
const express = require('express');
const moment = require('moment')
const app = express();
const måneder = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
let kalenderData;
let router = express.Router();
const axios = require('axios');
schedule.scheduleJob('0 1 0 * * *', ()=>{hentKalenderData()});
const ejs = require('ejs');
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');

function hentKalenderData() {
    axios.get(`https://www.googleapis.com/calendar/v3/calendars/moltrupgaest@gmail.com/events?key=AIzaSyB2SMWXop-DRTBRek1TMEoCHxPYaufgJeg&timeZone=GMT+2&timeMin=${new Date(moment().utc()).toISOString()}&singleEvents=true&orderBy=startTime`)
    .then((res) => {kalenderData=res.data.items;});
   
}
hentKalenderData();

app.get('/', (req, res)=>{
    let { antal } = req.query;
    let { farve } = req.query;
    !antal ? res.send('Antal er ikke specificeret!'):
    res.render(__dirname+'/public/views/main',{kalenderData,måneder, antal,farve:farve||'white'});
});

app.listen(8000);

