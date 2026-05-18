require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');

const CLIENT_URL = process.env.CLIENT_URL?.replace(/\/$/, "");

app.use(express.json({ limit: '10mb' }));
if (!CLIENT_URL) {
    console.warn("Warning: CLIENT_URL is not set. CORS may block frontend requests.");
}
app.use(cors({ origin: CLIENT_URL }));


// Product Routes
app.use('/products', productRoutes)

//auth User Routes
app.use('/auth', userRoutes)

//cart Routes
app.use('/cart', cartRoutes)

//Order Router
app.use('/orders', orderRoutes)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});