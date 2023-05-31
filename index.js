const mongoose = require('mongoose')
const express = require('express');
const user = require('./routes/users')
const product = require('./routes/products')
const cart = require('./routes/cart')
const authenticate = require('./middleware/authenticate')
const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use('/api', user);
app.use(authenticate)
app.use('/api', product);
app.use('/api', cart);


mongoose.connect('mongodb://localhost/product').then(() => {
    console.log('Connected Successfully');
}).catch((err) => {
    console.log(err);
})

const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`http://localhost:${port}`));





// mongodb://localhost:27017