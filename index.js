//require modules
const app = require('express')()
const http = require('http').Server(app)
const log = console.log

const db = require('./config/database')
const {PORT,URL} = require('./config/props')

db()

http.listen(PORT,()=>log(`server connected at http://localhost:${PORT}`))
