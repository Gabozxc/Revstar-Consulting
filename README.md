# Revstar-Consulting - Prueba tecnica


# La estructura del proyecto

 La estructura general del proyecto es una aplicación de microservicios que usa Nextjs para el cliente y el control de una API Gateway 
 para comunicarse con el servidor y consumir los recursos necesarios, el servidor corre con Nodejs, usando Prisma como ORM, MongoDB como la base se datos y servicio de nube.

El servidor fue desplegado en heroku y el frontend en vercel.

Mi enfoque general fue en la creacion y consumo del servicio, no me enfoque en el desarrollo UI/EX.

Frontend: https://invoice-front.vercel.app/

Imagen adjunta de la estructura del proyecto:
 
 <img src="./example request.png" />
 
 
 # Arquitectura de la solución elegida
 
 La arquitectura elegida fue una aplicación Restapi, ya que estas no dependen desde que dispositivo se esta consumiendo el servicio, eso facilita el desarrollo de una aplicacion web y mobile.
 
 # Documentacion 
 
 El servicio fue documentado con <a href="./Revstar.postman_collection.json"/>postman</a> donde esta registrada todos los procedimientos y metodos para acceder a los recursos que se necesiten.

 <img src="./postman estructura.PNG" />
