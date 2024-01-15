const mongoose = require('mongoose');
const mongoURI ='mongodb+srv://mahilrashid09:rashid09@cluster0.zubx0my.mongodb.net/mernapp?retryWrites=true&w=majority'
const mongoDB = async() => {
   await mongoose.connect(mongoURI,{useUnifiedTopology: true},async(err,result)=>{  
       if(err) console.log("---",err)
       else{
        console.log("connected");
    
    }
            
           
            
        });
    }

    module.exports = mongoDB();