import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const AdminSchema = new Schema({
        email: {type: String, unique: true, required: true, trim: true},
        password: {type: String, required: true, trim: true},
        isActivated: {type: Boolean, default: false},
        activationLink: {type: String},
    },
    {timestamps: true}
)

AdminSchema.pre("save", async function(){
    if(!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

AdminSchema.methods.createJWT = function () {
    return jwt.sign({ adminId: this._id }, "JWT_ACESS_SECRET", { expiresIn: "1h" });
};

AdminSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model("Admin", AdminSchema)