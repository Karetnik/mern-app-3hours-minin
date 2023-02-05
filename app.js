const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')
const path = require('path')
const app = express()
const authRoutes = require('./routes/auth.routes')
const linkRoutes = require('./routes/link.routes')

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/link', linkRoutes)
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 7000

async function start() {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.get('mongoUriLocal'), {
      useNewUrlParser: true,
      useUnifiedTopology:true
    })
    await app.listen(PORT, () => {
      console.log('Server has been started on port', PORT);
    })
  } catch(e) {
    console.log('Чтото пошло не так', e.message);
    process.exit(1)
  }
}

start()