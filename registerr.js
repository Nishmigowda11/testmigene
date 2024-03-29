const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors")


mongoose.connect("mongodb://127.0.0.1:27017/miGene")
.then(() => { console.log("Connected to mongo db")})
.catch(err => { console.log("Failed to connect to mongo db")});

var app=express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});


const collection = new mongoose.model( "user-det", dataSchema );
module.exports = collection


app.post("/register", (req,res) =>{
    let username = req.body.name;
    let  useremail = req.body.email;
    console.log(username +" "+ useremail);
    console.log("recieved!!!")
    
    if(!username || !useremail){
        res.status(400).send("Missing fields").end()
    }else{
        
       var detailll = new collection ({
           name : username ,
           email : useremail
       });
       detailll.save().then((result)=>{
        //   res.redirect('./register.html')
       }).catch((error)=> {
           res.status(500).send(error);
       })
       .catch((error)=> {
        console.error(error);
        res.status(500).send("Internal Server Error");
    })
   };
   
})
app.listen(5500 , () => console.log("Server is running on port 5500"));
