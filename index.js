//require modules
const app = require('express')();
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('express').Router();
const http = require('http').Server(app);
const log = console.log;

//config database
const db = require('./config/database')
const {PORT, URL} = require('./config/props')

const userRoute = require('./api/users/users.routes');

db()

//add middleware
app.use(bodyparser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyparser.urlencoded({extended: true}))
app.use('/api',router)

userRoute(router)

http.listen(PORT, () => log(`server connected at http://localhost:${PORT}`))
