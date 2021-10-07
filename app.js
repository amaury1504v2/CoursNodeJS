const express = require('express')
const app = express()
//const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Post = require('./models/post')
const port = 3000
const exercisesRouter = require('./routes/exercises');
const testRoutes = require('./routes/test')
const userRoutes = require('./routes/user')
const path = require('path')
mongoose.connect('mongodb+srv://amaury1504:amaury1504@cluster0.zlyue.mongodb.net/coursnode?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=> console.log("db valid"))
.catch(()=> console.log("db error"))
/*
app.use('/',(req, res,next) =>{
    res.json({message: "oklm"})
})*/
app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    next()
})

app.use(express.json())
app.use(express.urlencoded({
    extended :true
}))
app.use('/images',express.static(path.join(__dirname,'images')))
app.use('/exercises', exercisesRouter)
app.use('/test',testRoutes)
app.use('/user',userRoutes)
module.exports = app