import * as until from '../page/until.js';

export function createCharacterPage(title, cards, totalPages) {
    // console.log(cards)
    // console.log(totalPages);


    return until.createPage(title,
        `
    <div class="d-flex justify-content-between flex-column flex-md-row">
    <div class="btn-group mb-3" role="group" aria-label="Filtros por casas">
        <a href="/personajes?house=Gryffindor" class="btn btn-primary">Gryffindor</a>
        <a href="/personajes?house=Slytherin" class="btn btn-primary">Slytherin</a>
        <a href="/personajes?house=Hufflepuff" class="btn btn-primary">Hufflepuff</a>
        <a href="/personajes?house=Ravenclaw" class="btn btn-primary">Ravenclaw</a>
        <a href="/personajes?house=null" class="btn btn-primary">Sin Casa</a>
    </div>
    <div><a href="/personajes" class="btn btn-primary">Ver todos</a></div>
    <div class="btn-group mb-3" role="group" aria-label="Filtros por generos"> 
        <a href="/personajes?gender=male" class="btn btn-primary">Masculino</a>
        <a href="/personajes?gender=female" class="btn btn-primary">Femenino</a>
        <a href="/personajes?gender=null" class="btn btn-primary">Desconocido</a>
    </div>
    </div>


    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        ${cards}
    </div>


    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center py-3">
        
            ${[...Array(totalPages).keys()].map(page => `<li class="page-item"><a class="page-link" href="/personajes?page=${page + 1}">${page + 1}</a></li>`).join('')}
        
        </ul>
    </nav>

    `);
}

export function createCharacterDetailPage(title, character) {
    return until.createPage(title,

        `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"> 
            ${until.createCharacterDetailCard(character)} 
        </div>`);
}

export function createNewCharacterFormPage(title) {
    return until.createPage(title,
        `
        <div class="container-sm">
            <form class="shadow-sm p-4 m-auto" action="/personajes/nuevo" method="POST">
                    <h1 class="mb-4">Crear Personaje</h1>
                <h2 class="text-primary border-bottom pb-2 mb-3 h5">Información General</h2>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <label for="name" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                    </div>

                    <div class="col-md-6">
                        <label for="actor" class="form-label">Actor</label>
                        <input type="text" class="form-control" id="actor" name="actor">
                    </div>

                    <div class="col-md-4">
                        <label for="house" class="form-label">Casa</label>
                        <select class="form-select" id="house" name="house">
                            <option value="" selected disabled>Seleccionar...</option>
                            <option value="Gryffindor">Gryffindor</option>
                            <option value="Slytherin">Slytherin</option>
                            <option value="Ravenclaw">Ravenclaw</option>
                            <option value="Hufflepuff">Hufflepuff</option>
                            <option value="null">Sin Casa</option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label for="species" class="form-label">Especie</label>
                        <input type="text" class="form-control" id="species" name="species">
                    </div>

                    <div class="col-md-4">
                        <label for="gender" class="form-label">Género</label>
                        <select class="form-select" id="gender" name="gender">
                            <option value="" selected disabled>Seleccionar...</option>
                            <option value="male">Masculino</option>
                            <option value="female">Femenino</option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label for="dateOfBirth" class="form-label">Fecha de Nacimiento</label>
                        <input type="text" class="form-control" id="dateOfBirth" name="dateOfBirth">
                    </div>

                    <div class="col-md-4">
                        <label for="yearOfBirth" class="form-label">Año de Nacimiento</label>
                        <input type="number" class="form-control" id="yearOfBirth" name="yearOfBirth">
                    </div>

                    <div class="col-md-4">
                        <label for="ancestry" class="form-label">Ascendencia</label>
                        <input type="text" class="form-control" id="ancestry" name="ancestry">
                    </div>
                </div>

                <h2 class="text-primary border-bottom pb-2 mb-3 h5">Rasgos Físicos</h2>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <label for="eyeColour" class="form-label">Color de Ojos</label>
                        <input type="text" class="form-control" id="eyeColour" name="eyeColour">
                    </div>

                    <div class="col-md-6">
                        <label for="hairColour" class="form-label">Color de Cabello</label>
                        <input type="text" class="form-control" id="hairColour" name="hairColour">
                    </div>
                </div>

                <h2 class="text-primary border-bottom pb-2 mb-3 h5">Varita y Magia</h2>
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <label for="wandWood" class="form-label">Madera de la Varita</label>
                        <input type="text" class="form-control" id="wandWood" name="wand.wood">
                    </div>

                    <div class="col-md-4">
                        <label for="wandCore" class="form-label">Corazón de la Varita</label>
                        <input type="text" class="form-control" id="wandCore" name="wand.core">
                    </div>

                    <div class="col-md-4">
                        <label for="wandLength" class="form-label">Medida de la Varita</label>
                        <input type="text" class="form-control" id="wandLength" name="wand.length">
                    </div>

                    <div class="col-12">
                        <label for="patronus" class="form-label">Patronus</label>
                        <input type="text" class="form-control" id="patronus" name="patronus">
                    </div>
                </div>

                <h2 class="text-primary border-bottom pb-2 mb-3 h5">Estado del personaje</h2>
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <label class="form-label d-block">Estudiante de Hogwarts</label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="studentYes" name="hogwartsStudent" value="true">
                            <label class="form-check-label" for="studentYes">Sí</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="studentNo" name="hogwartsStudent" value="false">
                            <label class="form-check-label" for="studentNo">No</label>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <label class="form-label d-block">Personal de Hogwarts</label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="staffYes" name="hogwartsStaff" value="true">
                            <label class="form-check-label" for="staffYes">Sí</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="staffNo" name="hogwartsStaff" value="false">
                            <label class="form-check-label" for="staffNo">No</label>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <label class="form-label d-block">Vivo</label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="aliveYes" name="alive" value="true">
                            <label class="form-check-label" for="aliveYes">Sí</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="aliveNo" name="alive" value="false">
                            <label class="form-check-label" for="aliveNo">No</label>
                        </div>
                    </div>

                    <div class="col-12">
                        <label for="image" class="form-label">URL de la Imagen</label>
                        <input type="url" class="form-control" id="image" name="image">
                    </div>
                </div>

                <div class="d-grid gap-2 d-md-flex justify-md-content-end">
                    <button type="submit" class="btn btn-primary btn-lg">Crear Personaje</button>
                </div>
            </form>
        </div>`);
}

