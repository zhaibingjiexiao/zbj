var mysql = require('mysql')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var user = express.Router()

app.use(bodyParser.urlencoded({}))
app.use('/user',user)

var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123woaini',
    database:'cococ',
    port:3306
})



//录入
user.post('/login2',function(req,res){
    var name = req.body.name
    var textname = req.body.textname
    var text= req.body.text
    pool.getConnection(function(err,connection){
        if(err){
            console.log('connection::'+err)
            return
        }
        
        connection.query('select * from text where name=?',[name],function(err,data){
            if(err){
            console.log('mysql::'+err)
            return
            }
            if(data == ''){
                connection.query('insert into text(name,textname,text) values(?,?,?)',[name,textname,text],function(err,data){
                    if(err){
            console.log('mysql::'+err)
            return
            }
                    res.send('录入成功')
                })
            }else{
                res.send('录入失败/重复')
            }
            
        })
    })
    
})

//fan

// user.post('/login2',function(req,res){
//     pool.getConnection(function(err,connection){
//         if(err){
//             console.log('connection：：'+err);
//             return
//         }
//         var sql = 'select * from text'
//         connection.query(sql,function(err,data){
//             if(err){
//                 console.log('mysql：：'+err)
//                 return
//             }


//             res.send(data)
//             connection.end()
//         })
//     })
// })




app.use(express.static('./'))
app.listen(8000,function(){
    console.log('ok')
})