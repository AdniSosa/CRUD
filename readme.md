# Ejercicio: CRUD de Usuarios - Street Fighter Edition

## Descripción

En este ejercicio, se te pide crear una API simple para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una lista de usuarios. Cada usuario representa un personaje del famoso videojuego Street Fighter, con información como el nombre, la edad y el lugar de procedencia.

## Instrucciones

1. **Instalar Dependencias:**
   - npm install

2. **Endpoints Disponibles:**
   - `GET /usuarios`: Obtiene la lista de todos los usuarios.
   - `POST /usuarios`: Crea un nuevo usuario.
   - `GET /usuarios/:nombre`: Obtiene un usuario por nombre.

Puedes añadir más rutas si las necesitas o piensas que te pueden servir para hacer algo

3. **Realizar Operaciones CRUD:**
   - Utiliza herramientas como Postman o cURL para realizar operaciones CRUD en la API.
   - Ejemplo: Para acceder al usuario Ryu, realiza una solicitud `GET` a `http://localhost:3000/usuarios/Ryu`.

**Añade a tu código**
- Añade estas 2 líneas en `app.js` por encima de todas tus rutas para que no te generen errores de lectura. 

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

```
* express.json():

Este middleware está diseñado para analizar el cuerpo de las solicitudes que contienen datos en formato JSON. Al usar express.json(), Express puede interpretar automáticamente los cuerpos de las solicitudes que tienen un formato JSON y proporcionar el objeto JSON correspondiente en req.body. Esto es útil cuando estás enviando datos JSON en el cuerpo de una solicitud POST o PUT

* express.urlencoded({ extended: true }):

Este middleware se utiliza para analizar el cuerpo de las solicitudes que contienen datos en formato de formulario (application/x-www-form-urlencoded). Al igual que express.json(), express.urlencoded() procesa los datos del cuerpo de la solicitud y los convierte en un objeto que se almacena en req.body. El parámetro extended se refiere a si se utilizará la biblioteca qs (querystring) de Node.js para analizar los datos. Si extended es true, se permite el análisis de objetos y matrices más complejas.

**PISTAS**

- Cuando creamos rutas dinámicas para acceder a cada uno de los usuarios lo hacemos con 'comodines', añadimos con algo parecido a `:nombre`, `:id`, ... esos cómodines en las URL se cambiaría por el nombre o el id de usuario para poder acceder a él. 
- Con `req.params` accederás al objeto que devuelve el parametro añadido. Si añades el 'comodín' en tu código verás el string   
- Para acceder al nombre de los usuarios puedes usar el método `find()` para encontrar el usuario
- Para poder probar el "post" sin hacer un form que envie datos necesitarás instalar la extensión de visual studio code "REST Client". Si has usado alguna otra como "Thunder Client" o "Postman", podrás usarlas. Veremos en clase como funciona, pero por si eres curioso y no puedes esperar.

## Datos de Ejemplo

A continuación, se proporcionan algunos datos de ejemplo para iniciar la lista de usuarios:

```javascript
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

```

**BONUS** 
Crea dos rutas nuevas para terminar tu CRUD completo
   - `PUT /usuarios/:nombre`: Actualiza la información de un usuario por nombre.
   - `DELETE /usuarios/:nombre`: Elimina un usuario por nombre.
Son similares a "POST". Con "PUT" piensa como usar el método `findIndex()` y con el "DELETE" el método `filter()`.





