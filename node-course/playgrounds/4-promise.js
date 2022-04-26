const doWorkPromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        //resolve([1,2,3])
        reject('this is error')
    },2000)
})

doWorkPromise.then((result)=>{
    console.log(result)
}).catch((err)=>{
    console.log(err)
}).then(()=>{
    console.log("Promise completed")
})