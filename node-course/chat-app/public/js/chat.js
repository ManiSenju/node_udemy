const socket = io()

const msgForm = document.getElementById('msg-form')
const msgBtn = document.getElementById('send-msg')
const msgInput = document.getElementById('msg-input')
const sendLocBtn = document.getElementById("send-location")
const msgPlaceHolder = document.getElementById('msgPlaceHolder')
const sidebarPlaceHolder = document.getElementById('sidebarPlaceholder')

//templates
const msgTemplate = document.getElementById('message-template').innerHTML
const locTemplate = document.getElementById('location-template').innerHTML
const sidebarTemplate = document.getElementById('sidebar-template').innerHTML

//options
const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix:true})

const autoScroll = ()=>{
    const visibleHeight = msgPlaceHolder.offsetHeight
    const containerHeight = msgPlaceHolder.scrollHeight

    //new message element
    const msgElem = msgPlaceHolder.lastElementChild
    const msgStyles = getComputedStyle(msgElem)
    const msgElemHeight = parseInt(msgStyles.marginBottom) + msgElem.offsetHeight

    //how far have i scrolled
    const scrollOffset = visibleHeight + msgPlaceHolder.scrollTop

    if(containerHeight - msgElemHeight <= scrollOffset){
        msgPlaceHolder.scrollTop = msgPlaceHolder.scrollHeight
    }
}

socket.on('message',(config)=>{
    const html = Mustache.render(msgTemplate,{
        username:config.username,
        msg:config.text,
        createdAt: moment(config.createdAt).format('h:mm a')
    })
    msgPlaceHolder.insertAdjacentHTML('beforeend',html)
    autoScroll()
})

socket.on('locationMessage',(config)=>{
    const html = Mustache.render(locTemplate,{
        username:config.username,
        url:config.url,
        createdAt: moment(config.createdAt).format('h:mm a')
    })
    msgPlaceHolder.insertAdjacentHTML('beforeend',html)
    autoScroll()
})

socket.on('roomData',({room,users})=>{
    const html = Mustache.render(sidebarTemplate,{
       room,
       users 
    })
    sidebarPlaceHolder.innerHTML = html
})


msgForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    msgBtn.setAttribute('disabled','disabled')
    const msg = event.target.elements.message.value
    socket.emit('sendMessage',msg,(error)=>{
        msgBtn.removeAttribute('disabled')
        msgInput.value =''
        msgInput.focus()
        if(error){
            return console.log(error)
        }
        console.log("Message Delivered")
    })
})

sendLocBtn.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert("Geolocation is not enabled on this browser")
    }
    sendLocBtn.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
        const data = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        socket.emit('sendLocation',data,()=>{
            sendLocBtn.removeAttribute('disabled')
            sendLocBtn.focus()
            console.log("Location Shared!")
        })
    })
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href = '/'
    }
})