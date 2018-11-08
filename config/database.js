const mongoose = require('mongoose')
const chalk = require('chalk')
const log = console.log

//require database url
const {URL} = require('./props')

//configure chalk
const connected = chalk.bold.cyan
const error = chalk.bold.red
const disconnected = chalk.bold.yellow
const termination = chalk.bold.magenta

module.exports = function() {

  mongoose.connect(URL, {useNewUrlParser: true})

  const db = mongoose.connection

  //handle error
  db.on('error', (err) => log(error('Mongoose default connection ${err} error')))

  //handle connection
  db.on('connected', () => log(connected('Mongoose default connection is open at ${URL}')))

  //handle disconnection
  db.on('disconnected', () => log(disconnected('Mongoose default connection is closed at ${URL}')))

  //handle termination
  process.on('SIGINT', () => {
    db.close(() => {
      log(termination('Mongoose default connection has been terminated by user'))
      process.exit(0)
    })
  })
}
