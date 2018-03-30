var express = require('express');
var mysql = require('mysql');
var app=express();

var pool=mysql.createPool({
  host:"127.0.0.1",
  user:"root",
  password:"root",
  database:"item",
  port:3306
})

app.get('/', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*')
  pool.getConnection(function(err,connection){
    if(err){
      console.log(err)
    }
    var sql="select * from news"
    connection.query(sql,function(err,data){
      if(err){
        console.log(err)
      }
      // var obj=eval("("+data+")")
      console.log(data)
      res.send(data)
      
      
      connection.end()
      
      
    })
  })
});
app.get('/del',function(req,res){
  res.setHeader('Access-Control-Allow-Origin','*')
  var json=req.query.id
  pool.getConnection(function(err,connection){
    if(err){
      console.log(err)
    }
    var sql="delete from news where id=?"
    connection.query(sql,[json],function(err,data){
      if(err){
        console.log(err)
      }
      // var obj=eval("("+data+")")
      console.log(data)
      console.log(json)
      res.send(json)
      
      
      connection.end()
      
      
    })
  })
})
app.post('/mytext',function(req,res){
	//获取需要添加的信息 ，包含（书名，作者名，内容，当前账户uid）
	var json = req.body
	//连接
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		//插入到数据库
		var sql = 'insert into news(tit,con) values(?,?)'
		connection.query(sql,[json.tit,json.con],function(err,data){
			if(err){
				console.log('mysql::'+err)
				return
			}
			res.send('ok')
			connection.end()
		})
	})
})

app.listen(8001,function(){
  console.log("ok")
})