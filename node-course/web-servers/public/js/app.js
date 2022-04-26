console.log("From Client Side");
// fetch('https://jsonplaceholder.typicode.com/posts/1').then((response)=>{
//     return response.json()
// }).then((data)=>{
//     console.log(data)
// })

// fetch('http://localhost:3000/weather?address=NewYork').then(
//     response => response.json()
// ).then(
//     data => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     }
// )
const weatherForm = document.querySelector('form');
const searchElem = document.querySelector('input');
const msgElem = document.getElementById("msg")

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    msgElem.textContent = 'Searching...'
    const location = searchElem.value;
    fetch('/weather?address='+location).then(
        response => response.json()
    ).then(
        data => {
            if(data.error){
                msgElem.textContent = data.error
            }else{
                const {weatherDescription,temperature,feelslike,isDayTime} = data.forecast
                msgElem.textContent = `Location: ${data.location}. Currently its ${weatherDescription} with a temperature of ${temperature}C but it feels like ${feelslike}C.\n Day Time: ${isDayTime}`
            }
        }
    )
})
