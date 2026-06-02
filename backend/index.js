var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var pool = require('./db');

var app = express();

app.use(cors());
//app.use(bodyParser.json());
app.use(express.json())
//var express=require('express')
//var pool=require('./db')
//const bodyParser = require('body-parser');
//var app=express()
//app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('<h1>MENU CARD API</h1>')
})

app.get('/menu',async (req,res)=>{
    var result=await pool.query('select * from menu')
    res.json({menu: result.rows});  //user - menu
 })

//iske baad hmme food ki query chahiye to postgres me jao tables me food_cat me right clk kro aur query run kro(select * from food_cat)
app.get('/food_cat',async (req,res)=>{
    var result=await pool.query('select * from food_cat')
    res.json({foodqty: result.rows});  
 })

//aur yek API

 app.get('/qty',async (req,res)=>{
    var result=await pool.query('select * from qty_mast')
    res.json({qtymast: result.rows});  //array ke naam me space,(_underscore) aise kuch nhi use krna.plain keywords use krna hai
 })
 


//isake baad jo bhi API hm create krenge wo direct sirf data lene ke liye nhi sbse aasan jo API hota hai
//wo SELECT ka.query bhi asaan hoti hai,aur structure bhi asan hota hai.but iske aage jo bhi API bnega kuch na kuch
//condition base work hoga.nhi to uske under kuch data pahle usko request krna hai.ye sare API agr dekh pa rake to responce
//enable hai.Req. hmne kuch kiya nhi.isko hm direct bol rhe jo DATA hai de do.(req,res)hm kuch bhi response me usko send nhi kiya hai.to hm chotasa query karunga

//structure hmne menuById bnaya hai.iska matlab jab hm(menuById)is API ko run krenge to ise hme yek id pass karege aur jo id hm pass krenge wo id iski ani chahiye.
//to direct query me (selet * from menu where id=1).to 1st id ka ayega,to hme alg alg id ka chahiye to fr code me jao aurchange kro.to user se hm input lenge user jo id waha pe dalega uska output hme chahiye.
//mhanje ata user kadun input ghen garjech ahe.to abhi hme req se yek data lena hoga,iske liye jo module chahiye hota hai wo hmne upr phle se hi liya hai.const body parser=require('body-parser'),jo body request aap krege uske Accordinglly hme
//JSON data lena hai.uska yek chotasa syntax hai.const{id}=req.body;hme jitna data req krna hai hm yaha pe const{id,,}comaa dege.

//ye data crome(browser)pe run nhi hoga.iske liye ham Thunder client ka use kege.
//jise localhost:3000/menu/mid=1 kiya to kuki req.body send kr rahe ho.body aise url pe run hoga to security ka kya hai.kon pn user name password takun data fetch krun gheil.aise method ko run krne ke liye thunder client ko use krlo.
//thunder pe-http://localhost:3000/menuById (new request-clk) aur right side me url cpy-paste aur send pe clk.niche Body me JSON me jake {"id":1} dala to response me 1 ka data ayega.2 dala to 2 ka
//lekin hmne const= req.query kiya hai to.server pe -http://localhost:3000/menuById?id=1 dalo aur thunder pe url cpy paste kro.(new req. pe clk)right side me cpy-paste aur send pe clk.to query pe json data ayega. 
//ById se bhi sabhi program select krna hai.menu,food_cat,qty_mast

//(thunder pe(new request)-right side[GET-select])GET:select/fetch(data)

app.get('/menuById',async (req,res)=>{
    try{
    const {id} =  req.query;

    var result=await pool.query('select * from menu where mid=$1',[id]) //hme yaha pe yek object create krna hai,to $1 lena hai.2,3 object lena hai to $2,$3 lena hai.iski value hame[id] me milegi upar.
    res.json({menu: result.rows});  
    }catch(err){
        console.error(err.message);
        res.status(300).send('Server Error');
    }
 })

 //REST matlab har yek chij ke liye method hai-get,post,put,delete
 //REST matlb kuch Rules and Regulations hote hai.jis type ka API hai usi method ka use kro.jise ki tumhe DELETE krna hai to tumhe app.delete method use krna hai.
 //tumhe agr update krna hai to app.put method ka use krna hai.data save krna hai to app.post method ka use.


//DELETE:delete/remove

