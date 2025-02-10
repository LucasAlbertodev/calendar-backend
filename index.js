const express = require('express');
require('dotenv').config();
const cors = require('cors')
const {dbConnection} = require('./database/config')

const app = express();

//DB
dbConnection()

//CORS
app.use(cors());


//directory public
app.use(express.static('public'));

//parset json
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//listen server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})