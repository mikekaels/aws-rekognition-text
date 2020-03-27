const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());

//router
const router = require('./router')

//root end point
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: 'Welcome to kaelsihombing github'
    })
})

//  Exception Handlers
const {
    notFound,
    serverError
} = require('./exceptionHandler')


app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', router)

app.use(serverError)
app.use(notFound)
app.listen(port, () => {
    console.log(`Server started at ${Date()}`);
    console.log(`Listening to port ${port}`);
})

module.exports = app;