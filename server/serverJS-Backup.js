//change callback URL:
//typical: http://localhost:8080/login/oauth2/code/github
//https://github.com/login/oauth/authorize?client_id=3efd399bb27b4d346ca2&redirect_uri=http://localhost:8080/login/oauth2/code/github
//https://www.youtube.com/watch?v=8EjSLjHhsIQ

//perhaps this instead?
//https://github.com/login/oauth/authorize?client_id=3efd399bb27b4d346ca2&redirect_uri=http://localhost:8080/login/oauth2/code/github
/* 
    Redirect to this link to request GitHub access:

https://github.com/login/oauth/authorize?
  client_id=...&
  redirect_uri=http://www.example.com/oauth_redirect*/

/*

If the user accepts your request, GitHub redirects back to your site with a 
temporary code in a code parameter. Exchange this for an access token:

POST https://github.com/login/oauth/access_token?
  client_id=...&
  redirect_uri=http://www.example.com/oauth_redirect&
  client_secret=...&
  code=...

RESPONSE:
access_token=... */

/*
    You have the access token, so now you can make requests on the user's behalf:

GET https://github.com/api/v2/json/user/show?
  access_token=... */

// app.get('/users', (req, res) => {
//   return res.status(200).send(checkFile);
// });

const express = require('express');
const app = express();
const path = require('path');
const { debuglog } = require('util');
const router = require('./router/api');
require('dotenv').config();
//const cookiSession = require('cookie-session')
//OAUTH TODO: Add steps in this file as well 

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
console.log(client_id)
console.log(client_secret)


app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.get('/', (req, res) => {
        return res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
    });
    app.use('/build', express.static(path.join(__dirname, '../build')));
    // serve index.html on the route '/'
};

//first GITHUB request:
const loginRoute = (req, res) => {
    console.log('hi')
    app.get('/login/github', (req, res) => {
        console.log('there')
        const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:8080/login/oauth2/code/github`
        //console.log(req.body);
        debugger

        res.redirect(url)
    });
}

app.use('/login/github', loginRoute); 

//second GITHUB request:
const loginController = (req, res) => {
    app.get('/logginonnnodonno', async (req, res) => {
        const code = req.query.code
        const token = await getAccessToken(code)
        const githubData = await getGithubUser(token)
        console.log(githubData); // should get back the object;
        console.log(token); //specific user token;

        if (githubData) {
            res.locals.githubId = githubData.id
            res.status(200).send(res.locals.githubId)
            req.session.githubId = githubData.id
            req.session.token = token

            res.redirect('/tracker')
            //leave root for now, change later to tracker path
        }
    });
};

//access token fetch logic
async function getAccessToken(code) {
    const res = await fetch(`https://github.com/login/oauth/access_token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id,
            client_secret,
            code
        })
    });
    const data = await res.text()
    const params = new URLSearchParams(data)
    return useParams.get('access_token')
};

//github user fetch logic
async function getGithubUser(access_token) {
    const req = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `bearer ${access_token}`
        }
    });
    // ! The data should arrive on an object (name, id, etc...). Will double check.
    const data = await req.json()
    return data;
};

app.use('/login/github', loginRoute);

app.use('/api', router);

app.post('/register', (req, res) => {
    res.status(200).json(res.locals.user);
});

//ALWAYS HAVE AT BOTTOM CATCHALL
app.get('*', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/public/index.html')));

// statically serve everything in the build folder on the route '/build'



app.listen(3000); //listens on port 3000 -> http://localhost:3000/
