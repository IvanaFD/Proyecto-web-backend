# Adopt Tracker API

API REST para la gestión de mascotas en adopción. Permite registrar, consultar, actualizar y eliminar mascotas, con soporte para búsqueda, paginación, ordenamiento y subida de imágenes.

## Tecnologías

- **Node.js** + **Express**
- **PostgreSQL** (Supabase)
- **Cloudinary** (almacenamiento de imágenes)
- **Swagger UI** (documentación interactiva)

## Funcionalidades

- CRUD completo de mascotas
- Búsqueda por nombre o especie (`?q=`)
- Filtro por especie exacta (`?species=`)
- Paginación (`?page=` `?limit=`)
- Ordenamiento (`?sort=` `?order=`)
- Subida de imágenes con validación de formato y tamaño (máx. 1MB)
- Validación de especies permitidas
- Documentación interactiva con Swagger UI

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/pets` | Obtener todas las mascotas |
| GET | `/pets/:id` | Obtener una mascota por ID |
| GET | `/pets/species` | Obtener especies permitidas |
| POST | `/pets` | Crear una mascota |
| PUT | `/pets/:id` | Actualizar una mascota |
| DELETE | `/pets/:id` | Eliminar una mascota |
| GET | `/health` | Estado del servidor |

### Query params de `GET /pets`

| Param | Descripción | Default |
|-------|-------------|---------|
| `q` | Buscar por nombre o especie | — |
| `species` | Filtrar por especie (`Perro`, `Gato`, `Conejo`, `Ave`, `Reptil`, `Otro`) | — |
| `sort` | Campo de ordenamiento (`name`, `age`, `status`) | `name` |
| `order` | Dirección (`asc` / `desc`) | `desc` |
| `page` | Número de página | `1` |
| `limit` | Resultados por página | `10` |

## Correr localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/IvanaFD/Proyecto-web-backend.git
cd Proyecto-web-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia `.env.example` a `.env` y completa los valores:

```bash
cp .env.example .env
```

### 4. Crear la tabla

```bash
node scripts/migrate.js
```

### 5. Cargar datos de prueba

```bash
node scripts/seed.js
```

### 6. Iniciar el servidor

```bash
npm run dev
```

El servidor corre en `http://localhost:3000`.

## Deploy

API desplegada en Vercel:
```
https://adopt-tracker-api.vercel.app
```

Documentación interactiva:

```
https://adopt-tracker-api.vercel.app/api-docs
```

## Repositorio cliente



```bash
https://github.com/IvanaFD/Proyecto-web-cliente
```