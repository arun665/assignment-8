const mongoose = require('mongoose');





mongoose.connect("mongodb+srv:// paste your mongo link here)
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
