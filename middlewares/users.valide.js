import { userRegisterSchema, userLoginSchema, userRolSchema }  from "../schemas/users.js"

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

export async function validateUserRol(req, res, next) {
    try {
        req.body = await userRolSchema.parseAsync(req.body)
        next()
    } catch (errors) {
        res.status(400).json(errors?.issues?.map(e => e.message))
    }
}