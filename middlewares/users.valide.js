import { userRegisterSchema, userLoginSchema }  from "../schemas/users.js"

export async function validateUserRegister(req, res, next){
    try {
        const validatedUser = await userRegisterSchema.parseAsync(req.body)
        req.body = validatedUser
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
    next()
}

export async function validateUserLogin(req, res, next){
    try {
        const validatedUser = await userLoginSchema.parseAsync(req.body)
        req.body = validatedUser
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
    next()
}