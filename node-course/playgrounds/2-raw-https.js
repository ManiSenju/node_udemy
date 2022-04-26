const http = require("http");
const url = "http://api.weatherstack.com/current?access_key=a4262d9f2eeb06455d5a6aede0e8274d&query=40.7306,77.124"
const request = http.request(url,(response)=>{
    let data=""
    response.on("data",(chunk)=>{
        data = data+chunk.toString();
    })

    response.on("end",()=>{
        console.log(JSON.parse(data));
    })
})
request.on("error",(err)=>{
    console.log("Error:",err)
})

request.end()