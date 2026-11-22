import commentsSchema from "../schemas/comments.js"

export async function validateComment(req, res, next){
    try {
        const validatedComment = await commentsSchema.parseAsync(req.body)
        req.body = validatedComment
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
    next()
}