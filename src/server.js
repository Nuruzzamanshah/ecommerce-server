const express    = require("express");
const env        = require('dotenv');
const bodyParser = require('body-parser');
const app        = express();

// Database Lib Import
const mongoose = require('mongoose');


//routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

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
app.use('/api',userRoutes);
app.use('/api',adminRoutes);


app.listen(process.env.PORT, () =>{
    console.log(`Server Is Running On Port ${process.env.PORT}`);
});