// app.delete('/delmenuById',async (req,res)=>{
    app.delete('/delmenuById/:id', async (req,res)=>{
    try{
        // console.log(req.body);
        const id = req.params.id;
        
   // const {id} =  req.body;

    var result=await pool.query('delete from menu where mid=$1',[id]) //hme yaha pe yek object create krna hai,to $1 lena hai.2,3 object lena hai to $2,$3 lena hai.iski value hame[id] me milegi upar.
   // res.json({menu: result.rows});  
      res.send({status:"200",message:"remove Success"})
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
 })
//terminal-pe program run kro[cd RESTAPI , node index.js]
//ab thunder pe -new request(clk) kro aur right side pe(DELETE metohd set kro)aur url dalo-http://localhost:3000/delmenuById aur niche Body(JSON)me "id":5 dalo aur send pe clk.ab crome pe http://localhost:3000/menu dalke dekho 5 no. ka data del hua kya.
//iske bad food_cat aur qty_mast ka bhi delete krke dekho.


//terminal-cd RESTAPI.node index.js .. iske  baad thunder pe jao - new request-right side pe-
//POST(set) aur url-http://localhost:3000/addmenu iske baad niche Body me JSON me jao aur {"mname":"KOLHAPURI", "price":222, "fid":2, "qid":2}
//iske baad send pe(clk).left me green color pe post ayega.phir crome pe jao url-localhost:3000/menu pe data add hua hai kya dekho.

//POST:save/insert

app.post('/addmenu',async (req,res)=>{
    try{
    const {mname,price,fid,qid} =  req.body; //jo data yaha pe hai wo niche array me pass krna hai.4 data hai to 4$ likho. 

    const result=await pool.query('INSERT INTO menu(mname,price,fid,qid) VALUES($1,$2,$3,$4)RETURNING *',
        [mname,price,fid,qid]);
    
   // res.json({menu: result.rows});  //yaha pe result ayega.yaha pe data ane vala nhi hai kuch.hme response chahiye
   res.send({status:"200",message:"Save Success"})  //khud ka response chahiye jo msg chahiye wo
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
 });
//iske baad food_cat aur qty_mast ka bhi kro.


//PUT:update/changes
 app.put('/updatemenu',async (req,res)=>{
    try{
        const{id,mname,price,fid,qid}=req.body;  //xtra-kounsa record tum update krna chahte ho

        const result=await pool.query('UPDATE menu SET mname=$1,price=$2,fid=$3,qid=$4 where mid=$5 RETURNING *',
            [mname,price,fid,qid,id]);   //sequencelly add in [id]
            //res.json(result.rows);
            res.send({status:"200",message:"Update Success"})
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//terminal-cd RESTAPI node index.js
//thunder- new request-right side me-url me -http://localhost:3000/updatemenu (cpy-paste)
//aur PUT method use.niche Body me JSON me {"id":6,"mname":"CHINISE","price":550,"fid":2,"qid":2}..iske baad send pe clk aur crome pe jake dekho -localhost:3000/menu ki 6 no ka data me update/changes hua hai ki nahi.
//data nikalke usme naya data add krna.
//food_cat aur qty_mast ka kro. 

//Login  //POST:save/insert
app.post('/login',async(req,res)=>{
    try{
        const {uname,pwd}=req.body;
        const result=await pool.query('select uname,pwd from admin where uname=$1 and pwd=$2',
              [uname,pwd]);
        //res.json(result.rows);
        res.send({status:"200",message:"Login Success"})      
    }catch(err){
        console.error(err.message);
        res.status(300).send('Server Error');
    }
});

//terminal-cd RESTAPI  node index.js
//thunder -new request-right side-POST method use-url-http://localhost:3000/login
//niche body me JSON pe-{"uname":"admin", "pwd":"12345"}
//iske baad upr send pe clk and then response me Login Success ayega. 

//

//post-Add(food_cat)
// app.post('/addfood_cat',async (req,res)=>{
//     try{
//     const {category} =  req.body; //jo data yaha pe hai wo niche array me pass krna hai.4 data hai to 4$ likho. 

//     const result=await pool.query('INSERT INTO food_cat(category) VALUES($1)RETURNING *',
//         [category]);
    
//    // res.json({menu: result.rows});  //yaha pe result ayega.yaha pe data ane vala nhi hai kuch.hme response chahiye
//    res.send({status:200,message:"Save Success"})  //khud ka response chahiye jo msg chahiye wo
//     }catch(err){
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
//  });

//food_cat
//postgresql me fid-primary key kiya hai (auto).isiliye fid nhi dala

app.post('/addfood_cat', async (req, res) => {
  try {
    const { category } = req.body;

    const result = await pool.query(
      'INSERT INTO food_cat(category) VALUES($1) RETURNING *',
      [category]
    );

    res.status(200).json({ message: "Save Success" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//PUT:update/changes
 app.put('/updatefood_catById',async (req,res)=>{
    try{
        const{fid,category}=req.body;  //xtra-kounsa record tum update krna chahte ho

        const result=await pool.query('UPDATE food_cat SET category=$1 WHERE fid=$2 RETURNING *',
            [category,fid]);   //sequencelly add in [fid]
            //res.json(result.rows);
            res.send({status:"200",message:"Update Success"})
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//delete
 app.delete('/delfood_catById/', async (req,res)=>{
    try{
        // console.log(req.body);
       // const id = req.params.id;
        
   const {id} =  req.body;

    var result=await pool.query('delete from food_cat where fid=$1',[id]) //hme yaha pe yek object create krna hai,to $1 lena hai.2,3 object lena hai to $2,$3 lena hai.iski value hame[id] me milegi upar.
   // res.json({menu: result.rows});  
      res.send({status:200,message:"remove Success"})
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
 })

//qtymast
//add(post)
app.post('/addqty', async (req, res) => {
  try {
    const { size} = req.body;

    const result = await pool.query(
      'INSERT INTO qty_mast(size) VALUES($1) RETURNING *',
      [size]
    );

    res.status(200).json({ message: "Save Success" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//update(put)
app.put('/updateqtyById',async (req,res)=>{
    try{
        const{qid,size}=req.body;  //xtra-kounsa record tum update krna chahte ho

        const result=await pool.query('UPDATE qty_mast SET size=$1 WHERE qid=$2 RETURNING *',
            [size,qid]);   //sequencelly add in [fid]
            //res.json(result.rows);
            res.send({status:200,message:"Update Success"})
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//delete
app.delete('/delqtyById', async (req,res)=>{
    try{
        // console.log(req.body);
       // const id = req.params.id;
        
   const {qid} =  req.body;

    var result=await pool.query('delete from qty_mast where qid=$1',[qid]) //hme yaha pe yek object create krna hai,to $1 lena hai.2,3 object lena hai to $2,$3 lena hai.iski value hame[id] me milegi upar.
   // res.json({menu: result.rows});  
      res.send({status:200,message:"remove Success"})
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
 })

//menucard
app.get('/menucard', async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT 
        m.mid,
        m.mname,
        m.price,
        c.category,
        q.size
      FROM menu m
      JOIN food_cat c ON m.fid = c.fid
      JOIN qty_mast q ON m.qid = q.qid
    `);

    res.json({ menu: result.rows });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//crd
app.get("/cnt", async (req, res) => {
    try {
        const menuCount = await pool.query("SELECT COUNT(*) FROM menu");
        const foodCatCount = await pool.query("SELECT COUNT(*) FROM food_cat");
        const qtyCount = await pool.query("SELECT COUNT(*) FROM qty_mast");

        res.json({
            menu_count: parseInt(menuCount.rows[0].count),
            food_cat_count: parseInt(foodCatCount.rows[0].count),
            qty_count: parseInt(qtyCount.rows[0].count),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

// Server start
app.listen(3000, '127.0.0.1', ()=>{
    console.log('Listening on 127.0.0.1:3000');
});



//terminal-cd RESTAPI 2. node index.js 3.server-localhost:3000/menu   4.json data print
//food_cat-localhost:3000/food_cat    [json data aayega]
//qty_mast-localhost:3000/qty
//error aa raha hai to async aur await use kro.jb tk sara data nhi ata hai,tb tk isko wait krvata hai.result baki hai,baki hai.pura result calculate ho gya to then isko print krvata hai.
//user-data dalo(array name)
//SELECT ke sare API  jo hai wo GET method se banate hai.

//program me kuch error aaya to try,catch use
// app.get('/menu',async (req,res)=>{
//     try{
//     var result=await pool.query('select * from menu')
//     res.json({menu: result.rows});  
//     }catch(err){
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
//  })

//SELECT ke API-browser pe run honge.
//ById ke API-browser pe Run nhi honge.wo thunder client pe run honge.