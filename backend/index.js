 const connecttomongo = require('./db')
const express = require('express');
var cors = require('cors')



connecttomongo();
const app = express()
const port = 5000



app.use(cors())


app.use(express.json())
//Avlaible routes


app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))


app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})