export function createEditCharacterFormPage(title, character) {
    return until.createPage(title,
        `
        <div class="container-sm">
            <form class="shadow-sm p-4 m-auto" action="/personajes/${character._id}/editar" method="POST">
                    <h1 class="mb-4">Editar Personaje</h1>
                <h2 class="text-primary border-bottom pb-2 mb-3 h5">Información General</h2>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <label for="name" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="name" name="name" value="${character.name}" required>
                    </div>

                    <div class="col-md-6">
                        <label for="actor" class="form-label">Actor</label>
                        <input type="text" class="form-control" id="actor" name="actor" value="${character.actor}">
                    </div>

                    <div class="col-md-4">
                        <label for="house" class="form-label">Casa</label>
                        <select class="form-select" id="house" name="house">
                            <option value="" disabled>Seleccionar...</option>
                            <option value="Gryffindor" ${character.house === 'Gryffindor' ? 'selected' : ''}>Gryffindor</option>
                            <option value="Slytherin" ${character.house === 'Slytherin' ? 'selected' : ''}>Slytherin</option>
                            <option value="Ravenclaw" ${character.house === 'Ravenclaw' ? 'selected' : ''}>Ravenclaw</option>
                            <option value="Hufflepuff" ${character.house === 'Hufflepuff' ? 'selected' : ''}>Hufflepuff</option>
                            <option value="null" ${character.house === "null" ? 'selected' : ''}>Sin Casa</option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label for="species" class="form-label">Especie</label>
                        <input type="text" class="form-control" id="species" name="species" value="${character.species}">
                    </div>

                    <div class="col-md-4">
                        <label for="gender" class="form-label">Género</label>
                        <select class="form-select" id="gender" name="gender">
                            <option value="" disabled>Seleccionar...</option>
                            <option value="male" ${character.gender === 'male' ? 'selected' : ''}>Masculino</option>
                            <option value="female" ${character.gender === 'female' ? 'selected' : ''}>Femenino</option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label for="dateOfBirth" class="form-label">Fecha de Nacimiento</label>
                        <input type="text" class="form-control" id="dateOfBirth" name="dateOfBirth" value="${character.dateOfBirth}">
                    </div>

                    <div class="col-md-4">
                        <label for="yearOfBirth" class="form-label">Año de Nacimiento</label>
                        <input type="number" class="form-control" id="yearOfBirth" name="yearOfBirth" value="${character.yearOfBirth}">
                    </div>

                    <div class="col-md-4">
                        <label for="ancestry" class="form-label">Ascendencia</label>
                        <input type="text" class="form-control" id="ancestry" name="ancestry" value="${character.ancestry}">
                    </div>
                </div>

                <h2 class="text-primary border-bottom pb-2 mb-3 h5">Rasgos Físicos</h2>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <label for="eyeColour" class="form-label">Color de Ojos</label>
                        <input type="text" class="form-control" id="eyeColour" name="eyeColour" value="${character.eyeColour}">
                    </div>

                    <div class="col-md-6">
                        <label for="hairColour" class="form-label">Color de Cabello</label>
                        <input type="text" class="form-control" id="hairColour" name="hairColour" value="${character.hairColour}       ">
                    </div>
                </div>

                <h2 class="text-primary border-bottom pb-2 mb-3 h5">Varita y Magia</h2>
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <label for="wandWood" class="form-label">Madera de la Varita</label>
                        <input type="text" class="form-control" id="wandWood" name="wand.wood" value="${character.wand?.wood}">
                    </div>
        
                    <div class="col-md-4">
                        <label for="wandCore" class="form-label">Corazón de la Varita</label>
                        <input type="text" class="form-control" id="wandCore" name="wand.core" value="${character.wand?.core}">
                    </div>

                    <div class="col-md-4">
                        <label for="wandLength" class="form-label">Medida de la Varita</label>
                        <input type="text" class="form-control" id="wandLength" name="wand.length" value="${character.wand?.length}">
                    </div>

                    <div class="col-12">
                        <label for="patronus" class="form-label">Patronus</label>
                        <input type="text" class="form-control" id="patronus" name="patronus" value="${character.patronus}">
                    </div>
                </div>

                <h2 class="text-primary border-bottom pb-2 mb-3 h5">Estado del personaje</h2>
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <label class="form-label d-block">Estudiante de Hogwarts</label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="studentYes" name="hogwartsStudent" value="true" ${character.hogwartsStudent === true ? 'checked' : ''}>
                            <label class="form-check-label" for="studentYes">Sí</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="studentNo" name="hogwartsStudent" value="false" ${character.hogwartsStudent === false ? 'checked' : ''}>
                            <label class="form-check-label" for="studentNo">No</label>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <label class="form-label d-block">Personal de Hogwarts</label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="staffYes" name="hogwartsStaff" value="true" ${character.hogwartsStaff === true ? 'checked' : ''}>
                            <label class="form-check-label" for="staffYes">Sí</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="staffNo" name="hogwartsStaff" value="false" ${character.hogwartsStaff === false ? 'checked' : ''}>
                            <label class="form-check-label" for="staffNo">No</label>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <label class="form-label d-block">Vivo</label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="aliveYes" name="alive" value="true" ${character.alive === true ? 'checked' : ''}>
                            <label class="form-check-label" for="aliveYes">Sí</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="aliveNo" name="alive" value="false" ${character.alive === false ? 'checked' : ''}>
                            <label class="form-check-label" for="aliveNo">No</label>
                        </div>
                    </div>

                    <div class="col-12">
                        <label for="image" class="form-label">URL de la Imagen</label>
                        <input type="url" class="form-control" id="image" name="image" value="${character.image}">
                    </div>
                </div>

                <div class="d-grid gap-2 d-md-flex justify-md-content-end">
                    <button type="submit" class="btn btn-primary btn-lg">Guardar cambios</button>
                </div>
            </form>
        </div>`
)}

