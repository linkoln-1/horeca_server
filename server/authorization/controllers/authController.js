import UserRes from "../models/user-res-model"
import UserSup from "../models/user-sup-model"

const loginUserRes = async (req, res) =>{
    const {email, password} = req.body
    if (!email || !password){
        throw new Error("Вы ввели не данные в поля")
    }
    const userRes = UserRes.findOne({ email })
    if(!userRes){
        throw new Error("Вы ввели некорректные данные")
    }
    if(userRes.isActivated === false){
        throw new Error("Доступ временно запрещен")
    }
    const isPassCorr = await userRes.comparePassword(password)
    if(!isPassCorr){
        throw new Error("Невереный пароль")
    }
    const token = userRes.createJWT()
    res.status(200).json({ userRes, token })
}

const loginUserSup = async (req, res) =>{
    const {email, password} = req.body
    if (!email || !password){
        throw new Error("Вы ввели не данные в поля")
    }
    const userSup = UserSup.findOne({ email })
    if(!userSup){
        throw new Error("Вы ввели некорректные данные")
    }
    if(userSup.isActivated === false){
        throw new Error("Доступ временно запрещен")
    }
    const isPassCorr = await userSup.comparePassword(password)
    if(!isPassCorr){
        throw new Error("Невереный пароль")
    }
    const token = userSup.createJWT()
    res.status(200).json({ userSup, token })
}

export {loginUserSup, loginUserRes}