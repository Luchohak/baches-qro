 Proceso de réplica
A continuación se detallan los pasos para replicar y poder correr el proyecto en localhost, accediendo a la base de datos montada en Heroku. Para todo esto se asume que el desarrollador tiene NodeJS instalado en conjunto con el instalador de paquetes ‘npm’


El primer paso es clonar (con el comando: ‘git clone https://github.com/Luchohak/baches-qro.git’ o descargar el repositorio que contiene el diseño de GitHub

Descargar el repositorio del servidor o clonarlo con el siguiente comando: ‘git clone https://github.com/Luchohak/pothole-server.git’

Ingresar al directorio del proyecto (ej. ‘cd Desktop/baches-qro/’)

Proceder a descargar e instalar todas las dependencias con los comandos de la tabla de dependencias (o correr 'npm install'), cabe mencionar que sólo son necesarias las que se usan en User Interface

Ejecutar el comando ‘npm start’ 

Abrir otra ventana de la terminal e ingresar al directorio del servidor 

Instalar las dependencias del servidor de la Tabla de dependencias (o correr 'npm install')

Instalar nodemon (‘npm install --save nodemon’).

Correr el comando: ‘nodemon server/server’ lo cual inicializará el servidor localmente


Tabla de dependencias
Nombre
Descripción
Servidor/UI
Comando

axios
Librería de Javascript para hacer peticiones y recibir respuestas del servidor
Servidor y User Interface
npm install --save axios

react
Contiene las funciones básicas que realizan los componentes de React, así como la creación de clases
User Interface
npm init react-app ‘app-name’

google-maps-react
Contiene los componentes necesarios para hacer uso de la API de Google Maps cómo Map y Marker 
User Interface
npm install --save google-maps-react

firebase
Hace mucho más fácil la tarea de conectar la aplicación con la base de datos de Firebase
Servidor
npm install --save firebase

react-router-dom
Contiene los componentes necesarios para implementar la navegación entre las vistas de la aplicación como Router, Switch y Link
User Interface
npm install --save react-router-dom 

mongoose
Similar al paquete de firebase, contiene los métodos necesarios para establecer una conexión entre la aplicación y la base de datos de Mongo, así como todo lo necesario para crear los modelos (schemas) de los datos con los que se va a trabajar
Servidor
npm install --save mongoose

express
Este paquete trabaja en conjunto con ‘body-parser’ y ‘cors para asegurar que toda la información respecto a las peticiones sea enviada en el formato json por lo que estos paquetes también se encargan de las validaciones y la conexión del Front con el Back 
User Interface
npm install --save express

body-parser
Servidor
npm install --save body-parser

cors
Servidor
npm install --save cors 

bootstrap
Librería altamente conocida utilizada para crear una interfaz de usuario amigable y responsiva
User Interface
npm install --save bootstrap 4.0.0
