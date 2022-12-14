const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env'})

require('./config/passport')(passport)

connectDB()

const app = express()
app.use(express.urlencoded())

app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const { formatDate, stripTags, truncate, editIcon, select } = require('./routes/helpers/hbs')

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select
    },
    defaultLayout: 'main',
    layoutsDir: "views/layouts/",
  })
)

app.set("view engine", "hbs")
app.set("views", "./views")

app.use(
  session({
    secret: "alolan marowak",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_URI,
      mongooseConnection: mongoose.connection,
    }),
  })
)
  
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next) {
  res.locals.user = req.user || null
  next()
})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/dreams', require('./routes/dreams'))


const PORT = process.env.PORT || 3000


app.listen(PORT, console.log(`Server running on Port ${PORT} in ${process.env.NODE_ENV} mode`))


