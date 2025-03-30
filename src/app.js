const sqlite = require('sqlite3').verbose()
const bodyParser = require()

const db = new sqlite.Database(`./user.db`, sqlite.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err);
})

