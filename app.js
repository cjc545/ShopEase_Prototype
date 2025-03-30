const sqlite = require('sqlite3').verbose();
const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();

const db = new sqlite.Database(`./databases/users.db`, sqlite.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err);
})

app.use(bodyParser.json());

//post request
app.post('quote', (req, res)=>{
    try{
        console.log(req.body.username)
        res.json({
            status: 200,
            success: true,
        })
    } catch (error){
        return res.json({
            status: 400,
            success: false,
        });
    }
})
app.listen(3000)