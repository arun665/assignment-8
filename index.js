var express =require("express");
var app=express();
var Product=require("./conn/schema");

var flash=require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session')
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// session middleware
const { body, validationResult } = require('express-validator');




  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  
}))
app.use(flash());
app.get('/',function(req,res){

    res.render('index');

});
app.get('/check_in',function(req,res){
    res.render('form',{message:req.flash("success"),error:req.flash("error")});
})


app.post('/submit', async function(req,res){

    try{
        console.log("running");

var name=req.body.name;
var email=req.body.mail;
var phone=req.body.phone;
var time=req.body.time;
var date=req.body.date;
var address=req.body.address;


if(  name.length>3 ){
var user=new Product({
    name:name,
    email:email,
    phone:phone,
    time:time,
    date:date,
    address:address
})

await user.save();



var nodemailer = require("nodemailer");
 
var sender = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arunsharmamoh4@gmail.com',
    pass: 'Arun1117'
  }
});
 
var mail = {
  from: "arunsharmamoh4@gmail.com",
  to: email,
  subject: "thanks "+name+" checking in ,",
  html: " <p>thanks for taking time out of your busy schedule and checking in using our form </p> <br/> <hr></hr><p> name :"+name+" </p><br/> <p> phone :"+phone+" </p> <br/> <p> time :"+time+" </p> <br/> <p> date :"+date+" </p>" 
};
 
  await sender.sendMail(mail, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent successfully: "
                 + info.response);
  }
});




req.flash("success","check in successfull , You will receive a mail shortly of the confirmation of your booking")
res.render('form',{message:req.flash("success"),error:req.flash("error")});

}
else{
    req.flash("error","please fill the details in required format")
    res.render('form',{message:req.flash("success"),error:req.flash("error")});
}





    }
    catch(err){
        res.send(err);
    }


});



app.get('/list', async function(req,res){
try{
    var list=await Product.find();

console.log(list);
    res.render('record',{list:list});

}
catch(err){
    res.send(err);
}

});

app.get('/delete/:id',async function(req,res){


    try{
        var id=req.params.id;
        
        await Product.findByIdAndDelete(id);

        res.redirect('/list');

    }
    catch(err){
        res.send(err);
    }

});


app.get('/edit/:id',async function(req,res){

try{
var id=req.params.id;

var x=await Product.findById(id);
res.render('edit',{x:x,message:req.flash("success"),error:req.flash("error")});



}
catch(err){
    res.send(err);
}

})



app.post('/edit/:id',async function(req,res){

    try{
    var id=req.params.id;
    var name=req.body.name;
var email=req.body.mail;
var phone=req.body.phone;
var time=req.body.time;
var date=req.body.date;
var address=req.body.address;




    await Product.findByIdAndUpdate(id,{
        name:name,
        email:email,
        phone:phone,
        time:time,
        date:date,
        address:address


    });
   res.redirect('/list');
    
    
    
    }
    catch(err){
        res.send(err);
    }
    
    })

app.listen( process.env.PORT || 3000);

