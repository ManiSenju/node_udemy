require('./src/database/mongoose.js')
const User = require('./src/models/users.js')
const Task = require('./src/models/tasks.js')

// User.findByIdAndUpdate("61ddc06d58e85b736651de73",{age:1}).then((user)=>{
//     console.log(user)
//     return User.count({age:1})
// }).then((count)=>{
//     console.log(count)
// }).catch(e=>console.log(e))

// Task.findByIdAndDelete("61ddc1a72b1be40e8480ce7b").then((task)=>{
//     console.log(task)
//     //return Task.count({completed:false})
//     // count is decpricated 
//     return Task.countDocuments({completed:false})
// }).then((c)=>{
//     console.log(c)
// }).catch(e=>console.log(e))

// using async await

// const updateAgeAndCount = async (id,age)=>{
//     const user = await User.findByIdAndUpdate(id,{age})
//     const count = await User.countDocuments({age})
//     return {user,count}
// }

// updateAgeAndCount("61ddc06d58e85b736651de73",2).then(({user,count})=>{
//     console.log("user",user)
//     console.log("count",count)
// }).catch(e=>console.log(e))

const deleteTaskAndCount = async (id)=>{
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount("61e04b408d0b303342837dc8").then(count=>console.log(count)).catch(e=>console.log(e))