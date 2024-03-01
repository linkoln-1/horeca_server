import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) =>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new Error("Ошибка с Authorazation")
    }
    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token, "JWT_ACESS_SECRET")
        req.user = {AdminId: payload.AdminId}
        next()
    } catch (err){
        throw new Error("Ошибка авторизации")
    }
}
export default adminAuth