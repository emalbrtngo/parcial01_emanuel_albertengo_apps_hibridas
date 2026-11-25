import { z } from "zod"

export const userRegisterSchema = z.object({
    _id: z.string().optional(),
    username: z.string("El nombre de usuario es obligatorio")
        .min(3, "El nombre de usuario debe tener como mínimo 3 caracteres"),
    email: z.email("El campo es obligatorio y debe ser un email"),
    password: z.string("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener como mínimo 8 caracteres")
        .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
        .regex(/[a-z]/, "La contraseña debe contener al menos una minúscula")
        .regex(/[0-9]/, "La contraseña debe contener al menos un número")
        .regex(/[@_!#$%^&*()?"]/, "La contraseña debe contener al menos un símbolo (@_!#$%^&*()?\")"),
    passwordConfirm: z.string("Confirmá tu contraseña"),
}, "Objeto inválido")
    .refine((data) => data.password === data.passwordConfirm, {
        error: "Las contraseñas no coinciden",
        path: ["passwordConfirm"],  
    })

export const userLoginSchema = z.object({
    email: z.email("Ingresá un email válido"),
    password: z.string("Ingresá tu contraseña").min(1, "Ingresá tu contraseña"),
}, "Objeto inválido")

export const userRolSchema = z.object({
    rol: z.enum(["user", "admin"], "El rol debe ser user o admin"),
})