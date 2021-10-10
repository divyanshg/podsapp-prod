var os = require("os");
var hostname = os.hostname();
var served_by = `shopme-network/${hostname}/${process.pid}`


const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;
const PORT = process.env.PORT || 3600

if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });

} else {

const express = require("express")
const app = express()

const mainRouter = require("./routes/index")

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressip = require('express-ip');
const cors = require("cors")
const compression = require("compression")
const helmet = require("helmet")
const useragent = require('express-useragent');

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


//Setting up routers

app.use("/", mainRouter)

app.listen(PORT, () => console.log("Episodes service running"))
}