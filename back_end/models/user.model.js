const db = require('../config/db'); 
const bcrypt = require("bcrypt"); 
const mongoose = require('mongoose'); 
const { Schema } = mongoose; 
 
const userSchema = new Schema({ 
    email: { 
        type: String, 
        lowercase: true, 
        required: [true, "userName can't be empty"], 
        // @ts-ignore 
        match: [ 
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 
            "userName format is not correct", 
        ],
          unique: true, 
    }, 
    password: { 
        type: String, 
        required: [true, "password is required"], 
    }, 
},{timestamps:true}); 
 
 
// used while encrypting user entered password  
userSchema.pre("save",async function(){ 
    var user = this; 
    if(!user.isModified("password")){ 
        return 
    } 
    try{ 
        const salt = await bcrypt.genSalt(10); 
        const hash = await bcrypt.hash(user.password,salt); 
 
        user.password = hash; 
    }catch(err){ 
  throw err; 
    } 
}); 
 
 
//used while signIn decrypt 
userSchema.methods.comparePassword = async function 
(candidatePassword) { 
    try { 
        console.log('----------------no password',this.password); 
        // @ts-ignore 
        const isMatch = await bcrypt.compare(candidatePassword, 
this.password); 
         return isMatch; 
    } catch (error) { 
        throw error; 
    } 
}; 
 
const UserModel = db.model('user',userSchema); 
module.exports = UserModel; 