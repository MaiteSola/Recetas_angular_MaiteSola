
# Recetas

Aplicación desarrollada en Angular para la gestión y visualización de recetas de cocina.
Incluye un diseño limpio y adaptable con Bootstrap, y una estructura modular para facilitar el mantenimiento y escalabilidad del proyecto.




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
npm install -g @angular/CLI

Verifica la instalación
ng version

## Instalación de dependencias

Dentro del directorio del proyecto, ejecuta:

npm install

Esto descargará todas las dependencias necesarias indicadas en el archivo package.json.


## Instalación y configuración de Bootstrap

Este proyecto utiliza Bootstrap para el diseño y la maquetación.
Si deseas confirmar o reinstalar Bootstrap, sigue estos pasos:

### Instalar Bootstrap
1. Ejecuta:
npm install bootstrap

### Verificar la importación
Abre el archivo angular.json y asegúrate de tener las rutas de estilos y scripts configuradas correctamente.
Debe verse algo así:

"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
⚠️ Si ya aparecen estas rutas, no es necesario volver a instalarlas.

### Reiniciar el servidor

Tras los cambios, ejecuta el servidor nuevamente:
ng serve


### Ejecutar el proyecto

1. Para ejecutar el proyecto en modo desarrollo:
ng serve

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
│   └── app.component.*    # Componente raíz del proyecto
├── assets/                # Recursos estáticos (imágenes, íconos, etc.)
├── environments/          # Configuraciones de entorno (desarrollo y producción)
├── index.html
├── main.ts
└── styles.css
```



## Descripción de componentes


#### Card	
Muestra la información de una receta individual (imagen, título, descripción, etc.).
#### Cards-content	
Renderiza un conjunto de tarjetas (card) en formato grid o listado.
#### Footer	
Contiene el pie de página del sitio con créditos o enlaces.
#### Form
Permite agregar, editar o eliminar recetas mediante un formulario reactivo.
#### Models	
Define las interfaces y clases utilizadas en la aplicación (por ejemplo, Receta).
#### Navbar
Barra superior de navegación con enlaces o botones para moverse entre secciones.
