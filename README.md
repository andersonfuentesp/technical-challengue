# technical-challengue

Servicio que genera una **lista de personas** utilizando la API pública de [randomuser.me](https://randomuser.me).  
La solución sigue una arquitectura **cliente/servicio**: un **back-end** mínimo en Node/Express y un **front-end** de una sola página (HTML + JS).

---

## Tecnologías y criterios

- **Back-end:** Node 18, **Express**, `cors`.  
  Se expone un endpoint propio que consulta RandomUser y **normaliza** los campos de salida.
- **Front-end:** HTML/CSS + **JavaScript** sin framework ni bundler, cumpliendo el requisito de SPA simple.
- **Motivación:** montar rápido una API limpia, reproducible y fácil de revisar.

### Alcance del framework vs. código desarrollado
- **Proporcionado por terceros:** Express (routing) y cors (CORS).
- **Implementación propia:** normalización/mapeo de datos recibidos, validaciones básicas de parámetros, manejo de errores y la interfaz HTML/JS.

---

## Estructura

```
.
technical-challengue/
├─ server/           # back-end (Node/Express)
│  ├─ server.js
│  └─ package.json
├─ web/              # front-end estático
│  ├─ index.html
│  └─ app.js
├─ .gitignore
└─ README.md
```

---

## Puesta en marcha

### 1) API

cd server
npm i
npm run dev
# API en http://localhost:3000

### 2) Front
Desde la raíz del proyecto:

npx http-server web -p 5173 --cors
# Abrir http://localhost:5173


Endpoint disponible
GET /api/users?count=10&gender=male|female&nat=us,gb,es

Parámetros
count → cantidad de registros (por defecto 10; tope 5000)
gender → male | female (opcional)
nat → lista CSV de nacionalidades (opcional), p.ej.: us,gb,es

Ejemplo de respuesta (resumen)

{
  "users": [
    {
      "fullName": "Ms Jane Doe",
      "gender": "female",
      "location": "City, State, Country",
      "email": "jane.doe@example.com",
      "dobISO": "1990-05-01T10:00:00.000Z",
      "photo": "https://randomuser.me/api/portraits/women/1.jpg"
    }
  ],
  "meta": { "count": 10 }
}
