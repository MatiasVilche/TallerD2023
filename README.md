# Nombre del Proyecto #
Sistema de apoyo administrativo empresa MiPyme Biosur

## Descripción del proyecto

Este software está dirigido como una solución informática para la pyme Biosur, este busca resolver los problemas de gestión de inventario de la empresa.

## Software stack
El proyecto Sistema de apoyo administrativo empresa MiPyme Biosur es una aplicación web que corre sobre el siguiente software:

- Debian GNU/Linux 11 Bullseye
- Node.js 18.16.0
- Express 4.17.2
- Next.js 13.1.6
- React 11.10.6
- MongoDB 6.0.8

-- Las dependencias del proyecto tanto backend como frontend se encuentran en sus respectivos package.json

## Configuracion de la base de datos
- Para la instalacion y despliegue de la base de datos existente dirigirse a la carpeta MongoDB en la cual encontrara los pasos a seguir para replicar la base de datos de MongoDB Atlas

## Configuraciones de Ejecución para Entorno de Desarrollo/Produccción

- Clonar el repositorio de github
```git clone https://github.com/MatiasVilche/TallerD2023```

### Instalar dependencias del backend
- Entrar en la carpeta de /Backend y ejecutar los siguientes comandos
```
npm install
```

### Ejecución enterno produccion backend
```
npm run final
```

### Instalar dependencias del frontend
- Entrar en la carpeta de /frontend y ejecutar los siguientes comandos
``` 
rm package-lock.json
rm -r node_modules
npm i
```
### Ejecución enterno produccion frontend
#### Crear el build de produccion
```
npm run build
```
#### Iniciar el ambiente de produccion
```
npm run start
```

### Credenciales de Base de Datos y variables de ambiente
#### Backend
- Editar el archivo `.env`, reemplazar los placeholders por la informacion indicada.

#### Frontend
- Editar el archivo `.env`, reemplazar los placeholders por la informacion indicada.

### Docker
Con una terminal moverse al directorio del repositorio clonado,
Una vez dentro de este debe dirigirse al directorio `docker` y moverse a las siguientes 2 carpetas:

### Docker backend
- Entrar la carpeta llamada "Backend"
```bash
docker build -t imagenbackend:latest
```
Una vez construida la imagen, lanzar un contenedor.

```bash
docker run --rm -ti -p 5000:5000
```
### Docker frontend
- Entrar la carpeta llamada "Frontend"
```bash
docker build -t imagenfrontend:latest
```
Una vez construida la imagen, lanzar un contenedor.

```bash
docker run --rm -ti -p 3000:3000
```
### Entrar a la web
Ir a un navegador web y ejecutar la siguiente url: http://IP_FRONTEND:3000