export function createConfirmDeleteCharacterPage(title, character){
    return until.createPage(title, `
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-5">
        <div class="card shadow-sm m-auto p-3">
            <h1>${title}</h1>
            <p>¿Estás seguro de que deseas eliminar al personaje <strong>${character.name}</strong>?</p>
            <form method="POST" action="/personajes/${character._id}/eliminar" class="d-flex gap-2 justify-content-end">
                <button type="submit" class="btn btn-danger">Eliminar</button>
                <a href="/personajes" class="btn btn-secondary">Cancelar</a>
            </form>
        </div>
        </div>

    `);
}

export function createErrorPage(title, message) {
    return until.createPage(title, `
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-5">
        <div class="card shadow-sm m-auto p-3">
            <h1>${title}</h1>
            <p>${message}</p>
            <a href="/personajes" class="btn btn-secondary">Volver a Personajes</a>
        </div>
        </div>
    `);
}



// "name": "Harry Potter",
//         "species": "human",
//         "gender": "male",
//         "house": "Gryffindor",
//         "dateOfBirth": "31-07-1980",
//         "yearOfBirth": 1980,
//         "ancestry": "half-blood",
//         "eyeColour": "green",
//         "hairColour": "black",
//         "wand": "{'wood': 'holly', 'core': 'phoenix feather', 'length': 11}",
//         "patronus": "stag",
//         "hogwartsStudent": "True",
//         "hogwartsStaff": "False",
//         "actor": "Daniel Radcliffe",
//         "alive": "True",
//         "image": "http://hp-api.herokuapp.com/images/harry.jpg"