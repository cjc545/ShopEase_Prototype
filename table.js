const { error } = require('console')

const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database(`./orders.db`, sqlite.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err);
})

const sql = `CREATE TABLE orders(ID INTEGER PRIMARY KEY, product, customerEmail)`
db.run(sql);