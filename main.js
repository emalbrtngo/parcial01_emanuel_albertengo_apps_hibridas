import 'dotenv/config';
import express from 'express';
import charactersRoute from './routes/characters.route.js';
import apiRoute from './api/routes/routes.api.js';
import usersRoute from './api/routes/routesUsers.api.js';   
const app = express();
const port = 3333;

app.use('/', express.static('public')); //archivos estáticos desde la carpeta 'public'
app.use( express.urlencoded({ extended: true })) //para que express entienda datos de formularios
app.use(express.json()); //express entendera json

app.use(apiRoute);
app.use(charactersRoute);
app.use(usersRoute);


app.listen(port, () => {
    console.log(`Servidor escuchando en... http://localhost:${port}`);
});