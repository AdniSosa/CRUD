// - `GET /usuarios`: Obtiene la lista de todos los usuarios.
// - `POST /usuarios`: Crea un nuevo usuario.
// - `GET /usuarios/:nombre`: Obtiene un usuario por nombre.

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//READ
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h2>Agrega un nuevo usario</h2>
            <form action='/usuarios' method='post'>
                <label for='name'>Nombre: </label>
                <input type='text' name='name' id='name'>
                <label for='edad'>Edad: </label>
                <input type='text' name='edad' id='edad'>
                <label for='lugar'>Lugar de procedencia: </label>
                <input type='text' name='lugar' id='lugar'>
                <button type='submit'>Agregar usuario</button>
            </form>
            <h2>Busca un usuario</h2>
            <form action='/usuarios:nombre' method='get'>
               <label for='nombre'>Nombre: </label>
                <input type='text' name='nombre' id='nombre'>
                <button type='submit'>Ver usuario</button>
            </form>
            <a href='/usuarios'>Ver usuarios</a>
            <a href='/actualizar'>Actualizar usuarios</a>
        </body>
        </html>
        `)
})

app.get('/usuarios', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Lista de usuarios</h1>
            <ul>
                ${usuarios.map(usuario => `<li>ID: ${usuario.id} - Nombre: ${usuario.nombre} - Edad: ${usuario.edad} - Procedencia: ${usuario.lugarProcedencia}<form action='/borrar' method='post'><input type="hidden" name="id" value="${usuario.id} "><button type='submit'>Borrar usuario</button></form></li>`).join('')}
            </ul>
            <a href='/'>Volver a Home</a>
        </body>
        </html>
        `)
})

app.get('/usuarios:nombre', (req, res) => {
    const foundUser = usuarios.find(usuario => usuario.nombre.toLowerCase()=== req.query.nombre);
    //console.log(foundUser);
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Lista de usuarios</h1>
            <ul>
                <li>ID: ${foundUser.id} - Nombre: ${foundUser.nombre} - Edad: ${foundUser.edad} - Lugar de procedencia: ${foundUser.lugarProcedencia}<form action='/borrar' method='post'><input type="hidden" name="id" value="${foundUser.id} "><button type='submit'>Borrar usuario</button></form></li>
            </ul>
            <a href='/'>Volver a Home</a>
        </body>
        </html>
        `)
        //console.log(req.query.nombre)
})


app.get('/actualizar', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Actualización de usuarios</h1>
            <form action='/usuarios/:nombre' method='get'>
                <label for='nameToUpdate'>Nombre: </label>
                <input type='text' name='nameToUpdate' id='nameToUpdate'>
                <button type='submit'>Buscar usuario</button>
            </form>
            <a href='/usuarios'>Ver usuarios</a>
            <a href='/'>Volver a Home</a>
        </body>
        </html>
        `)
})

app.get('/usuarios/:nombre', (req, res) => {
    const foundUser = usuarios.find(usuario => usuario.nombre === req.query.nameToUpdate);
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Actualización de usuarios</h1>
            <form action='/usuarios/:nombre' method='post'>
                <input type="hidden" name="id" value="${foundUser.id} ">
                <label for='nameToUpdate'>Nombre: </label>
                <input type='text' name='nameToUpdate' id='nameToUpdate' value=${foundUser.nombre}>
                <label for='edadUpdate'>Edad: </label>
                <input type='text' name='edadUpdate' id='edadUpdate' value=${foundUser.edad}>
                <label for='lugarUpdate'>Lugar de procedencia: </label>
                <input type='text' name='lugarUpdate' id='lugarUpdate' value=${foundUser.lugarProcedencia}>
                <button type='submit'>Actualizar usuario</button>
            </form>
            <a href='/usuarios'>Ver usuarios</a>
            <a href='/'>Volver a Home</a>
        </body>
        </html>
        `)

})


//CREATE
app.post('/usuarios', (req, res) => {
    const newUser = {
        id: (usuarios[usuarios.length - 1].id) + 1,
        nombre: req.body.name,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugar
    };
    usuarios.push(newUser);
    //console.log(newUser.id)
    res.redirect('/usuarios');
})

//UPDATE
//?No logré hacerlo con app.put
 app.post('/usuarios/:nombre', (req, res) => {
    
    const userUpdate = {
        id: req.body.id,
        nombre: req.body.nameToUpdate,
        edad: req.body.edadUpdate,
        lugarProcedencia: req.body.lugarUpdate
    };

    usuarios[userUpdate.id-1] = userUpdate;
    //console.log(userUpdate.id)
    res.redirect('/usuarios');
}) 

//DELETE
//?No logré hacerlo con app.delete.
app.post('/borrar', (req, res) => {
    const id = parseInt(req.body.id);
    
    usuarios = usuarios.filter(usuario => usuario.id !== id);
    console.log(id)
    res.redirect('/usuarios');
})

app.listen(PORT, () => {
    console.log(`Express escuchando por puerto http://localhost:${PORT}`)
})