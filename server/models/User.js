const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs')
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

userSchema.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(this.password, salt); 
        this.password = hash; 

        next()
    } catch (error) {
        console.log("Something went wrong on hashing the password\n",error)
    }

})

userSchema.statics.login = async function(email, password) { 
    const user = await this.findOne({email: email}); 
    const auth = await bcrypt.compareSync(password, user.password); 
    if(auth) {
        return user;    
    } else { 
        return ({response: "the password is incorrect"})
    }
} 


module.exports =  mongoose.model("User", userSchema);
