const mongoose = require('mongoose')
const express = require('express');
require('dotenv').config();
const cors = require("cors");
const user = require('./routes/users')
const product = require('./routes/products')
const cart = require('./routes/cart')
const authenticate = require('./middleware/authenticate')
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use('/api/auth', user);
app.use(authenticate)
app.use('/api', product);
app.use('/api', cart);


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected Successfully');
}).catch((err) => {
    console.log(err);
})

const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`http://localhost:${port}`));





// mongodb://localhost:27017