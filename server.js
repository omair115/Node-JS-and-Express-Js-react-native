var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json({type:'application/json'}));


//support url encode body
app.use(bodyParser.urlencoded({extended:true}))


var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'contactappdb'
})

var server = app.listen(9090,function(){
 var host = server.address().address;
 var port = server.address().port;
console.log('app start')

})
con.connect(function(error){
    if(!!error)console.log('error');
    else console.log('connected')
})


//View the data in database
app.get('/main',function(req,res){
con.query('SELECT * FROM main',function(error,rows,fields){
    if(!!error)console.log('error');
    else{
        console.log(rows)
        res.send(rows)
    }
})
})

//Insert the data in database
app.post('/main',function (req,res){
 con.query('INSERT INTO main set ?',req.body,function(error,rows,fields){
     if(!!error)console.log('error')
     else{
         console.log(rows);
         res.send(JSON.stringify(rows))
     }   
    })
})


//search the data in database
app.get('/main/:id',function(req,res){
    console.log(req.params.id)
    con.query('SELECT * FROM main WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error)console.log('error')
        else{
            console.log(rows);
            res.send(JSON.stringify(rows))
            
        }   
       })
})


//delete from database
app.delete('/main/:id',function(req,res){
    console.log(req.params.id)
    con.query('DELETE * FROM main WHERE id=?',req.params.id,function(error,rows,fields){
        if(!!error)console.log('error')
        else{
            console.log(rows);
            res.end('Deleted Successfuly')
        }   
       })
})


//update to database
app.put('/main',function (req,res){
    con.query('UPDATE main set name= ?,email=?,phone=?',[req.body.id,req.body.name,req.body.email.req.body.phone],function(error,rows,fields){
        if(error) throw error
      
            console.log(rows);
            res.end(JSON.stringify(rows))
        
       })
   })
   