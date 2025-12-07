# 🥗 Recetas de Maite

> Aplicación web moderna desarrollada en Angular 17+ para la gestión y visualización de recetas de cocina.

![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Este proyecto implementa una arquitectura basada en **Componentes Standalone** y hace uso de las últimas características del framework, como el nuevo **Control Flow** (`@for`, `@if`). Incluye un diseño adaptable (Mobile First) y simulación de backend mediante servicios (Mocks).

---

## 🚀 Funcionalidades Clave

* **Gestión de Recetas:** Visualización de listado de recetas y detalle de las mismas.
* **Filtrado Avanzado:** Búsqueda por texto y filtrado por valoración (estrellas).
* **Arquitectura Standalone:** Sin `NgModules`, reduciendo la complejidad del proyecto.
* **Mock Services:** Simulación de datos y consumo de APIs mediante Observables y JSON estáticos.
* **Diseño Responsive:** Interfaz adaptada a móviles, tablets y escritorio usando Bootstrap 5.
* **Formularios:** Creación y edición de recetas (simulado).

## 🛠️ Tecnologías Utilizadas

* **Framework:** Angular 17+ (CLI versión actual).
* **Lenguaje:** TypeScript.
* **Estilos:** SCSS y Bootstrap 5.
* **Control de Flujo:** Nueva sintaxis de Angular 17 (`@if`, `@for`).

---

## 📦 Instalación y Despliegue

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Requisitos Previos
Asegúrate de tener instalado **Node.js** (v18 LTS o superior) y Angular CLI.

```bash
# Verificar versiones
node -v
npm -v
ng version
```

### 2. Clonar el Repositorio

## 🔗 Github
Primero descarga el proyecto desde github:
https://github.com/MaiteSola/Recetas_angular_MaiteSola.git
Accede al directorio del proyecto:
cd Recetas_angular_MaiteSola


## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

### Node.js
 (versión recomendada: LTS 18 o superior)
Verifica la instalación con:

node -v
npm -v

 
### [Angular.CLI](https://v17.angular.io/cli)

Instalalo globalmente si no lo tienes:
```bash
npm install -g @angular/CLI
```


Verifica la instalación
```bash
ng version
```

## Instalación de dependencias

Dentro del directorio del proyecto, ejecuta:

```bash
npm install
```

Nota: Este comando instalará automáticamente Bootstrap y todas las librerías necesarias listadas en package.json.


## Instalación y configuración de Bootstrap

Este proyecto utiliza Bootstrap para el diseño y la maquetación.
Si deseas confirmar o reinstalar Bootstrap, sigue estos pasos:

### Instalar Bootstrap
1. Ejecuta:
npm install bootstrap

### Verificar la importación
Abre el archivo angular.json y asegúrate de tener las rutas de estilos y scripts configuradas correctamente.
Debe verse algo así:

```JSON
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

⚠️ Si ya aparecen estas rutas, no es necesario volver a instalarlas.

### Reiniciar el servidor

Tras los cambios, ejecuta el servidor nuevamente:
```bash
ng serve
```


### Ejecutar el proyecto

1. Para ejecutar el proyecto en modo desarrollo:
```bash
ng serve
```

2. Luego abre tu navegador en:
http://localhost:4200/

## Estructura del Proyecto

```bash
src/
├── app/
│   ├── card/              # Componente para mostrar una tarjeta individual de receta
│   ├── cards-content/     # Contenedor de múltiples tarjetas de recetas
│   ├── footer/            # Pie de página del sitio
│   ├── form/              # Formulario para agregar o editar recetas
│   ├── models/            # Definición de interfaces o clases de datos (por ejemplo, modelo Receta)
│   ├── navbar/            # Barra de navegación principal
│   ├── services/          # Lógica de negocio y Mock-data (RecetasService)
│   ├── start-rating/      # Lógica de voto (estrellas)
│   ├── vote-modal/        # Componente para votar
│   └── app.component.*    # Componente raíz del proyecto
├── assets/                # Recursos estáticos (imágenes, íconos, etc.)
├── environments/          # Configuraciones de entorno (desarrollo y producción)
├── index.html
├── main.ts
└── styles.css
```


## Descripción de componentes

#### Card	
Componente de presentación (Dumb Component). Recibe los datos de una receta vía @Input y se encarga de mostrar su diseño visual (imagen, título, ingredientes, valoración). Emite eventos al padre para notificar acciones como el borrado.
#### Cards-content	
Componente contenedor (Smart Component). Actúa como el orquestador principal: se conecta al RecetasService para obtener los datos, gestiona el layout responsive (Grid) usando la sintaxis moderna @for, y coordina la comunicación entre el buscador y las tarjetas individuales.
#### Footer	
Componente estático de presentación. Muestra la información de contacto, redes sociales y copyright, implementando un diseño "Sticky Footer" para mantenerse siempre al final de la visualización.
#### Form
Módulo de gestión de datos. Implementa un Formulario Reactivo con validaciones estrictas para crear nuevas recetas. Gestiona la entrada de datos complejos como arrays de ingredientes, previsualización de imágenes y selectores numéricos.
#### Models	
Capa de definición de datos. Contiene las interfaces TypeScript (ej: Receta) que aseguran el tipado fuerte en toda la aplicación, evitando errores de consistencia en el flujo de información.
#### Navbar
Barra de navegación principal y centro de control. Es responsive (menú hamburguesa en móvil) y contiene la lógica de filtrado en tiempo real: tanto el buscador por texto como el filtro por valoración (estrellas). También controla la apertura del modal de creación.

#### Services (RecetasService)
Capa de lógica de negocio y gestión de estado. Centraliza el acceso a los datos (patrón Singleton), permitiendo compartir la información de las recetas entre componentes disconexos (como el Buscador y la Lista). Gestiona la lógica de filtrado y simula la persistencia de datos (Mocking).

#### Star-Rating (app-star-rating)
Componente de interfaz reutilizable (UI Component). Encapsula la lógica visual de las valoraciones (estrellas llenas/vacías) y gestiona la interacción del usuario. Utiliza el patrón @Input/@Output para recibir la puntuación actual y emitir los cambios al componente padre.

#### Vote-Model
Definición de estructura de datos (Interface/Clase). Establece el contrato de tipos para el sistema de votaciones, asegurando que los cálculos de puntuación y el manejo de medias se realicen con seguridad de tipos (Type Safety) en toda la aplicación.
