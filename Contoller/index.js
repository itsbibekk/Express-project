import express from 'express';
import path from 'path';
import fs from 'fs';

const port = 3000;
const app = express();

const absPath = path.resolve('./View/Html');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('./View/Css'));
app.use(express.static('./View/Js'));

// Pages
app.get('/', (req, res) => {
    res.sendFile(absPath + '/login.html');
});

app.get('/login', (req, res) => {
    res.sendFile(absPath + '/login.html');
});

app.get('/register', (req, res) => {
    res.sendFile(absPath + '/register.html');
});

app.get('/dashboard', (req, res) => {
    res.sendFile(absPath + '/dashboard.html');
});

// Register
app.post('/register', (req, res) => {

    let data = JSON.parse(fs.readFileSync('./Model/data.json'));

    data.push(req.body);

    fs.writeFileSync(
        './Model/data.json',
        JSON.stringify(data, null, 2)
    );

    res.redirect('/dashboard');

});

// Login
app.post('/login', (req, res) => {

    const { username, email, password } = req.body;

    let data = JSON.parse(fs.readFileSync('./Model/data.json'));

    const user = data.find(u =>
        u.username === username &&
        u.email === email &&
        u.password === password
    );

    if (user) {

        res.redirect('/dashboard');

    } else {

        res.status(401).send('Invalid username, email, or password.');

    }

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});