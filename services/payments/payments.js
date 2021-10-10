var os = require("os");
var hostname = os.hostname();
var served_by = `shopme-network/${hostname}/${process.pid}`

const express = require("express")
const app = express()

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressip = require('express-ip');
const cors = require("cors")
const compression = require("compression")
const helmet = require("helmet")
const useragent = require('express-useragent');
const mongoose = require("mongoose")
const stripe = require("stripe")('sk_test_51HkmjIAXqvDWfijTmXmaGjEhqdLxxKe42vGzGbpQ0qzQf13h9YCe8obEIXDXyBdh3MuKMYlXQiO7qcP7OC9nPe2s001OYzyqyK')
//test : sk_test_51HkmjIAXqvDWfijTmXmaGjEhqdLxxKe42vGzGbpQ0qzQf13h9YCe8obEIXDXyBdh3MuKMYlXQiO7qcP7OC9nPe2s001OYzyqyK
//prod : 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

//Setting up middlewares
app.use((req, res, next) => {
    req["user"] = {
        UserId: "Sample-user-id"
    }
    res.setHeader("served-by", served_by)
    next()
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(cors())
app.use(expressip().getIpInfoMiddleware);
app.use(helmet());
app.use(compression())
app.use(useragent.express())

app.post('/payment-sheet', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create({
        customer: customer.id
    }, {
        apiVersion: '2020-08-27'
    });
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 10*100,
        currency: 'INR',
        customer: customer.id,
    });
    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id
    });
});

app.listen(3700, () => console.log("Payments service running"))