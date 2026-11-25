import  jwt  from "jsonwebtoken";
import 'dotenv/config';
const JWT_SECRET = process.env.JWT_PW

export function validateToken(req, res, next){
    try {
        const auth = req.headers.authorization
        const [bearer, token] = auth.split(" ")
        if(bearer != "Bearer") throw new Error("")
        const payload = jwt.verify(token, JWT_SECRET)
        req.user = payload // agrego el user a la request.. esto es un middleware!! entntonces sigue el recorrido hacie el controller 
        next()
    } catch (error) {
        res.status(401).json({message: "No estás autorizado para ingresar"})
        
    }
}

// esto es asi porque permite recibir un array de roles permitidos
export function validateRol(roles) {
    return (req, res, next) => {
        if (roles.includes(req.user?.rol)) return next()
        res.status(403).json({ message: "No tenés permisos para esta acción" })
    }
}