const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const dotenv = require('dotenv').config()
const app = express()

const indexRouter = require('./routes/index')
const dashRouter = require('./routes/dashboard')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(session({
  store: new (require('connect-pg-simple')(session))({
    conString: process.env.DB_CONN
  }),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/dashboard', dashRouter)

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
