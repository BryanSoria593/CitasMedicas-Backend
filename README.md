# CitasMédicas API

## Introducción

Este es la API para la aplicación de CitasMédicas creada con NodeJS y express, con una base de datos en MYSQL. Para poder ejecutarla, tome en cuenta las siguientes características.

## Requerimientos principales

- Node > 14
- npm
- express 4.18.1

## Instalación

Para instalar las dependencias necesarias, ejecute los siguientes comandos:

```bash
npm install
```
## Configuración`
Crear un archivo llamado .env con las siguientes propiedades:


HOST_DB= host de la base de datos\
PORT_DB= puerto de conexión a la DB\
USER_DB= usuario DB\
DATABASE= nombre DB\
PASSWORD_DB= contraseña DB\
SECRET_JWT_SEED= your_jwt_secret\
PORT_APP= puerto\
EMAIL= correo encargado de enviar mensajes automatizados\
PASSWORD_EMAIL= contraseña de correo, no debe activar la A2F
URL_FRONTEND= Dirección del frontend, debe incluir el puerto si es necesario, ejemplo: http://localhost:3000

## Ejecución

Para ejecutar la aplicación, tenga en cuenta los siguientes comandos:


Este comando ejecutará la aplicación en modo de desarrollo, lo que significa que se reiniciará cada vez que se realice un cambio en el código.
```bash
npm run dev
```

Este comando ejecutará la aplicación en modo de producción, lo que significa que no se reiniciará cada vez que se realice un cambio en el código.
```bash
npm start
```


