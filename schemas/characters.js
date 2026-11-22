import { z } from "zod"

/*
campos
    "_id": "6ab52cd18f636c07a7c0de78",
    "name": "Harry Potter",
    "species": "human",
    "gender": "male",
    "house": "Gryffindor",
    "dateOfBirth": "31-07-1980",
    "yearOfBirth": 1980,
    "ancestry": "half-blood",
    "eyeColour": "green",
    "hairColour": "black",
    "wand": {
        "wood": "holly",
        "core": "phoenix feather",
        "length": 11
    },
    "patronus": "stag",
    "hogwartsStudent": true,
    "hogwartsStaff": false,
    "actor": "Daniel Radcliffe",
    "alive": true,
    "image": "https://picsum.photos/360/225"
*/

export const charactersSchema = z.object({ //priver validación: recibir un json
    _id: z.string().optional(),
    name: z.string("El nombre del mago es obligatorio").min(3, "El nombre del mago debe tener al menos 3 caracteres"),
    species: z.string("La especie del mago es obligatoria").min(3, "La especie del mago debe tener al menos 3 caracteres"),
    gender: z.enum(["male", "female"], "El género es obligatorio"),
    house: z.enum(["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"], "La casa es obligatoria").nullable(),
    dateOfBirth: z.string("La fecha de nacimiento del mago es obligatoria").min(5, "La fecha de nacimiento debe tener el formato DD-MM O DD/MM"),
    yearOfBirth: z.number("El año de nacimiento del mago es obligatorio").min(1000, "El año de nacimiento debe ser válido").positive("El año de nacimiento debe ser positivo"),
    ancestry: z.string("La ascendencia del mago es obligatoria").min(3, "La ascendencia del mago debe tener al menos 3 caracteres"),
    eyeColour: z.string("El color de ojos del mago es obligatorio").min(3, "El color de ojos del mago debe tener al menos 3 caracteres"),
    hairColour: z.string("El color de cabello del mago es obligatorio").min(3, "El color de cabello del mago debe tener al menos 3 caracteres"),
    wand: z.object({
        wood: z.string("La madera de la varita es obligatoria").min(3, "La madera de la varita debe tener al menos 3 caracteres"),
        core: z.string("El núcleo de la varita es obligatorio").min(3, "El núcleo de la varita debe tener al menos 3 caracteres"),
        length: z.number("La longitud de la varita es obligatoria").min(1, "La longitud de la varita debe ser mayor a 0")
    }),
    patronus: z.string("El patronus del mago es obligatorio").min(3, "El patronus del mago debe tener al menos 3 caracteres"),
    hogwartsStudent: z.boolean("Indicar si el mago es estudiante de Hogwarts es obligatorio"),
    hogwartsStaff: z.boolean("Indicar si el mago es personal de Hogwarts es obligatorio"),
    actor: z.string().min(3, "El actor debe tener al menos 3 caracteres").or(z.literal("")).optional(),
    alive: z.boolean("Indicar si el mago está vivo es obligatorio"),
    image: z.url("La URL de la imagen no es válida").or(z.literal("")).optional()
    

}, 'Objeto inválido')

export const charactersPartialSchema = charactersSchema.partial()

export default charactersSchema;