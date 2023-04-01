const mongoose=require('mongoose');
const bcrypt=require('bcrypt');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}) 


userSchema.pre('save',async function(next){
    console.log('user is about to be cerated and save',this);
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
} )

const userModel=mongoose.model('Makeuser',userSchema);

module.exports=userModel;