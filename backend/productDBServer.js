const sqlite = require('sqlite3').verbose();
const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();
const url = require('url');
let sql;

const db = new sqlite.Database(`./databases/products.db`, sqlite.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err);
})

app.use(bodyParser.json());

//post request
app.post('/products', (req, res)=>{
    try{
       const {ProductName, Price} = req.body;
       sql = "INSERT INTO products(ProductName, Price) VALUES (?,?)"
       db.run(sql, [ProductName, Price], (err)=>{
        if (err) return res.json({status: 300, success: false, error: err});

        console.log(`succesful input`, ProductName, Price);
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
app.get('/products',(req, res)=>{
    sql = "SELECT * FROM products";
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



app.listen(3100)