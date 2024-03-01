import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const UserResSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
})

UserResSchema.pre("save", async function(){
    if(!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
},
    {timestamps: true}
)

UserResSchema.methods.createJWT = function () {
    return jwt.sign({ UserResId: this._id }, "JWT_ACESS_SECRET", { expiresIn: "1h" });
};

UserResSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model("UserRes", UserResSchema)