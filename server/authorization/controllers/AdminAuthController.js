import Admin from "../models/Admin-model";

const loginAdmin = async (req, res) =>{
    const {email, password} = req.body
    if (!email || !password){
        throw new Error("Вы ввели не данные в поля")
    }
    const admin = Admin.findOne({ email })
    if(!admin){
        throw new Error("Вы ввели некорректные данные")
    }
    if(admin.isActivated === false){
        throw new Error("Доступ временно запрещен")
    }
    const isPassCorr = await admin.comparePassword(password)
    if(!isPassCorr){
        throw new Error("Невереный пароль")
    }
    const token = admin.createJWT()
    res.status(200).json({ admin, token })
}