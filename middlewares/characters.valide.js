import { charactersSchema, charactersPartialSchema } from '../schemas/characters.js'

function formatErrors(errors) {
    return errors?.issues?.map(e => `${e.path.join(".")}: ${e.message}`)
}

export async function validateCharacter(req, res, next) {
    try {
        req.body = await charactersSchema.parseAsync(req.body)   // body validadooo
        next()
    } catch (errors) {
        res.status(400).json(formatErrors(errors))
    }
}

export async function validateCharacterPartial(req, res, next) {
    try {
        req.body = await charactersPartialSchema.parseAsync(req.body)
        next()
    } catch (errors) {
        res.status(400).json(formatErrors(errors))
    }
}