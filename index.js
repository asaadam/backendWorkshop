const express = require('express');
const db = require('./db/connection');
const app = express();



db.then(() => {
    console.log('Connected correctly to server')
  })

  
app.listen(5000,()=>{
    console.log('app is running port 5000');
})