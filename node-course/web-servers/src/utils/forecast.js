const request = require("request")


const forecast = (lat,long,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=a4262d9f2eeb06455d5a6aede0e8274d&query="+encodeURIComponent(lat)+","+encodeURIComponent(long)
    request({
        url,
        json:true
    },(err,{body})=>{
        if(err){
            callback('Unable to connect to Weather Service!',undefined)
        }else if(body.error){
            callback('unable to fetch location',undefined)
        }else{
            const current = body.current
            callback(undefined,{
                temperature:current.temperature,
                feelslike:current.feelslike,
                weatherDescription: current.weather_descriptions[0],
                isDayTime: current.is_day
            })
        }
    })
}
module.exports = forecast;