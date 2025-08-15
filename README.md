# Technical-Test-COTO-FrontEnd

Este proyecto es una **aplicación frontend desarrollada con Angular versión 19.0.6** como parte de un **ejercicio técnico**. Su objetivo es consumir y visualizar información proveniente de una **API desarrollada en .NET 8**, también realizada como parte del mismo ejercicio técnico.

La aplicación se conecta a la API, mostrando datos estructurados a través de una interfaz web construida con Angular Material, con estilos personalizados y uso de servicios HTTP.

## Tecnologías utilizadas

- **Angular 19**
- **TypeScript**
- **Angular Material**
- **RxJS**
- **SCSS**
- **REST API Integration**

## Requisitos previos

Antes de comenzar, asegurate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión recomendada: 18.x o superior)
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`
- [Git](https://git-scm.com/)

## Configuración del entorno

El proyecto utiliza un archivo de configuración para definir la URL base de la API. Asegurate de configurar correctamente el archivo `src/environments/environment.ts` antes de iniciar el servidor:

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:7094/api'
};
```

Para producción, también deberías configurar `src/environments/environment.prod.ts` con los valores correspondientes.

---

## Levantar el servidor de desarrollo

Para iniciar el servidor local, ejecutá:

```bash
npm install
ng serve
```

Luego, abrí tu navegador y accedé a `http://localhost:4200/`. La aplicación se recargará automáticamente si modificás cualquier archivo fuente.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   └── features/
├── assets/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── index.html
```
