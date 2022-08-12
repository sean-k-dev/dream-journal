const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env'})

require('./config/passport')(passport)

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "views/layouts/",
  })
)

app.set("view engine", "hbs")
app.set("views", "./views")

app.use(session({
    secret: 'keyboard-cat',
    resave: false,
    saveUninitialized: false,
  })
)
  
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000


app.listen(PORT, console.log(`Server running on Port ${PORT} in ${process.env.NODE_ENV} mode`))


