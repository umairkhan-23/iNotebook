 const mongoose = require ('mongoose');
  const mongoURI= 'mongodb://127.0.0.1:27017/inotebook'
 
  mongoose.set('strictQuery', false)



 const connecttomongo=()=> {
   
   mongoose.connect(mongoURI, 
       { 
         useNewUrlParser: true,
        //  useCreateIndex: true,
       useUnifiedTopology: true
    },
      
     ()=>{
      console.log('connected')
     }) 
     
     
   }
 


 module.exports=connecttomongo;


