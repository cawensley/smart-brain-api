const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const signin = require('./controllers/signin');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'awensley',
        password: '',
        database: 'smart-brain'
}});

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT;

app.get('/', (req,res)=> {res.send('Smart-Brain-API is working!')});
app.post('/signin', (req,res) => {signin.handleSignIn(req,res,db,bcrypt)});
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)});
app.put('/image', (req,res)=> {image.handleImage(req,res,db)});
app.post('/imageurl',(req,res)=>{image.handleAPICall(req,res)});

app.listen(PORT || 3000, ()=> {console.log(`App is running on port ${PORT}`)});