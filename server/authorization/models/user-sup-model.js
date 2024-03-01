import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const UserSupSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
},
    {timestamps: true}
)

UserSupSchema.pre("save", async function(){
    if(!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSupSchema.methods.createJWT = function () {
    return jwt.sign({ UserSupId: this._id }, "JWT_ACESS_SECRET", { expiresIn: "1h" });
};

UserSupSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model("UserSup", UserSupSchema)