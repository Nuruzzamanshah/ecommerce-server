const express    = require("express");
const env        = require('dotenv');
const bodyParser = require('body-parser');
const app        = express();

// Database Lib Import
const mongoose = require('mongoose');

//environment variable
env.config();


// Mongo DB Database Connection
let URI="mongodb+srv://<username>:<password>@cluster0.pfczh.mongodb.net/todo?retryWrites=true&w=majority";
let OPTION={user:'testuser1495',pass:'testuser1495',autoIndex:true}
mongoose.set("strictQuery", false);
mongoose.connect(URI,OPTION,(error)=>{
    console.log("Connection Success")
    console.log(error)
});

app.use(bodyParser());
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Hello From Server'
    });
});

app.post('/data', (req, res, next) =>{
    res.status(200).json({
        message: req.body
    });
});
app.listen(process.env.PORT, () =>{
    console.log(`Server Is Running On Port ${process.env.PORT}`);
});
