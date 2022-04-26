const request = require('request')

const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibWFuaXNlbmp1IiwiYSI6ImNreG14cWZzNzFpcXIyeXFrbzlrOWU5ZmUifQ.6KKofxsaIhT2XWzeI1vdiA&limit=5"
    request({
        url,
        json:true
    },(err,{body})=>{
        if(err){
            callback('Unable to connect to Map Box Service!',undefined)
        }else if(body.features.length === 0){
            callback('unable to fetch location',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}
module.exports = geocode;