import jwt from 'jsonwebtoken'

const resAuth = async (req, res, next) =>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new Error("Ошибка с Authorazation")
    }
    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token, "JWT_ACESS_SECRET")
        req.user = {UserResId: payload.UserResId}
        next()
    } catch (err){
        throw new Error("Ошибка авторизации")
    }
}
export default resAuth