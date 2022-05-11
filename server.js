const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const client = require('./config/sanityConfig')
const port = process.env.PORT || 5000

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/posts', require('./routes/dataRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

