# CRUD API

Esta es una API CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar elementos (`items`) y planetas (`planets`). La API está construida con Node.js, Express y MongoDB, utilizando Mongoose como ODM.

## Requisitos

- Node.js (v14 o superior)
- MongoDB

## Instalación

1. **Clonar el repositorio:**



   ```bash
   git clone https://github.com/jamujica6/CRUD.git
   cd CRUD
   ```

2. **Instalar dependencias:**

   En el directorio raíz ejecuta:
    
   ```bash
   npm install  
   ```     
          


3. **Configurar variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto con el siguiente contentenido:

   ```javascript
   MONGODB_URI=<TU_URI_DE_MONGO>
   PORT=3000
   ```   
   
   Reemplazar `<TU_URI_DE_MONGO>` con la URI de conexión de tu base de datos MongoDB.



# Ejecución

   ## En Local

   Para ejecutar el servidor localmente, asegúrate de que MongoDB este en funcionamiento y ejecuta:

   ```bash #
     npm start
   ```
   El servidor estará disponible en `http://localhost:3000`

   ## En MongoDB Atlas

   Si estás utilizando MongoDB Atlas, asegúrate de que tu URI de MongoDB en el archivo `.env` esté correctamente configurada con las credenciales y el nombre de la base de datos.
 
# Rutas Disponibles

   ## Items
   -POST /api/items: Crear un nuevo ítem

   -GET /api/items: Obtener todos los ítems

   -GET /api/items/: Obtener un ítem por su ID

   -PUT /api/items/: Actualizar un ítem por su ID

   -DELETE /api/items/: Eliminar un ítem por su ID
   
   ## Planets
   -POST /api/planets: Crear un nuevo planeta

   -GET /api/planets: Obtener todos los planetas

   -GET /api/planets/: Obtener un planeta por su ID

   -PUT /api/planets/: Actualizar un planeta por su ID

   -DELETE /api/planets/: Eliminar un planeta por su ID

# Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm test
```
Las pruebas están ubicadas en la carpeta test y utilizan mocha y supertest para realizar las solicitudes HTTP y verificar las respuestas.

Contribuciones
Las contribuciones son bienvenidas. Por favor, realiza un fork del proyecto y abre un pull request con tus cambios.

# Licencia
Este proyecto está bajo la MIT License.

# Notas adicionales

```yaml
Se adjunta dentro de la carpeta `./server/models/samples` muestras de datos en formato json de "items" y "planets" de referenca.

Para pruebas adicionales se puede modificar la carpeta `test`.
``````