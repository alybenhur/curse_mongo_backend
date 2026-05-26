export const STAGES_SEED = [
  {
    order: 1,
    title: 'Fundamentos de NoSQL',
    description: 'Comprende qué son las bases de datos NoSQL, sus tipos, ventajas y cuándo elegir MongoDB sobre una base de datos relacional.',
    icon: '🌱',
    topics: ['nosql', 'conceptos', 'comparativa'],
    xpReward: 80,
    prerequisiteOrder: null,
  },
  {
    order: 2,
    title: 'Instalación y primeros pasos',
    description: 'Configura tu entorno de trabajo: MongoDB local, MongoDB Compass, Atlas y Mongo Shell. Conecta y explora tu primera base de datos.',
    icon: '🛠️',
    topics: ['instalacion', 'compass', 'mongosh', 'atlas'],
    xpReward: 80,
    prerequisiteOrder: 1,
  },
  {
    order: 3,
    title: 'Documentos, Colecciones y CRUD',
    description: 'Aprende la estructura de documentos BSON, cómo organizar colecciones y domina las operaciones Create, Read, Update y Delete.',
    icon: '📄',
    topics: ['crud', 'documentos', 'colecciones', 'bson'],
    xpReward: 100,
    prerequisiteOrder: 2,
  },
  {
    order: 4,
    title: 'Consultas avanzadas',
    description: 'Domina los operadores de consulta, filtros, proyecciones, ordenamiento y paginación para recuperar exactamente los datos que necesitas.',
    icon: '🔍',
    topics: ['queries', 'operadores', 'filtros', 'proyecciones'],
    xpReward: 120,
    prerequisiteOrder: 3,
  },
  {
    order: 5,
    title: 'Índices en MongoDB',
    description: 'Comprende cómo funcionan los índices, sus tipos (simple, compuesto, texto, geoespacial) y cómo analizar el rendimiento con explain().',
    icon: '⚡',
    topics: ['indexes', 'rendimiento', 'explain'],
    xpReward: 120,
    prerequisiteOrder: 4,
  },
  {
    order: 6,
    title: 'Aggregation Pipeline',
    description: 'Aprende a transformar y analizar datos con el pipeline de agregación: $match, $group, $project, $lookup, $unwind y más.',
    icon: '🔧',
    topics: ['aggregation', 'pipeline', 'stages'],
    xpReward: 150,
    prerequisiteOrder: 5,
  },
  {
    order: 7,
    title: 'Mongoose y esquemas',
    description: 'Integra MongoDB con Node.js usando Mongoose: define esquemas robustos, validaciones, middlewares hooks y virtuals.',
    icon: '🏗️',
    topics: ['mongoose', 'schemas', 'validaciones', 'hooks'],
    xpReward: 130,
    prerequisiteOrder: 6,
  },
  {
    order: 8,
    title: 'Relaciones entre documentos',
    description: 'Comprende cuándo usar embedding vs referencing, cómo implementar relaciones con $lookup y populate, y las implicaciones de cada enfoque.',
    icon: '🔗',
    topics: ['relaciones', 'embedding', 'referencing', 'populate'],
    xpReward: 130,
    prerequisiteOrder: 7,
  },
  {
    order: 9,
    title: 'Modelado NoSQL',
    description: 'Metodología completa para diseñar esquemas NoSQL desde requisitos: patrones de diseño, antipatrones, casos reales y comparativa de estrategias.',
    icon: '🎨',
    topics: ['modelado', 'patrones', 'antipatrones', 'diseño'],
    xpReward: 180,
    prerequisiteOrder: 8,
  },
  {
    order: 10,
    title: 'Transacciones y consistencia',
    description: 'Maneja operaciones multi-documento con transacciones ACID, sessions, write concern y read concern para garantizar consistencia de datos.',
    icon: '🔒',
    topics: ['transacciones', 'sessions', 'write-concern', 'acid'],
    xpReward: 150,
    prerequisiteOrder: 9,
  },
  {
    order: 11,
    title: 'Seguridad en MongoDB',
    description: 'Configura autenticación, autorización, roles, cifrado y mejores prácticas de seguridad para despliegues en producción.',
    icon: '🛡️',
    topics: ['seguridad', 'roles', 'autenticacion', 'cifrado'],
    xpReward: 130,
    prerequisiteOrder: 10,
  },
  {
    order: 12,
    title: 'Replicación y Sharding',
    description: 'Introduce los conceptos de alta disponibilidad con replica sets y escalado horizontal con sharding.',
    icon: '🌐',
    topics: ['replicacion', 'sharding', 'alta-disponibilidad'],
    xpReward: 150,
    prerequisiteOrder: 11,
  },
  {
    order: 13,
    title: 'Buenas prácticas y proyecto integrador',
    description: 'Consolida todo lo aprendido con patrones avanzados, optimización y un proyecto integrador completo que aplica todos los conceptos del curso.',
    icon: '🏆',
    topics: ['buenas-practicas', 'optimizacion', 'proyecto'],
    xpReward: 200,
    prerequisiteOrder: 12,
  },
];

