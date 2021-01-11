const express = require("express")
const app = express()
const router = express.Router()
const port = 8000
const cors = require("cors")
// const con = require('./database/database')
// require ('./routes/userRoutes')(router, con)

app.use(express.urlencoded({
    extended: true,
}))

app.use(express.json())

app.use(cors())

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Acces-Control-Allow-Methods",
        req.header("Access-Control-Request-Method")
    );
    res.header(
        "Acces-Control-Allow-Headers",
        req.header("Access-Control-Allow-Headers")
    );
    next();
});

app.use("/", require("./routes/routes"))

app.listen(port, ()=>{
    console.log(`http://localhost:${port}/`);
})

