export function createPage(title, content) {

    const active = 'active'
    const currentPage = 'aria-current="page"'

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
        <title>${title}</title>
    </head>
    <body class="d-flex flex-column min-vh-100">
    <div class="container">
        <header class="mb-4">

            <nav class="navbar navbar-expand-lg bg-body-secondary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">HPWorld</a>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link ${title === 'Home' ? active : ''}" ${title === 'Home' ? currentPage : ''} href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${title === 'Personajes' ? active : ''}" ${title === 'Personajes' ? currentPage : ''} href="/personajes">Personajes</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${title === 'Nuevo Personaje' ? active : ''}" ${title === 'Nuevo Personaje' ? currentPage : ''} href="/personajes/nuevo">Nuevo Personaje</a>
                            </li>
                        </ul>

                        <form class="d-flex mb-3" action="/personajes" method="GET">
                            <input class="form-control me-2" type="text" name="title"
                                placeholder="Buscar por nombre..." />
                            <button class="btn btn-outline-success" type="submit">Buscar</button>
                        </form>
                    </div>
                </div>
            </nav>

        </header>
    </div>
        <div class="container">
            ${content}
        </div>
        <footer class="footer mt-auto py-3 bg-light">
            <div class="container my-3 text-center">
                <span class="text-muted">Nombre: Emanuel Apellido: Albertengo - Materia: Aplicaciones Híbridas</span>
            </div>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    </body>
    </html>
    `;
}

export function createCard(personaje) {
    if (personaje.house === "null") personaje.house = "Sin Casa";
    let card = ""
    card += `<div class="col">
                <div class="card shadow-sm"> 
                <img src="${personaje.image}" class="bd-placeholder-img card-img-top" height="225" role="img" width="100%" alt="Imagen de ${personaje.name}">
                <div class="card-body">
                
                        <p class="card-text">${personaje.name}${personaje.customCharacter ? '<span class="text-secondary small"> (Personaje personalizado)</span>' : ''}</p> 
                        <p class="card-text"> Casa: ${personaje.house}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group"> <a href="/personajes/${personaje._id}" type="button" class="btn btn-sm btn-secondary">Ver mas</a>
                            <a href="/personajes/${personaje._id}/editar" type="button" class="btn btn-sm btn-outline-secondary">Editar</a> </div>
                            <a href="/personajes/${personaje._id}/eliminar" type="button" class="btn btn-sm btn-outline-danger">Eliminar</a>
                        </div>
                    </div>
                </div>
            </div>`
    return card
}

export function createCharacterDetailCard(character) {
    if (character.house === "null") character.house = "Sin Casa";
    return `
    <div class="card shadow-sm m-auto">
        <div class="card-header">
            <h2>${character.name}</h2>
        </div>
        <div class="card-body">
            <p><strong>Nombre:</strong> ${character.name}</p>
            <p><strong>Casa:</strong> ${character.house}</p>
            <p><strong>Especie:</strong> ${character.species}</p>
            <p><strong>Actor:</strong> ${character.actor}</p>
            <p><strong>Fecha de Nacimiento:</strong> ${character.dateOfBirth}</p>
            <p><strong>Año de Nacimiento:</strong> ${character.yearOfBirth}</p>
            <p><strong>Ascendencia:</strong> ${character.ancestry}</p>
        </div>
    </div>
    `;
}




