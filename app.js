const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const authRouter = require('./router/authRoute');
const databasconnect = require('./config/databaseConfig');



//database config file se connect krlo
databasconnect();
app.use(express.json())

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/auth/', authRouter)

app.use('/', (req, res) => {
    res.status(200).json({ data: 'JWTauth server' });
})




module.exports = app;


