const sqlite = require('sqlite3').verbose();
const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();
const url = require('url');
var cors = require('cors')
let sql;

const db = new sqlite.Database(`./databases/users.db`, sqlite.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err);
})

app.use(cors());
app.use(bodyParser.json());


//post request
app.post('/users', (req, res)=>{
    try{
       const {username, password, email} = req.body;
       sql = "INSERT INTO users(username, password, email) VALUES (?,?,?)"
       db.run(sql, [username, password, email], (err)=>{
        if (err) return res.json({status: 300, success: false, error: err});

        console.log(`succesful input`, username, password, email);
       });
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
});
//get request
app.get('/users',(req, res)=>{
    sql = "SELECT * FROM users";
    try {
        const queryObject = url
        db.all(sql,[],(err,rows)=>{
            if (err) return res.json({status: 300, success: false, error: err});

            if(rows.length<1) return res.json({status: 300, success: false, error: "no match"});

            return res.json({status:200, data:rows, success:true});
        });
    } catch (error){
        return res.json({
            status: 400,
            success: false,
        });
    }
});



app.listen(3000)