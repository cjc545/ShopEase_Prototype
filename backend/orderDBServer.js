const sqlite = require('sqlite3').verbose();
const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();
const url = require('url');

const cors = require("cors");
let sql;

const db = new sqlite.Database(`./databases/orders.db`, sqlite.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err);
})

app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:2000"}))

//post request
app.post('/orders', (req, res)=>{
    try{
       const {Product, CustomerEmail} = req.body;
       sql = "INSERT INTO orders(Product, CustomerEmail) VALUES (?,?)"
       db.run(sql, [Product, CustomerEmail], (err)=>{
        if (err) return res.json({status: 300, success: false, error: err});

        console.log(`succesful input`, Product, CustomerEmail);
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
app.get('/orders',(req, res)=>{
    sql = "SELECT * FROM orders";
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



app.listen(3200)