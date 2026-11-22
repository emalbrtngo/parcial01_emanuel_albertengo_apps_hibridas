import { z } from "zod"

export const commentsSchema = z.object({
    _id: z.string().optional(),
    content: z.string("¿No tenes nada para comentar?").min(1, "No podés enviar un comentario vacío").max(500, "Tu comentario es demasiado largo, el máximo es de 500 carácteres")
}, 'Objeto inválido')

export default commentsSchema;