const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const router = require('./router');

app.use(express.json());
app.use(bodyparser.json());
app.use('/',router)

mongoose.connect('mongodb://127.0.0.1:27017/UsersToday',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log('Connected to DB')})
.catch((err)=>{
    console.log(err);
})


// app.post('/post', (req,res)=>{

// })




app.listen(5000,()=>{
    console.log('app is listening on port 5000');
})