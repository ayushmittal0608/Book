import express from 'express';

const app=express();

app.get('/login', (req, res)=>{
    res.send("Login");
});

app.get('/signup', (req, res)=>{
    res.send("Signup");
});

app.get('/', (req, res)=>{
    res.send("Hello World");
});

app.listen(5001, ()=>{
    console.log(`App listening on port 5001`);
})