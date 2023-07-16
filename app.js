const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const authRouter = require('./router/authRoute');
const databasconnect = require('./config/databaseConfig');

const cookieParser = require('cookie-parser')

//database config file se connect krlo
databasconnect();
app.use(express.json())
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/auth/', authRouter)

app.use('/', (req, res) => {
    res.render('signup');
})




module.exports = app;


