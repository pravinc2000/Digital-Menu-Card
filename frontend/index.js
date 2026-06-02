const express = require('express');
const pool = require('./db'); // Assuming the connection is in db.js
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());


app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/login', async (req, res) => {
    try {
         const { email,pwd} = req.body;
        const result = await pool.query('SELECT email,pwd FROM users where email=$1 and pwd=$2',
            [email,pwd]);
         if( result.rows.length>0){
           // res.json(result.rows);
           const rs = await pool.query('SELECT id,name ,email,pwd FROM users where email=$1 and pwd=$2',
            [email,pwd]);
            res.send({status: "200 ",message: "Login Sucess ",data:rs.rows})
         }else{
            res.send({status: "400 ",message: "Login Failed "})
         }
        // 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
