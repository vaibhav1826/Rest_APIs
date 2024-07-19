const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const fs= require('fs'); // file module library
const mongoose = require('mongoose'); // mongoose for connecting with database
const { type } = require('os'); // operating system module 
const PORT = 4500 ;


// connection with database
mongoose.connect('mongodb://127.0.0.1:27017/lib')
.then(()=> console.log("Mongoose connected"))
.catch((err)=> console.log("mongoose error",err));

//schema
const userSchema = new mongoose.Schema({
    firstName: { type: String , require: true},
    lastName: {type: String },
    email:{ type: String , require:true , unique: true},
    jobTitle:{type: String},
    gender:{type: String}
});

const user = mongoose.model("user",userSchema);
// middlewares --> plugins
app.use(express.urlencoded({extended:false}));

// REST API (returning json data) 
app.get('/api/users',(request,respond)=>{
  respond.json(users);
  const log = `requesting server on get request : ${Date()} \n`;
  fs.appendFile("./log.txt",log,(error,data)=>{
    
  })
});

// REST API (returning names of users in html document in our browser)
app.get('/users',(request,respond)=>{
    const html = `
    <ul> 
    ${users.map((user)=>`<li> ${user.first_name}</li>`).join("")}
    </ul>
    ` ;
    respond.send(html);
});

// getting data of user with id (json)
app.get('/api/users/:id',(request ,respond)=>{
const id = Number(request.params.id );
const user = users.find((user)=> id === user.id);
respond.send(user);
const log1 = `requesting server on get request on id ${user.id} : ${Date()} \n`;
fs.appendFile("./log.txt",log1 ,(error,data)=>{
  
})
});

// post: for creating new user
app.post('/api/users',(request,respond)=>{
    const body = request.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
            return respond.status(400).json({msg : "all field are required.."});
        }
   const result =   user.create({
        firstName : body.first_name,
        lastName: body.last_name ,
        email : body.email ,
        gender: body.gender ,
        jobTitle : body.job_title,
    })
    console.log(result);
    return respond.status(201).json({msg:"success"});
// users.push({...body , id :users.length +1} );
//fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error,data)=>{
//respond.json({status : "success" , id : users.length });
    })

// patch : for updating user with id
app.patch('/api/users/:id',(request,respond)=>{
    respond.json({status : "pending"});
    });

// delete : for deleting user with id 
app.delete('/api/users/:id',(request,respond)=>{
    respond.json({status : "success" , id : id });
    });

// hosting webserver at localhost:4500
app.listen(PORT,()=>{
console.log("server started ");
});