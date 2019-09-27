var express=require("express"); 
var bodyParser=require("body-parser"); 
var path = require('path')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var passportLocalMongoose = require('passport-local-mongoose')

var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose'); 
var app=express() 


mongoose.connect('mongodb://localhost:27017/Node',{useNewUrlParser:true, useUnifiedTopology: true }); 


var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 


app.get('/resume.html',function(req,res){
	res.sendFile(__dirname+"/resume.html")
})
app.post('/resume1',function(req,res){
	console.log(req.body)
	fname=req.body.fname;
	yoe=req.body.yoe;
	gp=req.body.gp;
	proj=req.body.proj;
	skills=req.body.skills;
	company=req.body.company
})

/*app.get('/',function(req,res){ 
res.set({ 
	'Access-control-Allow-Origin': '*'
	}); 
	return res.redirect('User.html'); 
}).listen(3000) */
app.get('/',function(req,res){
	res.sendFile(__dirname+'/User.html')
    
});

app.get('/login',function(req,res){
	res.sendFile(path.join(__dirname,'Login.html'));
});


// app.post('/login',passport.authenticate('local',{
// 	successRedirect:'/',
// 	failureRedirect:'/login'
// }),(req,res)=>{
// 	console.log('working')
// })

app.get('/Home.html',function(req,res){
	res.sendFile(__dirname+"/Home.html")
})
app.post('/sign_up', function(req,res){ 
	var name = req.body.name; 
	var email =req.body.email; 
	var pass = req.body.password; 
	var phone =req.body.phone; 

	var data = { 
		"name": name, 
		"email":email, 
		"password":pass, 
		"phone":phone 
	} 
db.collection('details').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Record inserted Successfully"); 
			
	}); 
		
	res.sendFile(__dirname+'/Home.html'); 
}) 

app.post('/login', function (req, res) {
	username = req.body.name;
	console.log(username)
	
	password = req.body.password;
	var url = "mongodb://localhost:27017/Node";
	MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology: true },function(err, db){
		var dbo = db.db('Node');
		var query = {name: username, password: password}
		 dbo.collection('details').find(query, function(err,result){
		  if(err) throw new Error(err);
		  else {
			 
			  res.sendFile(__dirname+"/Home.html")
		  }
		  db.close();
		//   if(!Node) {//Yeah user kaha say aaya?are ye asi uthaya mai ye Node hoga
		// 	res.sendFile(__dirname+"/Login.html")
		// 	console.log('Not found');
		//   }
		//   else{ 
		// 	  res.sendFile('/')
		// 	console.log('Found!');
		//   }
	  });
		
});
});
app.listen(3000,function(){
    console.log("server listening at port 3000"); 
});


