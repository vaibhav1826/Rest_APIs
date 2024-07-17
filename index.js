const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const PORT = 4500 ;

// REST API (returning json data) 
app.get('/api/users',(request,respond)=>{
  respond.json(users);
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
});
 


// hosting webserver at localhost:4500
app.listen(PORT,()=>{
console.log("server started ");
});