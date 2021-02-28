const express = require("express")
const app = express()
const port = 8000
const cors = require("cors")
const con = require('./database/database')

//Middleware
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())
app.use(cors())

//Cors Middleware
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Acces-Control-Allow-Methods",
        req.header("Access-Control-Request-Method")
    );
    //Token in header
    res.header(
        "Acces-Control-Allow-Headers",
        req.header("Access-Control-Allow-Headers")
    );
    next();
});

require('./routes/userRoutes')(app, con)
require('./routes/productRoutes')(app, con)
require('./routes/adminRoutes')(app, con)


// app.use("/", require("./routes/routes"))


app.listen(port, ()=>{
    console.log(`http://localhost:${port}/`);
})

