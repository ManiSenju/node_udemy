const request = require('request');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

let city = process.argv.slice(2).join(" ");
if(city && city.length > 0){
    geocode(city,(err,{latitude,longitude,location}={})=>{
        if(err){
            return console.log(err);
        }
        forecast(latitude,longitude,(err,{temperature,feelslike}={})=>{
            if(err){
                return console.log(err);
            }
            console.log(location);
            console.log("Temperature:"+temperature+" but feelslike "+feelslike);
        })
    })
}else{
    console.log("Please provide an address")
}
