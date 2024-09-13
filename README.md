# Digital Adventure challenge

# Tabla de contenido

- [Digital Adventure challenge](#Digital-Adventure-challenge)
- [Tabla de contenido](#Tabla-de-contenido)
- [Descripción](#Descripción)
- [Requerimientos](#Requerimientos)
  - [Tecnologías y Herramientas](#Tecnologías-y-Herramientas)
- [Uso](#Uso)
  - [Instalaciones basicas](#Instalaciones-basicas)
  - [Environments](#Environments)
- [Alcance](#Alcance)
- [Modulos](#Modulos)
- [Despliegue](#Despliegue)
    


# Descripción
Se realizó el challenge "Captura y Comparte - Una aventura digital".
el cual era diseñar y desarrollar una aplicación React interactiva que invite a los usuarios a embarcarse en una aventura digital, capturando momentos especiales y compartiéndolos con una comunidad.

# Requerimientos

#### Tecnologías y Herramientas

  - <a href="http://nodejs.org" target="_blank">React</a> v18.3.1
  - 
    Se utilizo la lib React como tecnologia para crear interfaces (components)

  - <a href="https://react-hook-form.com/" target="_blank">React hook forms</a> v7.53.0

    Se implemento la libreria react-hook-forms para el manejo de formularios

  - <a href="https://www.npmjs.com/package/react-cookie" target="_blank">React cookie</a> v7.2.0

    Se uso la libreria react-cookie para manipoular y crear cookies

  - <a href="https://reactrouter.com/en/main" target="_blank">React router dom</a>v6.26.2

    Se uso la libreria react-router-dom para controlar todo el ruteo de la app

  - <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a> v5.5.3

    Se uso la libreria typescript como buena practica, obtenemos valor agregado a nuestro desarrollo, evitando errores de codificacion, tipeo y muchas cosas mas que nos da el trabajar con typescript

  - <a href="https://firebase.google.com/?hl=es-419" target="_blank">Firebase</a> v10.13.1

    Se utilizo firebase como backend as service, se implemento los servicios de Authentication, Cloud storage y Firestore Database para el alcance final del challenge

  - <a href="https://sass-lang.com/" target="_blank">Sass</a> v1.78.0

    Se uso Sass como framework css mas un enfoque BEM para mejorar la legibilidad y manetibilidad del codigo

  - <a href="https://zustand-demo.pmnd.rs/" target="_blank">Zustand</a> v4.5.5

    Se implemento la libreria zustand para el manejo de estado de la app

  - <a href="https://sonner.emilkowal.ski" target="_blank">Sonner</a> v1.5.0

    Se utilizo la libreria sonner para la implementacion de toast (notificaciones de acciones) 

# Uso

#### Instalaciones basicas

Instalar dependecias necesarias

```bash
yarn install
```

```bash
npm install
```

Modo Desarrollo

```bash
yarn dev
```

```bash
npm run dev
```

Modo Producción

```bash
yarn build
```

```bash
npm run build
```
### Environments

#### Firebase
Estas son las env utilizadas para el challenge, todas provienen de Firebase, que es el proveedor que se implemento, la env `VITE_FOLDER_BUCKET_FB` pertenece a al folder donde se guardaran las fotos dentro del bucket de FB y `VITE_STORAGE_PHOTO_FB` es el nombre de la colección que creamos para las fotos

`VITE_API_KEY`

`VITE_AUTHDOMAIN`

`VITE_PROJECTID`

`VITE_STORAGEBUCKET`

`VITE_MESSAGINSENDERID`

`VITE_APPID`

`VITE_BUCKET_FB`

`VITE_FOLDER_BUCKET_FB`

`VITE_STORAGE_PHOTO_FB`


## Alcance
Se realizo el challenge generando una wep-app responsive, con 5 modulos, los cuales son: Onboarding, Auth, Home (Gallery), Upload Photo, Take Photo

## Modulos

#### Onboarding
  
  Modulo inicial, en el cual cuenta con dos botones,

  - "Ver", nos dejara entrar como un usuario provisional la galeria de photos, pero no podremos
    interactuar ni entrar a ninguna seccion, nos mostrara un modal indicando que debemos autenticarinos y un boton para ir al modulo de Auth

  - Ingresar, este boton solo nos llevara al modulo de Auth

#### Auth
  
  En este modulo encontraremos un formulario, con un boton para iniciar sesion con nuestra cuenta de google o podemos iniciar sesion con un correo y contraseña, cualquier accion que realicemos, nos dejara en el modulo de Home (Gallery), en la parte inferior encontraremos un enlace para indicarnos si queremos registrarnos o ingresar(login)

#### Home (Gallery)

  Este modulo es el modulo principal, donde estaran las fotos que subamos o tomemos con los modulos de Upload y Take photo.
  
  ##### Components 
  Menu superior 
  
  donde podremos redirigirnos a diferentes secciones/modulos, como son Upload Photo, Home(Gallery) y un action para cerrar sesion, el cual nos preguntara si estamos seguros,

  ##### Gallery 
  
  cards con las fotos, seccion de acciones me gusta y compartir, este ultimo esta en desarrollo

#### Upload photo

  En el modulo de upload, podremos subir fotos y estas apreceran de inmediato en el Home(Gallery)

#### Take photo

  Este modulo es el encargado de tomar las fotos con las camaras de los dispositivos, en algunos dispositivos o navegadores como safari puede solicitar permisos, si presenta algun inconveniente, asegurese de tener activado los permisos de camara


## Despliegue
#### Vercel
  Utilizamos este provedor como solución sencilla y rapida para desplegar nuestras apps

