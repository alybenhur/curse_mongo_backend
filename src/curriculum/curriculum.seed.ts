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
];
