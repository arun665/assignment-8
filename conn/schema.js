const mongoose = require('mongoose');





mongoose.connect("mongodb+srv://mongodb:Arun1117@cluster0.spwl1.mongodb.net/assignment_8_form?retryWrites=true&w=majority",{useNewUrlParser:true , useUnifiedTopology:true})
.then(function(){
    console.log(" this is running successfully");
})
.catch(function(error){
    console.log(error);

});

const user = new mongoose.Schema({
   name:{
       type:String
   },
   phone:{
       type:String
   },
   email:{
       type:String
   },
   time:{
       type:String
   }
   ,
   address:{
       type:String
   }
   ,
   date:{
       type:String
   }





})




const Product = mongoose.model('Product', user);



module.exports=Product;