export const LESSONS_SEED = [
  // ─── ETAPA 1: Fundamentos NoSQL ───────────────────────────────────────────
  {
    stageOrder: 1, order: 1, type: 'reading', xpReward: 15, topics: ['nosql', 'conceptos'],
    title: '¿Qué es NoSQL?',
    content: `## ¿Qué es NoSQL?

**NoSQL** (Not Only SQL) agrupa bases de datos que no siguen el modelo relacional tradicional. Surgieron para resolver los desafíos de escala, flexibilidad y velocidad que las bases de datos relacionales no podían satisfacer en la era del Big Data.

### Características principales
- **Sin esquema fijo**: los documentos no necesitan tener la misma estructura.
- **Escalado horizontal**: agregar más servidores en lugar de uno más potente.
- **Alto rendimiento**: optimizadas para patrones de acceso específicos.
- **Flexibilidad**: evolucionan con los datos sin migraciones costosas.

### Tipos de bases de datos NoSQL

| Tipo | Ejemplos | Casos de uso |
|------|---------|--------------|
| Documentos | MongoDB, CouchDB | Catálogos, perfiles, CMS |
| Clave-valor | Redis, DynamoDB | Sesiones, caché, carritos |
| Columnas anchas | Cassandra, HBase | Series de tiempo, analítica |
| Grafos | Neo4j, ArangoDB | Redes sociales, recomendaciones |

### ¿Cuándo elegir NoSQL sobre SQL?
- Cuando los datos no tienen estructura fija o cambia frecuentemente.
- Cuando necesitas escalar a millones de escrituras por segundo.
- Cuando la velocidad de desarrollo importa más que la consistencia estricta.
- Cuando los datos son jerárquicos o en forma de árbol.`,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 1, order: 2, type: 'reading', xpReward: 15, topics: ['nosql', 'comparativa'],
    title: 'SQL vs NoSQL: ¿cuándo usar cada uno?',
    content: `## SQL vs NoSQL

No existe un ganador absoluto. La elección depende del problema que resuelves.

### SQL (Relacional)
✅ Transacciones ACID críticas (bancos, contabilidad)
✅ Datos altamente estructurados y estables
✅ Consultas complejas con múltiples JOINs
✅ Integridad referencial estricta

### NoSQL (MongoDB)
✅ Datos semiestructurados o variables
✅ Escala masiva de lectura/escritura
✅ Iteración rápida en desarrollo
✅ Datos que "viajan juntos" y se consultan juntos

### El principio clave de MongoDB
> **"Guarda junto lo que se consulta junto."**

Si en tu aplicación siempre necesitas el usuario con su dirección, guárdalos en el mismo documento en lugar de hacer un JOIN.

### Teorema CAP
Las bases de datos distribuidas no pueden garantizar simultáneamente:
- **C**onsistencia
- **D**isponibilidad (Availability)
- tolerancia a **P**articiones de red

MongoDB prioriza **CP** por defecto (consistencia + tolerancia a particiones).`,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 1, order: 3, type: 'example', xpReward: 20, topics: ['nosql', 'conceptos'],
    title: 'Comparando estructuras: tabla vs documento',
    content: `## Tabla SQL vs Documento MongoDB

Veamos cómo se representa la misma información en cada paradigma.`,
    codeExample: `// SQL: se necesitan 3 tablas y 2 JOINs
// TABLE users: id, name, email
// TABLE addresses: id, user_id, street, city
// TABLE orders: id, user_id, total, date

SELECT u.name, a.city, o.total
FROM users u
JOIN addresses a ON a.user_id = u.id
JOIN orders o ON o.user_id = u.id
WHERE u.id = 1;

// ─────────────────────────────────────────────
// MongoDB: todo en un documento, una sola consulta
{
  "_id": ObjectId("..."),
  "name": "Ana García",
  "email": "ana@ejemplo.com",
  "address": {
    "street": "Calle 45 #12-34",
    "city": "Bogotá"
  },
  "orders": [
    { "total": 150000, "date": ISODate("2026-01-15") },
    { "total": 89000,  "date": ISODate("2026-03-20") }
  ]
}

// Recuperar todo en UNA consulta
db.users.findOne({ "_id": ObjectId("...") })`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 1, order: 4, type: 'exercise', xpReward: 25, topics: ['nosql', 'conceptos'],
    title: 'Ejercicio: identifica el tipo de BD',
    content: `## Ejercicio práctico

Para cada caso de uso, escribe en el playground cuál tipo de base de datos NoSQL usarías y por qué. Luego verifica con la solución.`,
    codeExample: null,
    exerciseInstructions: `Escribe un comentario JSON con tu respuesta para cada caso:

1. Una red social que necesita encontrar "amigos de amigos"
2. Un sistema de caché de sesiones web con expiración automática
3. Un catálogo de productos e-commerce donde cada producto tiene atributos distintos
4. Métricas de sensores IoT con millones de escrituras por hora

Formato de respuesta:
{
  "caso1": { "tipo": "...", "razon": "..." },
  "caso2": { "tipo": "...", "razon": "..." },
  ...
}`,
    exerciseSolution: `{
  "caso1": {
    "tipo": "Grafos (Neo4j)",
    "razon": "Las relaciones entre nodos son el dato principal. Recorrer 'amigos de amigos' en grafos es O(1) por salto."
  },
  "caso2": {
    "tipo": "Clave-valor (Redis)",
    "razon": "Acceso ultra-rápido por clave única, soporte nativo de TTL para expiración automática."
  },
  "caso3": {
    "tipo": "Documentos (MongoDB)",
    "razon": "Esquema flexible: cada documento puede tener atributos distintos sin alterar la colección."
  },
  "caso4": {
    "tipo": "Columnas anchas (Cassandra)",
    "razon": "Optimizada para escrituras masivas distribuidas y consultas por rango de tiempo."
  }
}`,
  },

  // ─── ETAPA 2: Instalación ─────────────────────────────────────────────────
  {
    stageOrder: 2, order: 1, type: 'reading', xpReward: 15, topics: ['instalacion', 'mongosh'],
    title: 'El ecosistema MongoDB',
    content: `## El ecosistema MongoDB

MongoDB no es solo la base de datos. Tiene un conjunto de herramientas que usarás en el día a día.

### Herramientas principales

| Herramienta | Uso |
|-------------|-----|
| **mongod** | El servidor de base de datos (daemon) |
| **mongosh** | Shell interactivo para ejecutar comandos |
| **MongoDB Compass** | GUI visual para explorar datos |
| **MongoDB Atlas** | Servicio en la nube (DBaaS) |
| **Mongoose** | ODM para Node.js |

### Estructura de una URL de conexión
\`\`\`
mongodb://usuario:contraseña@host:puerto/basededatos
mongodb://localhost:27017/mi_app
mongodb+srv://user:pass@cluster.mongodb.net/mi_app
\`\`\`

### Comandos básicos de mongosh
\`\`\`javascript
show dbs          // listar bases de datos
use mi_app        // crear/cambiar a base de datos
show collections  // listar colecciones
db.stats()        // estadísticas de la BD actual
\`\`\``,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 2, order: 2, type: 'example', xpReward: 20, topics: ['mongosh', 'instalacion'],
    title: 'Primeros comandos en mongosh',
    content: `## Explorando MongoDB con mongosh

Ejecuta estos comandos en el playground para familiarizarte con el shell.`,
    codeExample: `// 1. Ver todas las bases de datos
show dbs

// 2. Cambiar a (o crear) la BD "curso_mongo"
use curso_mongo

// 3. Ver la BD actual
db.getName()

// 4. Insertar tu primer documento
db.prueba.insertOne({ mensaje: "¡Hola MongoDB!", fecha: new Date() })

// 5. Leer el documento
db.prueba.find()

// 6. Ver estadísticas
db.stats()

// 7. Listar colecciones
show collections

// 8. Eliminar colección de prueba
db.prueba.drop()`,
    exerciseInstructions: null, exerciseSolution: null,
  },

  // ─── ETAPA 3: CRUD ────────────────────────────────────────────────────────
  {
    stageOrder: 3, order: 1, type: 'reading', xpReward: 15, topics: ['crud', 'documentos', 'bson'],
    title: 'Documentos y BSON',
    content: `## Documentos MongoDB y BSON

MongoDB almacena datos como documentos en formato **BSON** (Binary JSON), una extensión de JSON que agrega tipos de datos adicionales.

### Tipos de datos BSON principales

| Tipo | Ejemplo | Descripción |
|------|---------|-------------|
| String | \`"hola"\` | Texto UTF-8 |
| Number | \`42\`, \`3.14\` | Int32, Int64, Double |
| Boolean | \`true\` / \`false\` | |
| Date | \`ISODate("2026-01-15")\` | Fecha y hora UTC |
| ObjectId | \`ObjectId("...")\` | ID único de 12 bytes |
| Array | \`[1, 2, 3]\` | Lista de valores |
| Object | \`{ llave: valor }\` | Documento embebido |
| Null | \`null\` | Valor nulo |

### El campo _id
Cada documento **debe** tener un campo \`_id\` único. Si no lo proporcionas, MongoDB genera un \`ObjectId\` automáticamente.

\`\`\`javascript
// ObjectId contiene: timestamp(4) + machineId(5) + pid(2) + counter(3)
ObjectId("6647a1f2c3d4e5f678901234")
//         ^^^^^^^^ 4 bytes = timestamp Unix
\`\`\`

### Límites importantes
- Tamaño máximo de documento: **16 MB**
- Nombre de campo: no puede empezar con \`$\` ni contener \`.\``,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 3, order: 2, type: 'example', xpReward: 20, topics: ['crud'],
    title: 'insertOne e insertMany',
    content: `## Operaciones de inserción

Aprende a insertar uno o múltiples documentos.`,
    codeExample: `use tienda

// insertOne: insertar un documento
db.productos.insertOne({
  nombre: "Teclado mecánico",
  precio: 280000,
  stock: 15,
  categorias: ["periféricos", "gaming"],
  especificaciones: {
    switches: "Cherry MX Red",
    layout: "TKL",
    iluminacion: true
  },
  creadoEn: new Date()
})

// insertMany: insertar múltiples documentos
db.productos.insertMany([
  {
    nombre: "Mouse inalámbrico",
    precio: 95000,
    stock: 30,
    categorias: ["periféricos"],
    especificaciones: { dpi: 3200, botones: 6 }
  },
  {
    nombre: "Monitor 27\"",
    precio: 1200000,
    stock: 8,
    categorias: ["pantallas"],
    especificaciones: { resolucion: "2560x1440", hz: 165 }
  }
])

// Verificar inserción
db.productos.find().pretty()`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 3, order: 3, type: 'example', xpReward: 20, topics: ['crud'],
    title: 'find, findOne y filtros básicos',
    content: `## Lectura de documentos`,
    codeExample: `use tienda

// findOne: primer documento que coincide
db.productos.findOne({ nombre: "Mouse inalámbrico" })

// find: todos los documentos que coinciden
db.productos.find({ "especificaciones.iluminacion": true })

// Comparadores básicos
db.productos.find({ precio: { $lt: 300000 } })      // precio < 300000
db.productos.find({ precio: { $gte: 100000 } })     // precio >= 100000
db.productos.find({ stock: { $gt: 10, $lt: 20 } }) // 10 < stock < 20

// $in: valor dentro de un array
db.productos.find({ categorias: { $in: ["gaming"] } })

// Proyección: mostrar solo ciertos campos (1=mostrar, 0=ocultar)
db.productos.find(
  { precio: { $lt: 500000 } },
  { nombre: 1, precio: 1, _id: 0 }
)

// Ordenar y limitar
db.productos.find().sort({ precio: -1 }).limit(3)   // top 3 más caros

// Contar documentos
db.productos.countDocuments({ stock: { $gt: 10 } })`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 3, order: 4, type: 'example', xpReward: 20, topics: ['crud'],
    title: 'updateOne, updateMany y operadores de actualización',
    content: `## Actualización de documentos`,
    codeExample: `use tienda

// updateOne: actualizar el primer documento que coincide
db.productos.updateOne(
  { nombre: "Mouse inalámbrico" },      // filtro
  { $set: { precio: 89000, stock: 25 } } // actualización
)

// $inc: incrementar/decrementar valores numéricos
db.productos.updateOne(
  { nombre: "Teclado mecánico" },
  { $inc: { stock: -1, "ventas": 1 } }  // resta 1 al stock, suma 1 a ventas
)

// $push: agregar elemento a un array
db.productos.updateOne(
  { nombre: "Monitor 27\\"" },
  { $push: { categorias: "oferta" } }
)

// $unset: eliminar un campo
db.productos.updateOne(
  { nombre: "Mouse inalámbrico" },
  { $unset: { campoViejo: "" } }
)

// updateMany: actualizar todos los que coinciden
db.productos.updateMany(
  { stock: { $lt: 10 } },
  { $set: { enOferta: true } }
)

// upsert: insertar si no existe
db.productos.updateOne(
  { nombre: "Auriculares gaming" },
  { $set: { precio: 180000, stock: 20 } },
  { upsert: true }
)`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 3, order: 5, type: 'example', xpReward: 20, topics: ['crud'],
    title: 'deleteOne, deleteMany y replaceOne',
    content: `## Eliminación y reemplazo`,
    codeExample: `use tienda

// deleteOne: eliminar el primer documento que coincide
db.productos.deleteOne({ nombre: "Auriculares gaming" })

// deleteMany: eliminar todos los que coinciden
db.productos.deleteMany({ stock: 0 })

// replaceOne: reemplazar el documento completo
db.productos.replaceOne(
  { nombre: "Mouse inalámbrico" },
  {
    nombre: "Mouse ergonómico Pro",
    precio: 120000,
    stock: 18,
    categorias: ["periféricos", "ergonomía"],
    creadoEn: new Date()
  }
)

// findOneAndDelete: eliminar y retornar el documento eliminado
const eliminado = db.productos.findOneAndDelete(
  { precio: { $gt: 1000000 } },
  { returnDocument: "before" }
)
print("Eliminado:", eliminado)`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 3, order: 6, type: 'exercise', xpReward: 30, topics: ['crud'],
    title: 'Ejercicio CRUD completo: biblioteca',
    content: `## Ejercicio integrador: Sistema de biblioteca

Construye una pequeña base de datos para una biblioteca con operaciones CRUD completas.`,
    codeExample: null,
    exerciseInstructions: `Realiza las siguientes operaciones en la colección "libros" de la BD "biblioteca":

1. Inserta 3 libros con los campos: titulo, autor, año, genero (array), disponible (boolean), copias (number)
2. Encuentra todos los libros disponibles del género "tecnología"
3. Actualiza el número de copias del primer libro (réstale 1)
4. Agrega el género "programación" a un libro que no lo tenga
5. Elimina los libros con 0 copias
6. Cuenta cuántos libros de cada género hay (usa find + manual count)`,
    exerciseSolution: `use biblioteca

// 1. Insertar libros
db.libros.insertMany([
  {
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    año: 2008,
    genero: ["tecnología", "programación"],
    disponible: true,
    copias: 3
  },
  {
    titulo: "MongoDB: The Definitive Guide",
    autor: "Shannon Bradshaw",
    año: 2020,
    genero: ["tecnología", "bases de datos"],
    disponible: true,
    copias: 2
  },
  {
    titulo: "El Quijote",
    autor: "Miguel de Cervantes",
    año: 1605,
    genero: ["literatura", "clásico"],
    disponible: false,
    copias: 1
  }
])

// 2. Libros disponibles de tecnología
db.libros.find({ disponible: true, genero: "tecnología" })

// 3. Restar 1 copia al primer libro
db.libros.updateOne(
  { titulo: "Clean Code" },
  { $inc: { copias: -1 } }
)

// 4. Agregar género a un libro
db.libros.updateOne(
  { titulo: "MongoDB: The Definitive Guide" },
  { $addToSet: { genero: "programación" } }
)

// 5. Eliminar libros sin copias
db.libros.deleteMany({ copias: 0 })

// 6. Contar por género
db.libros.find({}, { genero: 1, _id: 0 })`,
  },

  // ─── ETAPA 4: Consultas avanzadas ─────────────────────────────────────────
  {
    stageOrder: 4, order: 1, type: 'reading', xpReward: 15, topics: ['queries', 'operadores'],
    title: 'Operadores de comparación y lógicos',
    content: `## Operadores de consulta en MongoDB

MongoDB ofrece un rico conjunto de operadores para filtrar documentos con precisión.

### Operadores de comparación

| Operador | Significado | Ejemplo |
|----------|-------------|---------|
| \`$eq\` | igual a | \`{ edad: { $eq: 25 } }\` |
| \`$ne\` | distinto de | \`{ estado: { $ne: "inactivo" } }\` |
| \`$gt\` | mayor que | \`{ precio: { $gt: 100 } }\` |
| \`$gte\` | mayor o igual | \`{ precio: { $gte: 100 } }\` |
| \`$lt\` | menor que | \`{ stock: { $lt: 5 } }\` |
| \`$lte\` | menor o igual | \`{ stock: { $lte: 5 } }\` |
| \`$in\` | dentro de array | \`{ rol: { $in: ["admin","user"] } }\` |
| \`$nin\` | fuera de array | \`{ rol: { $nin: ["ban"] } }\` |

### Operadores lógicos

\`\`\`javascript
// $and — todas las condiciones deben cumplirse
db.col.find({ $and: [ { precio: { $gt: 50 } }, { stock: { $gt: 0 } } ] })

// $or — al menos una condición
db.col.find({ $or: [ { precio: { $lt: 20 } }, { oferta: true } ] })

// $nor — ninguna condición
db.col.find({ $nor: [ { agotado: true }, { descontinuado: true } ] })

// $not — niega el operador
db.col.find({ precio: { $not: { $gt: 1000 } } })
\`\`\`

### Consultas en documentos embebidos

\`\`\`javascript
// Acceso con notación de punto
db.usuarios.find({ "direccion.ciudad": "Bogotá" })
db.productos.find({ "specs.memoria": { $gte: 16 } })
\`\`\``,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 4, order: 2, type: 'reading', xpReward: 15, topics: ['queries', 'arrays'],
    title: 'Consultas en arrays y operadores de elemento',
    content: `## Consultando arrays y campos especiales

### Operadores para arrays

\`\`\`javascript
// Buscar documentos donde el array contiene un valor
db.productos.find({ categorias: "gaming" })

// $all — el array debe contener TODOS los valores
db.productos.find({ categorias: { $all: ["gaming", "oferta"] } })

// $size — el array tiene exactamente N elementos
db.pedidos.find({ items: { $size: 3 } })

// $elemMatch — al menos un elemento cumple todas las condiciones
db.ventas.find({
  items: { $elemMatch: { precio: { $gt: 100 }, cantidad: { $gte: 2 } } }
})
\`\`\`

### Operadores de elemento

\`\`\`javascript
// $exists — el campo existe (o no)
db.col.find({ email: { $exists: true } })
db.col.find({ telefono: { $exists: false } })

// $type — el campo es de cierto tipo BSON
db.col.find({ edad: { $type: "int" } })
db.col.find({ precio: { $type: "double" } })
\`\`\`

### Expresiones regulares

\`\`\`javascript
// $regex — buscar por patrón en strings
db.usuarios.find({ nombre: { $regex: /^ana/i } })  // empieza con "ana"
db.productos.find({ descripcion: { $regex: "gaming", $options: "i" } })
\`\`\``,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 4, order: 3, type: 'example', xpReward: 20, topics: ['queries', 'proyecciones'],
    title: 'Proyecciones, sort, skip y limit',
    content: `## Control de resultados: qué mostrar y cuántos`,
    codeExample: `use tienda

// Datos de ejemplo
db.productos.insertMany([
  { nombre: "Laptop Pro", precio: 3500000, stock: 5, categoria: "computadores", rating: 4.8 },
  { nombre: "Tablet 10", precio: 850000, stock: 20, categoria: "tablets", rating: 4.2 },
  { nombre: "Smartphone X", precio: 1200000, stock: 15, categoria: "celulares", rating: 4.5 },
  { nombre: "Laptop Basic", precio: 1800000, stock: 8, categoria: "computadores", rating: 3.9 },
  { nombre: "Smartwatch", precio: 450000, stock: 30, categoria: "wearables", rating: 4.1 },
  { nombre: "Monitor 4K", precio: 2100000, stock: 3, categoria: "computadores", rating: 4.7 }
])

// Proyección: incluir solo nombre y precio (excluir _id)
db.productos.find({}, { nombre: 1, precio: 1, _id: 0 })

// Proyección exclusión: mostrar todo excepto stock
db.productos.find({}, { stock: 0 })

// Sort ascendente (1) y descendente (-1)
db.productos.find().sort({ precio: 1 })    // más barato primero
db.productos.find().sort({ rating: -1 })   // mejor rating primero

// Paginación: página 2 con 2 productos por página
db.productos.find()
  .sort({ nombre: 1 })
  .skip(2)    // saltar los primeros 2
  .limit(2)   // mostrar los siguientes 2

// Combinación completa: computadores ordenados por precio desc, solo nombre/precio
db.productos.find(
  { categoria: "computadores" },
  { nombre: 1, precio: 1, rating: 1, _id: 0 }
).sort({ precio: -1 })`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 4, order: 4, type: 'exercise', xpReward: 30, topics: ['queries', 'operadores'],
    title: 'Ejercicio: consultas sobre empleados',
    content: `## Ejercicio: base de datos de empleados

Practica operadores de consulta avanzados con una colección de empleados.`,
    codeExample: null,
    exerciseInstructions: `Primero crea los datos de prueba:

db.empleados.insertMany([
  { nombre: "Laura", depto: "TI", salario: 4500000, skills: ["JS", "MongoDB", "React"], activo: true, edad: 28 },
  { nombre: "Pedro", depto: "Ventas", salario: 2800000, skills: ["Excel", "CRM"], activo: true, edad: 35 },
  { nombre: "Sofía", depto: "TI", salario: 5200000, skills: ["Python", "MongoDB", "Docker"], activo: true, edad: 31 },
  { nombre: "Juan", depto: "RR.HH.", salario: 3100000, skills: ["SAP", "Excel"], activo: false, edad: 42 },
  { nombre: "María", depto: "TI", salario: 3800000, skills: ["Java", "Spring"], activo: true, edad: 26 }
])

Realiza estas consultas:
1. Empleados de TI con salario mayor a 4 millones
2. Empleados que conocen MongoDB (en su array de skills)
3. Empleados activos ordenados por salario descendente, mostrar solo nombre y salario
4. Empleados cuya edad está entre 25 y 35 (inclusive)
5. Empleados que NO son de TI ni de Ventas`,
    exerciseSolution: `// 1. TI con salario > 4M
db.empleados.find({ depto: "TI", salario: { $gt: 4000000 } })

// 2. Conocen MongoDB
db.empleados.find({ skills: "MongoDB" })

// 3. Activos ordenados por salario desc
db.empleados.find(
  { activo: true },
  { nombre: 1, salario: 1, _id: 0 }
).sort({ salario: -1 })

// 4. Edad entre 25 y 35
db.empleados.find({ edad: { $gte: 25, $lte: 35 } })

// 5. No son de TI ni Ventas
db.empleados.find({ depto: { $nin: ["TI", "Ventas"] } })`,
  },

  // ─── ETAPA 5: Índices ─────────────────────────────────────────────────────
  {
    stageOrder: 5, order: 1, type: 'reading', xpReward: 15, topics: ['indexes', 'rendimiento'],
    title: '¿Qué son los índices y por qué importan?',
    content: `## Índices en MongoDB

Un **índice** es una estructura de datos (B-Tree) que permite a MongoDB encontrar documentos sin recorrer toda la colección.

### Sin índice vs con índice

\`\`\`
Sin índice → COLLSCAN → revisa TODOS los documentos → lento con millones de docs
Con índice → IXSCAN   → va directo al resultado    → O(log n)
\`\`\`

### Tipos de índices

| Tipo | Uso |
|------|-----|
| **Simple** | Un campo: \`{ campo: 1 }\` (asc) o \`{ campo: -1 }\` (desc) |
| **Compuesto** | Múltiples campos: \`{ a: 1, b: -1 }\` |
| **Multikey** | Sobre campos que son arrays |
| **Texto** | Búsqueda full-text en strings |
| **Geoespacial** | Coordenadas GPS |
| **TTL** | Expira documentos automáticamente |
| **Único** | No permite valores duplicados |
| **Sparse** | Solo indexa documentos que tienen el campo |
| **Parcial** | Indexa solo documentos que cumplen una condición |

### El índice \`_id\`
Siempre existe un índice único en \`_id\`. No se puede eliminar.

### Costo de los índices
Los índices **aceleran las lecturas** pero **ralentizan las escrituras** (INSERT, UPDATE, DELETE) porque MongoDB debe actualizar cada índice afectado. No crees índices indiscriminadamente.`,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 5, order: 2, type: 'example', xpReward: 25, topics: ['indexes', 'explain'],
    title: 'Crear índices y analizar con explain()',
    content: `## Creando y analizando índices`,
    codeExample: `use tienda

// Insertar datos de prueba (1000 productos simulados)
for (let i = 1; i <= 100; i++) {
  db.catalogo.insertOne({
    codigo: "PROD-" + String(i).padStart(4, "0"),
    nombre: "Producto " + i,
    precio: Math.floor(Math.random() * 1000000) + 10000,
    categoria: ["electronica","ropa","hogar","deportes"][i % 4],
    stock: Math.floor(Math.random() * 100),
    activo: i % 5 !== 0
  })
}

// Sin índice: COLLSCAN (lento)
db.catalogo.find({ categoria: "electronica" }).explain("executionStats")

// Crear índice simple
db.catalogo.createIndex({ categoria: 1 })

// Ahora con índice: IXSCAN (rápido)
db.catalogo.find({ categoria: "electronica" }).explain("executionStats")

// Índice compuesto (util para: filtrar por categoria Y ordenar por precio)
db.catalogo.createIndex({ categoria: 1, precio: -1 })

// Índice único en código de producto
db.catalogo.createIndex({ codigo: 1 }, { unique: true })

// Índice TTL: eliminar docs inactivos después de 30 días
// db.sesiones.createIndex({ creadoEn: 1 }, { expireAfterSeconds: 2592000 })

// Ver todos los índices de la colección
db.catalogo.getIndexes()

// Eliminar un índice por nombre
// db.catalogo.dropIndex("categoria_1")`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 5, order: 3, type: 'exercise', xpReward: 30, topics: ['indexes', 'rendimiento'],
    title: 'Ejercicio: optimizar consultas con índices',
    content: `## Ejercicio: estrategia de índices`,
    codeExample: null,
    exerciseInstructions: `Dada esta colección de pedidos, crea los índices necesarios para optimizar las consultas indicadas:

// Crear datos
db.pedidos.insertMany([
  { clienteId: "C001", estado: "entregado", total: 150000, fecha: new Date("2026-01-10"), ciudad: "Bogotá" },
  { clienteId: "C002", estado: "pendiente", total: 89000, fecha: new Date("2026-02-15"), ciudad: "Medellín" },
  { clienteId: "C001", estado: "cancelado", total: 220000, fecha: new Date("2026-03-01"), ciudad: "Bogotá" },
  { clienteId: "C003", estado: "entregado", total: 45000, fecha: new Date("2026-03-20"), ciudad: "Cali" },
  { clienteId: "C002", estado: "entregado", total: 310000, fecha: new Date("2026-04-05"), ciudad: "Medellín" }
])

Consultas a optimizar:
1. db.pedidos.find({ clienteId: "C001" })
2. db.pedidos.find({ estado: "pendiente" }).sort({ fecha: -1 })
3. db.pedidos.find({ ciudad: "Bogotá", estado: "entregado" })

Para cada consulta: primero ejecuta explain() sin índice, crea el índice apropiado, y ejecuta explain() de nuevo para comparar.`,
    exerciseSolution: `// 1. Índice para buscar por clienteId
db.pedidos.createIndex({ clienteId: 1 })
db.pedidos.find({ clienteId: "C001" }).explain("executionStats")

// 2. Índice compuesto para filtrar + ordenar
db.pedidos.createIndex({ estado: 1, fecha: -1 })
db.pedidos.find({ estado: "pendiente" }).sort({ fecha: -1 }).explain("executionStats")

// 3. Índice compuesto ciudad + estado
db.pedidos.createIndex({ ciudad: 1, estado: 1 })
db.pedidos.find({ ciudad: "Bogotá", estado: "entregado" }).explain("executionStats")

// Ver todos los índices creados
db.pedidos.getIndexes()`,
  },

  // ─── ETAPA 6: Aggregation Pipeline ───────────────────────────────────────
  {
    stageOrder: 6, order: 1, type: 'reading', xpReward: 15, topics: ['aggregation', 'pipeline'],
    title: '¿Qué es el Aggregation Pipeline?',
    content: `## Aggregation Pipeline en MongoDB

El **pipeline de agregación** es una serie de etapas (\`stages\`) que procesan documentos secuencialmente, transformando los datos en cada paso.

\`\`\`
Colección → [ $match ] → [ $group ] → [ $sort ] → [ $limit ] → Resultado
\`\`\`

### Stages más importantes

| Stage | Descripción |
|-------|-------------|
| \`$match\` | Filtra documentos (como WHERE en SQL) |
| \`$group\` | Agrupa y calcula acumulados (como GROUP BY) |
| \`$project\` | Selecciona/transforma campos (como SELECT) |
| \`$sort\` | Ordena resultados |
| \`$limit\` | Limita la cantidad de documentos |
| \`$skip\` | Salta N documentos |
| \`$unwind\` | Descompone un array en documentos individuales |
| \`$lookup\` | JOIN con otra colección |
| \`$addFields\` | Agrega campos calculados |
| \`$count\` | Cuenta documentos |

### Acumuladores en $group

\`\`\`javascript
$sum    // sumar valores
$avg    // promedio
$min    // valor mínimo
$max    // valor máximo
$count  // contar documentos
$push   // construir array con valores
$first  // primer valor del grupo
$last   // último valor del grupo
\`\`\``,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 6, order: 2, type: 'example', xpReward: 25, topics: ['aggregation', 'stages'],
    title: '$match, $group y $project',
    content: `## Los stages fundamentales del pipeline`,
    codeExample: `use ventas_db

// Datos de ejemplo
db.ventas.insertMany([
  { producto: "Laptop", categoria: "tech", vendedor: "Ana", monto: 3500000, mes: 1, año: 2026 },
  { producto: "Mouse", categoria: "tech", vendedor: "Carlos", monto: 85000, mes: 1, año: 2026 },
  { producto: "Silla", categoria: "oficina", vendedor: "Ana", monto: 450000, mes: 2, año: 2026 },
  { producto: "Monitor", categoria: "tech", vendedor: "Carlos", monto: 1200000, mes: 2, año: 2026 },
  { producto: "Laptop", categoria: "tech", vendedor: "Ana", monto: 3200000, mes: 2, año: 2026 },
  { producto: "Escritorio", categoria: "oficina", vendedor: "Carlos", monto: 800000, mes: 3, año: 2026 }
])

// 1. $match + $group: ventas totales por vendedor
db.ventas.aggregate([
  { $match: { año: 2026 } },
  { $group: { _id: "$vendedor", totalVentas: { $sum: "$monto" }, cantidadOp: { $count: {} } } },
  { $sort: { totalVentas: -1 } }
])

// 2. $group por categoria con promedio
db.ventas.aggregate([
  { $group: {
    _id: "$categoria",
    promedio: { $avg: "$monto" },
    maximo: { $max: "$monto" },
    total: { $sum: "$monto" }
  }}
])

// 3. $project: campos calculados
db.ventas.aggregate([
  { $project: {
    producto: 1,
    vendedor: 1,
    montoConIva: { $multiply: ["$monto", 1.19] },
    mes: 1,
    _id: 0
  }}
])

// 4. Pipeline completo: top 3 productos tech del mes 1 o 2
db.ventas.aggregate([
  { $match: { categoria: "tech", mes: { $in: [1, 2] } } },
  { $group: { _id: "$producto", totalVentas: { $sum: "$monto" } } },
  { $sort: { totalVentas: -1 } },
  { $limit: 3 },
  { $project: { producto: "$_id", totalVentas: 1, _id: 0 } }
])`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 6, order: 3, type: 'example', xpReward: 25, topics: ['aggregation', 'lookup', 'unwind'],
    title: '$lookup (JOIN) y $unwind',
    content: `## Unir colecciones y descomponer arrays`,
    codeExample: `use ecommerce

// Dos colecciones relacionadas
db.clientes.insertMany([
  { _id: 1, nombre: "Ana López", ciudad: "Bogotá" },
  { _id: 2, nombre: "Carlos Ruiz", ciudad: "Medellín" }
])

db.ordenes.insertMany([
  { clienteId: 1, total: 320000, items: ["Laptop", "Mouse"], estado: "entregado" },
  { clienteId: 1, total: 85000,  items: ["Teclado"], estado: "pendiente" },
  { clienteId: 2, total: 150000, items: ["Monitor"], estado: "entregado" }
])

// $lookup: JOIN entre ordenes y clientes
db.ordenes.aggregate([
  { $lookup: {
    from: "clientes",         // colección a unir
    localField: "clienteId",  // campo en ordenes
    foreignField: "_id",       // campo en clientes
    as: "cliente"             // nombre del resultado
  }},
  { $unwind: "$cliente" },    // aplanar el array resultado del lookup
  { $project: {
    "cliente.nombre": 1,
    "cliente.ciudad": 1,
    total: 1,
    estado: 1,
    _id: 0
  }}
])

// $unwind: descomponer el array "items" en documentos individuales
db.ordenes.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$items", vecesVendido: { $count: {} } } },
  { $sort: { vecesVendido: -1 } }
])`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 6, order: 4, type: 'exercise', xpReward: 35, topics: ['aggregation'],
    title: 'Ejercicio: análisis de ventas con pipeline',
    content: `## Ejercicio: reportes de una tienda`,
    codeExample: null,
    exerciseInstructions: `Carga estos datos y construye los pipelines pedidos:

db.transacciones.insertMany([
  { tienda: "Norte", producto: "Café", cantidad: 50, precio: 8000, fecha: new Date("2026-01-05") },
  { tienda: "Sur",   producto: "Té",   cantidad: 30, precio: 6000, fecha: new Date("2026-01-10") },
  { tienda: "Norte", producto: "Té",   cantidad: 20, precio: 6000, fecha: new Date("2026-02-01") },
  { tienda: "Sur",   producto: "Café", cantidad: 80, precio: 8000, fecha: new Date("2026-02-15") },
  { tienda: "Norte", producto: "Jugo", cantidad: 15, precio: 12000, fecha: new Date("2026-03-01") },
  { tienda: "Sur",   producto: "Jugo", cantidad: 25, precio: 12000, fecha: new Date("2026-03-10") }
])

Construye estos pipelines:
1. Ingreso total (cantidad × precio) por tienda
2. Producto más vendido (por cantidad total)
3. Ingreso total por mes (extrae el mes de "fecha" con $month)`,
    exerciseSolution: `// 1. Ingreso total por tienda
db.transacciones.aggregate([
  { $addFields: { ingreso: { $multiply: ["$cantidad", "$precio"] } } },
  { $group: { _id: "$tienda", ingresoTotal: { $sum: "$ingreso" } } },
  { $sort: { ingresoTotal: -1 } }
])

// 2. Producto más vendido por cantidad
db.transacciones.aggregate([
  { $group: { _id: "$producto", totalCantidad: { $sum: "$cantidad" } } },
  { $sort: { totalCantidad: -1 } },
  { $limit: 1 }
])

// 3. Ingreso por mes
db.transacciones.aggregate([
  { $addFields: {
    ingreso: { $multiply: ["$cantidad", "$precio"] },
    mes: { $month: "$fecha" }
  }},
  { $group: { _id: "$mes", ingresoMes: { $sum: "$ingreso" } } },
  { $sort: { _id: 1 } }
])`,
  },

  // ─── ETAPA 7: Mongoose ────────────────────────────────────────────────────
  {
    stageOrder: 7, order: 1, type: 'reading', xpReward: 15, topics: ['mongoose', 'schemas'],
    title: 'Mongoose: ODM para Node.js',
    content: `## Mongoose

**Mongoose** es un ODM (Object Document Mapper) que agrega una capa de abstracción sobre el driver nativo de MongoDB en Node.js.

### ¿Por qué usar Mongoose?
- **Esquemas**: define la estructura esperada de los documentos.
- **Validaciones**: reglas automáticas antes de guardar.
- **Middleware (hooks)**: ejecutar código antes/después de operaciones.
- **Virtuals**: campos calculados que no se guardan en BD.
- **Populate**: resolución automática de referencias.

### Instalación y conexión
\`\`\`javascript
npm install mongoose

const mongoose = require('mongoose')
await mongoose.connect('mongodb://localhost:27017/mi_app')
\`\`\`

### Definir un Schema y Model
\`\`\`javascript
const { Schema, model } = require('mongoose')

const usuarioSchema = new Schema({
  nombre:  { type: String, required: true, trim: true },
  email:   { type: String, required: true, unique: true, lowercase: true },
  edad:    { type: Number, min: 0, max: 120 },
  activo:  { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

const Usuario = model('Usuario', usuarioSchema)
\`\`\`

### Tipos de datos en Mongoose
\`String\`, \`Number\`, \`Boolean\`, \`Date\`, \`Buffer\`, \`Mixed\`, \`ObjectId\`, \`Array\`, \`Map\`, \`Decimal128\``,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 7, order: 2, type: 'example', xpReward: 25, topics: ['mongoose', 'validaciones', 'hooks'],
    title: 'Validaciones, virtuals y middleware',
    content: `## Funcionalidades avanzadas de Mongoose`,
    codeExample: `// Schema con validaciones avanzadas
const productoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [3, 'Mínimo 3 caracteres'],
    maxlength: [100, 'Máximo 100 caracteres'],
    trim: true
  },
  precio: {
    type: Number,
    required: true,
    min: [0, 'El precio no puede ser negativo']
  },
  descuento: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  stock: { type: Number, default: 0 },
  categorias: [{ type: String, enum: ['tech', 'ropa', 'hogar', 'deportes'] }],
  activo: { type: Boolean, default: true }
}, { timestamps: true })  // agrega createdAt y updatedAt automáticamente

// Virtual: precio con descuento aplicado (no se guarda en BD)
productoSchema.virtual('precioFinal').get(function() {
  return this.precio * (1 - this.descuento / 100)
})

// Middleware pre-save: normalizar antes de guardar
productoSchema.pre('save', function(next) {
  this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1)
  next()
})

// Middleware post-save: log después de guardar
productoSchema.post('save', function(doc) {
  console.log(\`Producto guardado: \${doc.nombre}\`)
})

// Método de instancia
productoSchema.methods.aplicarDescuento = function(porcentaje) {
  this.descuento = porcentaje
  return this.save()
}

// Método estático
productoSchema.statics.findActivos = function() {
  return this.find({ activo: true, stock: { $gt: 0 } })
}

const Producto = model('Producto', productoSchema)`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 7, order: 3, type: 'exercise', xpReward: 30, topics: ['mongoose', 'schemas'],
    title: 'Ejercicio: diseña un schema de Mongoose',
    content: `## Ejercicio: schema para una red social`,
    codeExample: null,
    exerciseInstructions: `Diseña el Schema de Mongoose para un post de una red social con estas reglas:

Campos requeridos:
- titulo: string, requerido, mínimo 5 caracteres, máximo 200
- contenido: string, requerido, mínimo 10 caracteres
- autor: ObjectId (referencia a colección "usuarios"), requerido
- categorias: array de strings con enum ["tech","deportes","cultura","otro"]
- likes: número, mínimo 0, default 0
- publicado: boolean, default false
- tags: array de strings

Funcionalidades:
- Virtual "resumen": primeros 100 caracteres del contenido + "..."
- timestamps automáticos
- Pre-save hook: convertir tags a minúsculas
- Método estático: findPublicados() que retorna solo posts publicados con likes > 0`,
    exerciseSolution: `const mongoose = require('mongoose')
const { Schema, model } = mongoose

const postSchema = new Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    minlength: 5,
    maxlength: 200,
    trim: true
  },
  contenido: {
    type: String,
    required: true,
    minlength: 10
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  categorias: [{
    type: String,
    enum: ['tech', 'deportes', 'cultura', 'otro']
  }],
  likes: { type: Number, min: 0, default: 0 },
  publicado: { type: Boolean, default: false },
  tags: [String]
}, { timestamps: true })

// Virtual
postSchema.virtual('resumen').get(function() {
  return this.contenido.substring(0, 100) + '...'
})

// Pre-save hook
postSchema.pre('save', function(next) {
  if (this.tags) this.tags = this.tags.map(t => t.toLowerCase())
  next()
})

// Método estático
postSchema.statics.findPublicados = function() {
  return this.find({ publicado: true, likes: { $gt: 0 } }).sort({ likes: -1 })
}

const Post = model('Post', postSchema)`,
  },

  // ─── ETAPA 8: Relaciones ──────────────────────────────────────────────────
  {
    stageOrder: 8, order: 1, type: 'reading', xpReward: 15, topics: ['relaciones', 'embedding', 'referencing'],
    title: 'Embedding vs Referencing',
    content: `## Relaciones en MongoDB

A diferencia de las BDs relacionales, MongoDB no tiene JOINs nativos. Tienes dos estrategias:

### 1. Embedding (documentos embebidos)
Guardar los datos relacionados dentro del mismo documento.

\`\`\`javascript
// Embedding: dirección dentro del usuario
{
  nombre: "Ana",
  email: "ana@example.com",
  direccion: {           // ← embebido
    calle: "Calle 45",
    ciudad: "Bogotá",
    codigoPostal: "110111"
  }
}
\`\`\`

✅ **Usa embedding cuando:**
- Los datos se leen/escriben siempre juntos
- La relación es 1:1 o 1:Pocos (< ~15 items)
- Los subdocumentos no se necesitan de forma independiente

### 2. Referencing (documentos referenciados)
Guardar solo el \`_id\` del documento relacionado.

\`\`\`javascript
// Referencing: autor es una referencia
{
  titulo: "Mi artículo",
  autorId: ObjectId("507f1f77bcf86cd799439011")  // ← referencia
}
\`\`\`

✅ **Usa referencing cuando:**
- Los datos se actualizan frecuentemente e independientemente
- La relación es 1:Muchos (> ~15 items) o Muchos:Muchos
- Los subdocumentos se necesitan de forma independiente

### Regla práctica
> **"Guarda junto lo que se consulta junto."**
Si siempre necesitas los datos del autor junto con el artículo → embedding. Si solo a veces → referencing.`,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 8, order: 2, type: 'example', xpReward: 25, topics: ['relaciones', 'lookup', 'populate'],
    title: 'Implementando relaciones en la práctica',
    content: `## Relaciones con $lookup y populate`,
    codeExample: `use blog_db

// ── Relación 1:Muchos con referencing ──
db.autores.insertMany([
  { _id: 1, nombre: "Elena Martínez", email: "elena@blog.com", especialidad: "tech" },
  { _id: 2, nombre: "Roberto Cruz",   email: "roberto@blog.com", especialidad: "ciencia" }
])

db.articulos.insertMany([
  { titulo: "Intro a MongoDB", autorId: 1, likes: 45, tags: ["mongodb", "nosql"] },
  { titulo: "Docker en 2026",  autorId: 1, likes: 32, tags: ["docker", "devops"] },
  { titulo: "Física cuántica", autorId: 2, likes: 78, tags: ["ciencia", "fisica"] }
])

// $lookup: traer autor junto con cada artículo
db.articulos.aggregate([
  { $lookup: {
    from: "autores",
    localField: "autorId",
    foreignField: "_id",
    as: "autor"
  }},
  { $unwind: "$autor" },
  { $project: { titulo: 1, likes: 1, "autor.nombre": 1, "autor.especialidad": 1, _id: 0 } }
])

// ── Relación Muchos:Muchos ──
// Estudiantes y cursos
db.estudiantes.insertMany([
  { _id: 1, nombre: "María", cursoIds: [101, 102] },
  { _id: 2, nombre: "Jorge", cursoIds: [102, 103] }
])

db.cursos.insertMany([
  { _id: 101, nombre: "MongoDB Básico" },
  { _id: 102, nombre: "Node.js" },
  { _id: 103, nombre: "React" }
])

// Traer cursos de un estudiante con $lookup + $in
db.estudiantes.aggregate([
  { $match: { _id: 1 } },
  { $lookup: {
    from: "cursos",
    localField: "cursoIds",
    foreignField: "_id",
    as: "cursos"
  }},
  { $project: { nombre: 1, "cursos.nombre": 1, _id: 0 } }
])`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 8, order: 3, type: 'exercise', xpReward: 30, topics: ['relaciones'],
    title: 'Ejercicio: diseño de relaciones',
    content: `## Ejercicio: sistema de pedidos`,
    codeExample: null,
    exerciseInstructions: `Diseña e implementa las colecciones para un sistema de pedidos con estas entidades:
- Clientes (nombre, email, teléfono)
- Productos (nombre, precio, stock)
- Pedidos (cliente, lista de productos con cantidad, estado, total)

Pasos:
1. Crea las 3 colecciones con al menos 3 documentos cada una
   (los pedidos deben referenciar clientes y productos)
2. Escribe un pipeline que muestre: nombre del cliente, total del pedido, y lista de productos del pedido
3. Actualiza el stock de los productos restando las cantidades de un pedido entregado`,
    exerciseSolution: `use pedidos_db

// 1. Crear colecciones
db.clientes.insertMany([
  { _id: 1, nombre: "Ana Torres", email: "ana@mail.com", telefono: "3001234567" },
  { _id: 2, nombre: "Luis Pérez", email: "luis@mail.com", telefono: "3109876543" }
])

db.productos.insertMany([
  { _id: 101, nombre: "Laptop", precio: 3500000, stock: 10 },
  { _id: 102, nombre: "Mouse",  precio: 85000,   stock: 50 },
  { _id: 103, nombre: "Teclado", precio: 120000, stock: 30 }
])

db.pedidos.insertMany([
  {
    _id: 1001,
    clienteId: 1,
    items: [
      { productoId: 101, cantidad: 1 },
      { productoId: 102, cantidad: 2 }
    ],
    estado: "entregado",
    total: 3670000
  }
])

// 2. Pipeline: cliente + productos del pedido
db.pedidos.aggregate([
  { $lookup: { from: "clientes", localField: "clienteId", foreignField: "_id", as: "cliente" } },
  { $unwind: "$cliente" },
  { $unwind: "$items" },
  { $lookup: { from: "productos", localField: "items.productoId", foreignField: "_id", as: "producto" } },
  { $unwind: "$producto" },
  { $group: {
    _id: "$_id",
    cliente: { $first: "$cliente.nombre" },
    total: { $first: "$total" },
    productos: { $push: { nombre: "$producto.nombre", cantidad: "$items.cantidad" } }
  }}
])

// 3. Actualizar stock
db.productos.updateOne({ _id: 101 }, { $inc: { stock: -1 } })
db.productos.updateOne({ _id: 102 }, { $inc: { stock: -2 } })`,
  },

  // ─── ETAPA 9: Modelado NoSQL ──────────────────────────────────────────────
  {
    stageOrder: 9, order: 1, type: 'reading', xpReward: 20, topics: ['modelado', 'patrones'],
    title: 'Patrones de diseño NoSQL',
    content: `## Patrones de modelado en MongoDB

Los patrones de diseño son soluciones probadas a problemas comunes de modelado.

### Patrón Subset
**Problema:** Un array puede crecer indefinidamente (miles de comentarios, reseñas).
**Solución:** Guarda solo un subconjunto (ej. los 10 más recientes) en el documento principal y el resto en una colección separada.

\`\`\`javascript
// En lugar de: { reseñas: [...miles de reseñas...] }
// Usa:
{
  titulo: "Producto X",
  reseñasRecientes: [ /* últimas 10 */ ],
  totalReseñas: 2847
}
// Las demás reseñas van en colección "reseñas" referenciando productoId
\`\`\`

### Patrón Bucket
**Problema:** Series de tiempo con millones de eventos (IoT, logs, métricas).
**Solución:** Agrupar eventos en "buckets" por tiempo para reducir el número de documentos.

\`\`\`javascript
// En lugar de un documento por lectura:
{ sensorId: "S1", temperatura: 23.5, timestamp: ISODate("2026-01-01T10:00:00") }

// Agrupar en buckets de 1 hora:
{
  sensorId: "S1",
  hora: ISODate("2026-01-01T10:00:00"),
  lecturas: [23.5, 23.7, 23.4, ...], // todas las lecturas de esa hora
  count: 60,
  promedio: 23.5,
  min: 22.1,
  max: 24.8
}
\`\`\`

### Patrón Extended Reference
**Problema:** $lookup frecuente para obtener datos que rara vez cambian.
**Solución:** Copiar los campos más usados del documento referenciado.

\`\`\`javascript
// En lugar de solo el id:
{ pedidoId: 1001, clienteId: ObjectId("...") }

// Duplicar campos que se usan siempre:
{
  pedidoId: 1001,
  cliente: {
    _id: ObjectId("..."),
    nombre: "Ana Torres",   // duplicado intencionalmente
    email: "ana@mail.com"   // duplicado intencionalmente
  }
}
\`\`\``,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 9, order: 2, type: 'example', xpReward: 25, topics: ['modelado', 'antipatrones'],
    title: 'Antipatrones comunes a evitar',
    content: `## Errores frecuentes en el modelado NoSQL`,
    codeExample: `// ❌ ANTIPATRÓN 1: Arrays ilimitados
// Un array que crece sin límite → el documento supera los 16MB
{
  _id: "post_123",
  comentarios: [ /* 50.000 comentarios */ ]  // ¡PELIGRO!
}
// ✅ CORRECCIÓN: colección separada con referencia
// db.comentarios.find({ postId: "post_123" }).sort({ fecha: -1 }).limit(20)

// ❌ ANTIPATRÓN 2: Normalización excesiva (pensar en SQL)
// Múltiples lookups para datos simples
db.pedidos.aggregate([
  { $lookup: { from: "clientes", ... } },
  { $lookup: { from: "productos", ... } },
  { $lookup: { from: "direcciones", ... } },
  { $lookup: { from: "descuentos", ... } }
  // 4 joins = rendimiento terrible
])
// ✅ CORRECCIÓN: embeber lo que se lee junto

// ❌ ANTIPATRÓN 3: Usar _id como string con semántica
{ _id: "user_ana_bogota_2026" }  // muy frágil
// ✅ CORRECCIÓN: usar ObjectId por defecto y agregar campos separados

// ❌ ANTIPATRÓN 4: Campos con nombres numéricos (problemas con $set)
{ datos: { "0": "a", "1": "b" } }  // difícil de consultar
// ✅ CORRECCIÓN: usar arrays

// ✅ MODELADO CORRECTO para un e-commerce
db.pedidos.insertOne({
  // Snapshot del cliente al momento del pedido (extended reference)
  cliente: {
    _id: ObjectId("507f1f77bcf86cd799439011"),
    nombre: "Ana Torres",
    email: "ana@mail.com"
  },
  // Items con precio snapshot (inmutable)
  items: [
    { productoId: ObjectId("..."), nombre: "Laptop", precioUnitario: 3500000, cantidad: 1 }
  ],
  envio: { calle: "Calle 45 #12", ciudad: "Bogotá" },
  estado: "pendiente",
  total: 3500000,
  creadoEn: new Date()
})`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 9, order: 3, type: 'exercise', xpReward: 35, topics: ['modelado', 'diseño'],
    title: 'Ejercicio: modelar una red social',
    content: `## Ejercicio: diseño de esquema para red social`,
    codeExample: null,
    exerciseInstructions: `Diseña el modelo de datos para una red social simplificada con estas entidades:

- Usuarios: perfil básico, foto, bio
- Posts: texto, imágenes (hasta 10), autor, likes
- Comentarios: texto, autor, post, fecha
- Seguidores: relación entre usuarios

Restricciones:
- Un post puede tener millones de likes
- Un usuario puede tener miles de seguidores
- Cada post puede tener cientos de comentarios

Para cada colección:
1. Define el documento con todos sus campos
2. Justifica qué usas embedding vs referencing
3. Indica qué índices crearías
4. Implementa la creación de datos de ejemplo en el playground`,
    exerciseSolution: `use red_social

// Usuarios: info embebida que cambia poco
db.usuarios.insertOne({
  _id: ObjectId(),
  username: "ana_dev",
  nombre: "Ana García",
  bio: "Desarrolladora MongoDB",
  avatarUrl: "https://cdn.example.com/ana.jpg",
  seguidoresCount: 0,  // contador desnormalizado (eficiente)
  siguiendoCount: 0,
  creadoEn: new Date()
})

// Posts: sin likes embebidos (pueden ser millones)
// Sin comentarios embebidos (pueden ser cientos)
db.posts.insertOne({
  _id: ObjectId(),
  autorId: ObjectId("..."),
  autorUsername: "ana_dev",  // extended reference (evita lookup)
  texto: "Aprendiendo MongoDB 🍃",
  imagenes: ["img1.jpg"],  // máximo 10, razonable para embedding
  likesCount: 0,           // contador, no array de userIds
  comentariosCount: 0,
  tags: ["mongodb", "dev"],
  creadoEn: new Date()
})

// Comentarios: colección separada (referencing)
db.comentarios.insertOne({
  postId: ObjectId("..."),
  autorId: ObjectId("..."),
  autorUsername: "luis_dev",
  texto: "Excelente post!",
  creadoEn: new Date()
})

// Seguidores: colección de relaciones (Muchos:Muchos)
db.seguidores.insertOne({
  seguidorId: ObjectId("..."),   // quien sigue
  seguidoId: ObjectId("..."),    // a quien sigue
  desde: new Date()
})

// Índices necesarios
db.posts.createIndex({ autorId: 1, creadoEn: -1 })  // feed de un usuario
db.comentarios.createIndex({ postId: 1, creadoEn: 1 })
db.seguidores.createIndex({ seguidorId: 1, seguidoId: 1 }, { unique: true })`,
  },

  // ─── ETAPA 10: Transacciones ──────────────────────────────────────────────
  {
    stageOrder: 10, order: 1, type: 'reading', xpReward: 15, topics: ['transacciones', 'acid'],
    title: 'Transacciones ACID en MongoDB',
    content: `## Transacciones en MongoDB

Desde MongoDB 4.0 se soportan **transacciones multi-documento** con garantías ACID.

### ¿Qué es ACID?

| Propiedad | Significado |
|-----------|-------------|
| **A**tomicidad | Todo o nada: si una operación falla, todo se revierte |
| **C**onsistencia | La BD pasa de un estado válido a otro estado válido |
| **I**solación | Las transacciones concurrentes no se interfieren |
| **D**urabilidad | Los cambios confirmados persisten aunque el sistema falle |

### ¿Cuándo usar transacciones?
- **Transferencias bancarias**: debitar una cuenta y acreditar otra
- **Reservas**: verificar disponibilidad y reservar al mismo tiempo
- **Pedidos**: crear pedido Y actualizar stock simultáneamente

### Write Concern y Read Concern

\`\`\`javascript
// Write Concern: cuántos nodos deben confirmar la escritura
{ writeConcern: { w: "majority" } }  // mayoría de réplicas (más seguro)
{ writeConcern: { w: 1 } }           // solo el primario (más rápido)

// Read Concern: qué datos son visibles
{ readConcern: { level: "majority" } }   // datos confirmados
{ readConcern: { level: "snapshot" } }   // snapshot consistente
\`\`\`

### Limitaciones importantes
- Las transacciones tienen overhead de rendimiento (~3x más lento)
- Máximo 60 segundos por transacción por defecto
- **No abuses de ellas**: el modelado correcto (embedding) suele eliminar la necesidad de transacciones`,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 10, order: 2, type: 'example', xpReward: 25, topics: ['transacciones', 'sessions'],
    title: 'Implementando una transacción: transferencia bancaria',
    content: `## Ejemplo práctico de transacción`,
    codeExample: `// Nota: las transacciones requieren un Replica Set o Atlas
// En un MongoDB local standalone NO funcionan.
// En Atlas funcionan por defecto.

// ── Escenario: transferencia bancaria ──

use banco

// Crear cuentas
db.cuentas.insertMany([
  { _id: "C001", titular: "Ana López",   saldo: 1000000, moneda: "COP" },
  { _id: "C002", titular: "Luis Ruiz",   saldo: 500000,  moneda: "COP" }
])

// ── Transferencia SIN transacción (peligroso) ──
// Si falla el segundo paso, el dinero se pierde
db.cuentas.updateOne({ _id: "C001" }, { $inc: { saldo: -200000 } })
// ← si el sistema falla aquí, C002 nunca recibe el dinero
db.cuentas.updateOne({ _id: "C002" }, { $inc: { saldo: +200000 } })

// ── Transferencia CON transacción (seguro) ──
// En Node.js / Mongoose:
/*
const session = await mongoose.startSession()
session.startTransaction()
try {
  await Cuenta.updateOne(
    { _id: "C001", saldo: { $gte: 200000 } },
    { $inc: { saldo: -200000 } },
    { session }
  )
  await Cuenta.updateOne(
    { _id: "C002" },
    { $inc: { saldo: 200000 } },
    { session }
  )
  await session.commitTransaction()
  console.log("Transferencia exitosa")
} catch (error) {
  await session.abortTransaction()
  console.log("Transferencia revertida:", error.message)
} finally {
  await session.endSession()
}
*/

// Verificar saldos
db.cuentas.find()`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 10, order: 3, type: 'exercise', xpReward: 30, topics: ['transacciones'],
    title: 'Ejercicio: modelar operaciones atómicas',
    content: `## Ejercicio: operaciones que requieren atomicidad`,
    codeExample: null,
    exerciseInstructions: `Analiza estos escenarios e indica: ¿requiere transacción multi-documento? ¿o puede resolverse de otra forma?

Luego implementa la solución más adecuada para cada uno:

1. Sistema de votos: un usuario solo puede votar una vez en cada encuesta.
   - Colecciones: encuestas, votos
   - Operación: registrar voto y actualizar contador en la encuesta

2. Reserva de asientos en un cine
   - El asiento debe cambiar de "disponible" a "reservado"
   - Solo uno puede reservar el mismo asiento al mismo tiempo

3. Carrito de compras: agregar producto al carrito
   - Verificar que hay stock
   - Incrementar cantidad en el carrito
   - Decrementar stock del producto`,
    exerciseSolution: `use ejercicio_tx

// 1. Sistema de votos - findOneAndUpdate para atomicidad en un documento
db.encuestas.insertOne({
  _id: "ENC001",
  pregunta: "¿Te gusta MongoDB?",
  opciones: { si: 0, no: 0 },
  votantes: []  // array de userIds que ya votaron
})

// Operación atómica: agregar voto SOLO si el usuario no ha votado
db.encuestas.updateOne(
  { _id: "ENC001", votantes: { $nin: ["user123"] } }, // condición
  {
    $inc: { "opciones.si": 1 },
    $push: { votantes: "user123" }
  }
)
// Si el usuario ya votó, la operación no modifica nada (matchedCount = 0)

// 2. Reserva de asiento - atomic con condición en filtro
db.asientos.insertOne({ _id: "A1", sala: "Sala1", estado: "disponible" })

const resultado = db.asientos.updateOne(
  { _id: "A1", estado: "disponible" },  // solo si está disponible
  { $set: { estado: "reservado", reservadoPor: "user456", reservadoEn: new Date() } }
)
// resultado.modifiedCount === 1 → éxito
// resultado.modifiedCount === 0 → ya estaba reservado

// 3. Carrito + stock - también atómico con condición
db.productos.insertOne({ _id: "P1", nombre: "Laptop", stock: 5 })
db.carritos.insertOne({ usuarioId: "user789", items: [] })

// Decrementar stock solo si hay disponibilidad
const stockResult = db.productos.updateOne(
  { _id: "P1", stock: { $gte: 1 } },  // hay stock
  { $inc: { stock: -1 } }
)

if (stockResult.modifiedCount === 1) {
  db.carritos.updateOne(
    { usuarioId: "user789", "items.productoId": { $ne: "P1" } },
    { $push: { items: { productoId: "P1", cantidad: 1 } } }
  )
}`,
  },

  // ─── ETAPA 11: Seguridad ──────────────────────────────────────────────────
  {
    stageOrder: 11, order: 1, type: 'reading', xpReward: 15, topics: ['seguridad', 'roles', 'autenticacion'],
    title: 'Autenticación y autorización en MongoDB',
    content: `## Seguridad en MongoDB

### Autenticación: ¿quién eres?

MongoDB soporta varios mecanismos de autenticación:

| Mecanismo | Uso |
|-----------|-----|
| **SCRAM** (default) | Usuario/contraseña con hash |
| **x.509** | Certificados SSL para clientes |
| **LDAP** | Integración con directorio corporativo |
| **Kerberos** | Entornos enterprise |

### Roles integrados

\`\`\`
Roles de lectura:
  read              → solo lectura en una BD
  readAnyDatabase   → solo lectura en todas las BDs

Roles de escritura:
  readWrite         → lectura y escritura en una BD

Roles de administración:
  dbAdmin           → administrar una BD (índices, stats)
  userAdmin         → gestionar usuarios de una BD
  dbOwner           → todas las ops en una BD

Roles globales:
  clusterAdmin      → administrar el cluster
  root              → superusuario (¡usar con cuidado!)
\`\`\`

### Crear usuarios seguros
\`\`\`javascript
// Conectar como admin
use admin

db.createUser({
  user: "app_user",
  pwd: "contraseña_segura_123!",
  roles: [
    { role: "readWrite", db: "mi_app" }
  ]
})

// Usuario solo lectura para reportes
db.createUser({
  user: "reporter",
  pwd: "solo_lectura_456",
  roles: [{ role: "read", db: "mi_app" }]
})
\`\`\`

### Buenas prácticas de seguridad
1. **Nunca** usar el usuario \`root\` en la aplicación
2. Principio de mínimo privilegio: solo los permisos necesarios
3. Rotar contraseñas regularmente
4. Habilitar TLS/SSL en producción
5. Restringir acceso por IP (Network Access en Atlas)`,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 11, order: 2, type: 'example', xpReward: 20, topics: ['seguridad', 'cifrado'],
    title: 'Protección contra inyección y cifrado',
    content: `## Seguridad en la capa de aplicación`,
    codeExample: `// ── Inyección NoSQL — cómo prevenir ──

// ❌ VULNERABLE: construir queries con input directo
const username = req.body.username  // puede ser { $gt: "" }
db.usuarios.find({ username: username })  // ¡devuelve TODOS los usuarios!

// ✅ SEGURO con Mongoose: el schema valida el tipo
const UsuarioSchema = new Schema({
  username: { type: String }  // solo acepta strings
})
// Si username llega como objeto { $gt: "" }, Mongoose lo rechaza

// ✅ SEGURO: validar y sanear el input
const { escape } = require('validator')
const safeUsername = escape(req.body.username)
await Usuario.findOne({ username: safeUsername })

// ── Cifrado de campos sensibles ──

// Opción 1: cifrar a nivel de aplicación antes de guardar
const crypto = require('crypto')
const clave = process.env.CIPHER_KEY  // 32 bytes hex

function cifrar(texto) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(clave, 'hex'), iv)
  const cifrado = Buffer.concat([cipher.update(texto, 'utf8'), cipher.final()])
  return iv.toString('hex') + ':' + cifrado.toString('hex')
}

// Guardar tarjeta de crédito cifrada
db.pagos.insertOne({
  usuarioId: ObjectId("..."),
  ultimosDigitos: "4567",               // para mostrar al usuario
  numeroCifrado: cifrar("4111111111114567")  // cifrado en BD
})

// ── Auditoría: registrar acciones importantes ──
db.auditoria.insertOne({
  accion: "login",
  usuarioId: ObjectId("..."),
  ip: "192.168.1.1",
  fecha: new Date(),
  exito: true
})`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 11, order: 3, type: 'exercise', xpReward: 30, topics: ['seguridad'],
    title: 'Ejercicio: auditoría y control de acceso',
    content: `## Ejercicio: sistema de auditoría`,
    codeExample: null,
    exerciseInstructions: `Implementa un sistema básico de auditoría para una aplicación:

1. Crea una colección "logs_auditoria" con documentos que registren:
   - usuarioId, accion, recurso, ip, fecha, resultado (éxito/fallo), detalles

2. Inserta al menos 10 registros de auditoría simulando:
   - 3 logins exitosos de diferentes usuarios
   - 2 intentos de login fallidos
   - 3 operaciones CRUD en datos sensibles
   - 2 accesos a reportes administrativos

3. Crea índices apropiados para:
   - Consultar logs por usuario
   - Consultar logs por rango de fechas
   - Consultar solo los fallos de seguridad

4. Escribe queries para:
   - Ver los últimos 5 intentos fallidos
   - Actividad de un usuario específico en las últimas 24h
   - Resumen de acciones por tipo (aggregation)`,
    exerciseSolution: `use seguridad_db

// 1. Crear registros de auditoría
db.logs_auditoria.insertMany([
  { usuarioId: "U001", accion: "login", recurso: "auth", ip: "192.168.1.10", fecha: new Date("2026-05-01T08:00:00"), resultado: "exito", detalles: {} },
  { usuarioId: "U002", accion: "login", recurso: "auth", ip: "10.0.0.5", fecha: new Date("2026-05-01T09:15:00"), resultado: "exito", detalles: {} },
  { usuarioId: "U003", accion: "login", recurso: "auth", ip: "172.16.0.3", fecha: new Date("2026-05-01T10:30:00"), resultado: "exito", detalles: {} },
  { usuarioId: "U004", accion: "login", recurso: "auth", ip: "5.5.5.5", fecha: new Date("2026-05-01T11:00:00"), resultado: "fallo", detalles: { razon: "contraseña incorrecta" } },
  { usuarioId: "U005", accion: "login", recurso: "auth", ip: "8.8.8.8", fecha: new Date("2026-05-01T11:05:00"), resultado: "fallo", detalles: { razon: "usuario no existe" } },
  { usuarioId: "U001", accion: "read", recurso: "clientes", ip: "192.168.1.10", fecha: new Date("2026-05-01T08:05:00"), resultado: "exito", detalles: { registros: 150 } },
  { usuarioId: "U001", accion: "update", recurso: "clientes", ip: "192.168.1.10", fecha: new Date("2026-05-01T08:10:00"), resultado: "exito", detalles: { clienteId: "C999" } },
  { usuarioId: "U002", accion: "delete", recurso: "pedidos", ip: "10.0.0.5", fecha: new Date("2026-05-01T09:20:00"), resultado: "exito", detalles: { pedidoId: "P123" } },
  { usuarioId: "U001", accion: "reporte", recurso: "admin_dashboard", ip: "192.168.1.10", fecha: new Date("2026-05-01T08:30:00"), resultado: "exito", detalles: {} },
  { usuarioId: "U006", accion: "reporte", recurso: "admin_dashboard", ip: "200.1.2.3", fecha: new Date("2026-05-01T12:00:00"), resultado: "fallo", detalles: { razon: "sin permisos" } }
])

// 3. Índices
db.logs_auditoria.createIndex({ usuarioId: 1, fecha: -1 })
db.logs_auditoria.createIndex({ fecha: -1 })
db.logs_auditoria.createIndex({ resultado: 1, fecha: -1 })

// 4. Queries
// Últimos 5 intentos fallidos
db.logs_auditoria.find({ resultado: "fallo" }).sort({ fecha: -1 }).limit(5)

// Actividad de U001 en las últimas 24h
db.logs_auditoria.find({
  usuarioId: "U001",
  fecha: { $gte: new Date(Date.now() - 24*60*60*1000) }
}).sort({ fecha: -1 })

// Resumen por tipo de acción
db.logs_auditoria.aggregate([
  { $group: { _id: { accion: "$accion", resultado: "$resultado" }, total: { $count: {} } } },
  { $sort: { "_id.accion": 1 } }
])`,
  },

  // ─── ETAPA 12: Replicación y Sharding ────────────────────────────────────
  {
    stageOrder: 12, order: 1, type: 'reading', xpReward: 20, topics: ['replicacion', 'alta-disponibilidad'],
    title: 'Replica Sets: alta disponibilidad',
    content: `## Replica Sets en MongoDB

Un **Replica Set** es un grupo de instancias MongoDB que mantienen el mismo conjunto de datos. Proporciona **alta disponibilidad** y **redundancia**.

### Arquitectura

\`\`\`
        ┌─────────────────┐
        │   Aplicación    │
        └────────┬────────┘
                 │ Lee/Escribe
                 ▼
     ┌───────────────────────┐
     │      PRIMARY          │  ← recibe todas las escrituras
     └───────┬───────────────┘
             │ Replica
    ┌────────▼────────────────┐
    │     SECONDARY 1         │  ← replica los datos
    └─────────────────────────┘
    ┌─────────────────────────┐
    │     SECONDARY 2         │  ← replica los datos
    └─────────────────────────┘
\`\`\`

### Proceso de elección (election)
Si el PRIMARY falla, los secundarios **votan automáticamente** un nuevo primario en ~10-30 segundos.

### Beneficios
- ✅ **Redundancia**: si un nodo falla, los datos están seguros
- ✅ **Alta disponibilidad**: failover automático
- ✅ **Escalado de lectura**: las lecturas pueden ir a secundarios
- ✅ **Sin downtime** para actualizaciones (rolling update)

### Leer desde secundarios
\`\`\`javascript
// Por defecto las lecturas van al primary
// Para leer desde secundario (datos pueden ser ligeramente desactualizados):
db.getMongo().setReadPref('secondaryPreferred')

// En Mongoose:
mongoose.connect(uri, {
  readPreference: 'secondaryPreferred'
})
\`\`\`

### En MongoDB Atlas
Atlas crea un Replica Set de 3 nodos automáticamente en todos los clusters (incluso el free tier M0).`,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 12, order: 2, type: 'reading', xpReward: 20, topics: ['sharding', 'escalado'],
    title: 'Sharding: escalado horizontal',
    content: `## Sharding en MongoDB

El **sharding** divide los datos entre múltiples servidores (shards), permitiendo escalar horizontalmente más allá de las capacidades de un solo servidor.

### ¿Cuándo necesitas sharding?
- Colecciones de **cientos de GB o TB**
- Más de **100,000 operaciones/segundo**
- El servidor primario no puede manejar la carga

### Arquitectura de un cluster con sharding

\`\`\`
Aplicación
    │
    ▼
mongos (router)          ← enruta las queries al shard correcto
    │
    ├── Shard 1          ← datos cuyo shardKey < 1000
    ├── Shard 2          ← datos cuyo shardKey 1000-2000
    └── Shard 3          ← datos cuyo shardKey > 2000

Config Servers (3)       ← metadatos del cluster
\`\`\`

### Shard Key: la decisión más importante

La **shard key** determina cómo se distribuyen los datos. Elegir mal → problema de rendimiento difícil de resolver.

\`\`\`javascript
// Buena shard key: alta cardinalidad, distribución uniforme
sh.shardCollection("mi_app.logs", { usuarioId: 1, fecha: 1 })

// ❌ Mala shard key: baja cardinalidad
sh.shardCollection("mi_app.col", { pais: 1 })  // solo ~200 países → desequilibrio
\`\`\`

### Tipos de sharding
- **Range sharding**: distribución por rango de valores
- **Hash sharding**: distribución uniforme por hash (mejor para inserciones)
- **Zone sharding**: ubicar datos en regiones geográficas específicas

> **Importante:** El sharding en Atlas se configura con un clic en clusters M30+.`,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 12, order: 3, type: 'exercise', xpReward: 30, topics: ['replicacion', 'sharding'],
    title: 'Ejercicio: planificación de arquitectura',
    content: `## Ejercicio: diseño de arquitectura para escala`,
    codeExample: null,
    exerciseInstructions: `Analiza los siguientes escenarios y diseña la arquitectura MongoDB apropiada. Para cada uno, responde en el playground como comentario estructurado:

Escenario 1: Startup de e-commerce
- 10,000 usuarios activos por día
- 500 GB de catálogo de productos
- Picos de tráfico en temporadas (10x el tráfico normal)
- Presupuesto moderado

Escenario 2: Sistema de IoT industrial
- 10,000 sensores enviando datos cada segundo
- Datos crecen 1 TB por mes
- Consultas de series de tiempo por sensor y rango de fechas
- Datos de hace más de 1 año rara vez se consultan

Escenario 3: Red social global
- 50 millones de usuarios en múltiples continentes
- Latencia < 100ms requerida para todos los usuarios
- 99.99% de disponibilidad requerida

Para cada escenario indica:
- ¿Replica Set solo o Sharding?
- ¿Cuántos nodos?
- ¿Qué shard key usarías?
- ¿Qué patrón de modelado aplicarías?`,
    exerciseSolution: `/*
ESCENARIO 1: E-commerce Startup
- Arquitectura: Replica Set de 3 nodos en Atlas M10 (suficiente para empezar)
- Sin sharding inicial (escalar cuando sea necesario)
- Alta disponibilidad con failover automático
- Índices en: productoId, categoria, precio para catálogo
- Auto-scaling habilitado en Atlas para picos de tráfico
- Modelado: productos con categorias embebidas, pedidos con snapshot de cliente
- Escalado futuro: sharding en productoId cuando se superen 1TB
*/

db.arquitectura_e1.insertOne({
  escenario: "E-commerce Startup",
  tipo: "Replica Set",
  nodos: 3,
  tier: "Atlas M10",
  sharding: false,
  indices: ["productoId", "categoria_precio_compuesto", "clienteId"],
  patron: "Extended Reference para pedidos",
  escalado: "Vertical primero, horizontal cuando supere 500GB por coleccion"
})

/*
ESCENARIO 2: IoT Industrial
- Sharding habilitado desde el inicio (1TB/mes es enorme)
- Shard key: { sensorId: 1, fecha: 1 } → hash sharding para distribución uniforme
- Patrón Bucket: agrupar lecturas por hora por sensor
- TTL index en datos de hace +1 año o tiered storage
- 6+ shards en Atlas M40
*/

db.arquitectura_e2.insertOne({
  escenario: "IoT Industrial",
  tipo: "Sharded Cluster",
  nodos: "3 config + 6 shards (cada shard con 3 replicas)",
  shardKey: "{ sensorId: 1, fecha: 1 }",
  patron: "Bucket por hora + TTL para datos antiguos",
  indices: ["sensorId_fecha_compuesto"],
  archivado: "Atlas Data Federation para datos > 1 año"
})

/*
ESCENARIO 3: Red Social Global
- Multi-region Replica Set en Atlas Global Clusters
- Zonas: América, Europa, Asia
- Zone sharding por región del usuario
- Latencia reducida al servir desde el nodo más cercano
- 99.99% SLA con réplicas en múltiples AZ
*/

db.arquitectura_e3.insertOne({
  escenario: "Red Social Global",
  tipo: "Global Cluster con Zone Sharding",
  regiones: ["us-east-1", "eu-west-1", "ap-southeast-1"],
  shardKey: "{ region: 1, usuarioId: 1 }",
  patron: "Subset para feeds, Extended Reference para posts",
  disponibilidad: "99.99% con Atlas M50+ Multi-Region"
})`,
  },

  // ─── ETAPA 13: Proyecto integrador ───────────────────────────────────────
  {
    stageOrder: 13, order: 1, type: 'reading', xpReward: 20, topics: ['buenas-practicas', 'optimizacion'],
    title: 'Buenas prácticas y checklist de producción',
    content: `## Checklist para MongoDB en producción

### Modelado ✅
- [ ] Los documentos no superan los 16MB
- [ ] Los arrays tienen un límite razonable (< ~100 elementos)
- [ ] Se usó embedding para datos que se consultan juntos
- [ ] Se usó referencing para datos que crecen ilimitadamente
- [ ] No hay normalización excesiva (múltiples lookups para datos simples)

### Índices ✅
- [ ] Existe un índice para cada campo usado en filtros frecuentes
- [ ] Los índices compuestos respetan el orden de uso (igualdad → rango → sort)
- [ ] Se eliminaron índices no usados (\`db.col.aggregate([{$indexStats:{}}])\`)
- [ ] Los arrays grandes tienen índice multikey con precaución

### Queries ✅
- [ ] Todas las queries tienen índice (verificado con explain())
- [ ] Se usan proyecciones para no traer campos innecesarios
- [ ] Los resultados grandes se paginan (skip/limit o cursor-based pagination)
- [ ] No hay queries con \`$where\` (JavaScript en el servidor, muy lento)

### Seguridad ✅
- [ ] El usuario de la app tiene mínimos privilegios (readWrite, no root)
- [ ] TLS/SSL habilitado en producción
- [ ] El input de usuarios se valida antes de usarlo en queries
- [ ] Las contraseñas y tokens están cifrados
- [ ] Network Access restringido a IPs de la aplicación

### Operaciones ✅
- [ ] Replica Set configurado (mínimo 3 nodos)
- [ ] Backups automáticos habilitados
- [ ] Alertas configuradas en Atlas (CPU > 80%, conexiones > 80%)
- [ ] Logs de operaciones lentas habilitados (> 100ms)`,
    codeExample: null, exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 13, order: 2, type: 'example', xpReward: 30, topics: ['optimizacion', 'buenas-practicas'],
    title: 'Optimización de queries lentas',
    content: `## Diagnóstico y optimización de rendimiento`,
    codeExample: `use performance_demo

// Insertar datos de prueba
for (let i = 0; i < 200; i++) {
  db.ventas.insertOne({
    vendedorId: "V" + (i % 10),
    productoId: "P" + (i % 50),
    monto: Math.floor(Math.random() * 500000) + 10000,
    region: ["norte","sur","este","oeste"][i % 4],
    fecha: new Date(2026, Math.floor(i/16), (i % 28) + 1),
    procesado: i % 3 !== 0
  })
}

// ── Diagnóstico: ¿qué queries son lentas? ──

// 1. Verificar si la query usa índice
db.ventas.find({ vendedorId: "V3", procesado: true })
  .explain("executionStats")
// Busca: "stage": "COLLSCAN" (malo) vs "IXSCAN" (bueno)
// Busca: "totalDocsExamined" vs "nReturned" (si son muy distintos, necesitas índice)

// 2. Crear el índice apropiado
db.ventas.createIndex({ vendedorId: 1, procesado: 1, fecha: -1 })

// 3. Verificar mejora
db.ventas.find({ vendedorId: "V3", procesado: true })
  .explain("executionStats")

// ── Hint: forzar el uso de un índice específico ──
db.ventas.find({ vendedorId: "V3" })
  .hint({ vendedorId: 1, procesado: 1, fecha: -1 })
  .explain("executionStats")

// ── Estadísticas de uso de índices ──
db.ventas.aggregate([{ $indexStats: {} }])

// ── Cursor-based pagination (mejor que skip para tablas grandes) ──
// Página 1
const pag1 = db.ventas.find().sort({ _id: 1 }).limit(5).toArray()
const ultimoId = pag1[pag1.length - 1]._id

// Página 2: en lugar de skip, usar el último _id
db.ventas.find({ _id: { $gt: ultimoId } }).sort({ _id: 1 }).limit(5)`,
    exerciseInstructions: null, exerciseSolution: null,
  },
  {
    stageOrder: 13, order: 3, type: 'exercise', xpReward: 50, topics: ['proyecto', 'buenas-practicas'],
    title: 'Proyecto integrador: sistema completo',
    content: `## Proyecto final: Sistema de gestión de una librería online

Aplica todos los conceptos del curso en un sistema real y funcional.`,
    codeExample: null,
    exerciseInstructions: `Construye una base de datos completa para una librería online con estas entidades:

📚 LIBROS: isbn, titulo, autores (array), editorial, año, precio, stock, generos, rating, reseñasCount
👤 USUARIOS: nombre, email, tipo (cliente/admin), historialCompras (últimas 5), totalGastado
🛒 PEDIDOS: usuario, items (libro+cantidad+precioSnapshot), total, estado, fecha
⭐ RESEÑAS: libro, usuario, calificacion (1-5), comentario, fecha, verificada

REQUERIMIENTOS TÉCNICOS:
1. Modelado:
   - Aplica el patrón Extended Reference donde sea apropiado
   - Aplica el patrón Subset para historial de compras
   - Documenta por qué elegiste embedding vs referencing en cada caso

2. Inserta datos reales:
   - Mínimo 5 libros con datos completos
   - Mínimo 3 usuarios con historial
   - Mínimo 5 pedidos en distintos estados
   - Mínimo 8 reseñas

3. Índices:
   - Crea todos los índices necesarios para las queries más comunes
   - Verifica con explain() que se usan

4. Aggregations:
   - Top 3 libros más vendidos (por unidades)
   - Ingreso total por género de libro
   - Usuarios con mayor gasto total
   - Calificación promedio por libro (usando colección reseñas)

5. Mantenimiento:
   - Query para actualizar el campo "rating" de los libros basándose en reseñas
   - Query para marcar pedidos "pendientes" de más de 7 días como "retrasados"`,
    exerciseSolution: `use libreria_online

// ═══════════════════════════════════════
// 1. CREACIÓN DE COLECCIONES CON DATOS
// ═══════════════════════════════════════

db.libros.insertMany([
  {
    isbn: "978-0-13-468599-1", titulo: "Clean Code",
    autores: ["Robert C. Martin"], editorial: "Prentice Hall",
    año: 2008, precio: 85000, stock: 15,
    generos: ["programacion","ingenieria_software"],
    rating: 4.8, reseñasCount: 0
  },
  {
    isbn: "978-1-491-95468-6", titulo: "MongoDB: The Definitive Guide",
    autores: ["Shannon Bradshaw","Eoin Brazil"], editorial: "O'Reilly",
    año: 2020, precio: 95000, stock: 8,
    generos: ["bases_datos","programacion"],
    rating: 4.6, reseñasCount: 0
  },
  {
    isbn: "978-0-20-161622-4", titulo: "The Pragmatic Programmer",
    autores: ["David Thomas","Andrew Hunt"], editorial: "Addison-Wesley",
    año: 2019, precio: 78000, stock: 20,
    generos: ["programacion","ingenieria_software"],
    rating: 4.9, reseñasCount: 0
  },
  {
    isbn: "978-1-59-327584-6", titulo: "Designing Data-Intensive Applications",
    autores: ["Martin Kleppmann"], editorial: "O'Reilly",
    año: 2017, precio: 110000, stock: 5,
    generos: ["bases_datos","arquitectura"],
    rating: 4.9, reseñasCount: 0
  },
  {
    isbn: "978-0-13-235088-4", titulo: "Introduction to Algorithms",
    autores: ["Thomas H. Cormen"], editorial: "MIT Press",
    año: 2009, precio: 150000, stock: 3,
    generos: ["algoritmos","matematicas"],
    rating: 4.7, reseñasCount: 0
  }
])

db.usuarios.insertMany([
  {
    _id: 1, nombre: "Ana Martínez", email: "ana@mail.com", tipo: "cliente",
    historialCompras: [],  // se llena con las últimas 5 compras (patrón Subset)
    totalGastado: 0
  },
  {
    _id: 2, nombre: "Carlos López", email: "carlos@mail.com", tipo: "cliente",
    historialCompras: [], totalGastado: 0
  },
  {
    _id: 3, nombre: "Admin", email: "admin@libreria.com", tipo: "admin",
    historialCompras: [], totalGastado: 0
  }
])

db.pedidos.insertMany([
  {
    usuarioId: 1,
    usuario: { nombre: "Ana Martínez", email: "ana@mail.com" },
    items: [
      { isbn: "978-0-13-468599-1", titulo: "Clean Code", precioUnitario: 85000, cantidad: 1 }
    ],
    total: 85000, estado: "entregado",
    fecha: new Date("2026-04-10")
  },
  {
    usuarioId: 2,
    usuario: { nombre: "Carlos López", email: "carlos@mail.com" },
    items: [
      { isbn: "978-1-491-95468-6", titulo: "MongoDB: The Definitive Guide", precioUnitario: 95000, cantidad: 2 },
      { isbn: "978-0-20-161622-4", titulo: "The Pragmatic Programmer", precioUnitario: 78000, cantidad: 1 }
    ],
    total: 268000, estado: "entregado",
    fecha: new Date("2026-04-15")
  },
  {
    usuarioId: 1,
    usuario: { nombre: "Ana Martínez", email: "ana@mail.com" },
    items: [
      { isbn: "978-1-59-327584-6", titulo: "Designing Data-Intensive Applications", precioUnitario: 110000, cantidad: 1 }
    ],
    total: 110000, estado: "pendiente",
    fecha: new Date("2026-05-01")
  },
  {
    usuarioId: 2,
    usuario: { nombre: "Carlos López", email: "carlos@mail.com" },
    items: [
      { isbn: "978-0-13-235088-4", titulo: "Introduction to Algorithms", precioUnitario: 150000, cantidad: 1 }
    ],
    total: 150000, estado: "enviado",
    fecha: new Date("2026-05-10")
  },
  {
    usuarioId: 1,
    usuario: { nombre: "Ana Martínez", email: "ana@mail.com" },
    items: [
      { isbn: "978-0-13-468599-1", titulo: "Clean Code", precioUnitario: 85000, cantidad: 1 },
      { isbn: "978-0-20-161622-4", titulo: "The Pragmatic Programmer", precioUnitario: 78000, cantidad: 1 }
    ],
    total: 163000, estado: "pendiente",
    fecha: new Date("2026-05-05")
  }
])

db.reseñas.insertMany([
  { isbn: "978-0-13-468599-1", usuarioId: 1, calificacion: 5, comentario: "Imprescindible para cualquier desarrollador", fecha: new Date("2026-04-20"), verificada: true },
  { isbn: "978-0-13-468599-1", usuarioId: 2, calificacion: 5, comentario: "Cambió mi forma de programar", fecha: new Date("2026-04-25"), verificada: true },
  { isbn: "978-1-491-95468-6", usuarioId: 2, calificacion: 4, comentario: "Muy completo, algo técnico", fecha: new Date("2026-04-28"), verificada: true },
  { isbn: "978-0-20-161622-4", usuarioId: 1, calificacion: 5, comentario: "El mejor libro de programación que he leído", fecha: new Date("2026-05-02"), verificada: false },
  { isbn: "978-1-59-327584-6", usuarioId: 2, calificacion: 5, comentario: "Fundamental para entender sistemas distribuidos", fecha: new Date("2026-04-18"), verificada: true },
  { isbn: "978-0-13-235088-4", usuarioId: 1, calificacion: 4, comentario: "Muy teórico pero completo", fecha: new Date("2026-05-12"), verificada: true },
  { isbn: "978-1-491-95468-6", usuarioId: 1, calificacion: 5, comentario: "La biblia de MongoDB", fecha: new Date("2026-04-30"), verificada: true },
  { isbn: "978-0-20-161622-4", usuarioId: 2, calificacion: 5, comentario: "Consejos prácticos y directos", fecha: new Date("2026-04-22"), verificada: true }
])

// ═══════════════════════════════════════
// 3. ÍNDICES
// ═══════════════════════════════════════
db.libros.createIndex({ isbn: 1 }, { unique: true })
db.libros.createIndex({ generos: 1, rating: -1 })
db.libros.createIndex({ precio: 1, stock: 1 })
db.pedidos.createIndex({ usuarioId: 1, fecha: -1 })
db.pedidos.createIndex({ estado: 1, fecha: -1 })
db.reseñas.createIndex({ isbn: 1, calificacion: -1 })
db.reseñas.createIndex({ usuarioId: 1 })

// ═══════════════════════════════════════
// 4. AGGREGATIONS
// ═══════════════════════════════════════

// Top 3 libros más vendidos por unidades
db.pedidos.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$items.isbn", titulo: { $first: "$items.titulo" }, unidades: { $sum: "$items.cantidad" } } },
  { $sort: { unidades: -1 } },
  { $limit: 3 }
])

// Ingreso total por género
db.pedidos.aggregate([
  { $match: { estado: "entregado" } },
  { $unwind: "$items" },
  { $lookup: { from: "libros", localField: "items.isbn", foreignField: "isbn", as: "libro" } },
  { $unwind: "$libro" },
  { $unwind: "$libro.generos" },
  { $group: {
    _id: "$libro.generos",
    ingresoTotal: { $sum: { $multiply: ["$items.precioUnitario", "$items.cantidad"] } }
  }},
  { $sort: { ingresoTotal: -1 } }
])

// Usuarios con mayor gasto
db.pedidos.aggregate([
  { $match: { estado: "entregado" } },
  { $group: { _id: "$usuarioId", nombre: { $first: "$usuario.nombre" }, totalGastado: { $sum: "$total" } } },
  { $sort: { totalGastado: -1 } }
])

// Calificación promedio por libro
db.reseñas.aggregate([
  { $group: { _id: "$isbn", promedio: { $avg: "$calificacion" }, total: { $count: {} } } },
  { $sort: { promedio: -1 } }
])

// ═══════════════════════════════════════
// 5. MANTENIMIENTO
// ═══════════════════════════════════════

// Actualizar rating de libros desde reseñas
db.reseñas.aggregate([
  { $group: { _id: "$isbn", nuevoRating: { $avg: "$calificacion" }, total: { $count: {} } } }
]).forEach(r => {
  db.libros.updateOne(
    { isbn: r._id },
    { $set: { rating: Math.round(r.nuevoRating * 10) / 10, reseñasCount: r.total } }
  )
})

// Marcar pedidos pendientes de más de 7 días como retrasados
db.pedidos.updateMany(
  {
    estado: "pendiente",
    fecha: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
  },
  { $set: { estado: "retrasado" } }
)`,
  },
];
