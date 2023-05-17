const express = require('express')

const actorRoutes = require('./src/actor/routes') 
const loginRoutes = require('./src/login/routes') 
const movieRoutes = require('./src/movie/routes') 

const app = express()
const port = 3000
const logger = require('morgan');
app.use(express.json())

app.use(logger('dev'))
//app.use(cors()) //non installato, utile? bah

app.get('/', (req, res) => {
  res.send('Hello World')
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain') //necessari in express?
})


app.get('/login', (req, res) => {
    res.send('Hello login')
})

app.get('/testpage', (req, res) => {
    res.sendFile('testpage.html', {root: __dirname})
})

app.use('/api/v1/actors', actorRoutes)
app.use('/api/v1/login', loginRoutes)
app.use('/api/v1/movies', movieRoutes)

app.all('*', (req, res) =>{
    res.send('Pagina non trova')
})



app.listen(port, () => console.log(`server listening on port ${port}`))


//pensare azioni in comune come middleware