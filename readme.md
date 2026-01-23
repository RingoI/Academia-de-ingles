# Academy – Plataforma de Academia de Inglés

## Descripción
Backend desarrollado en Java con Spring Boot para la gestión de una academia de inglés.
Incluye manejo de usuarios (Administrador, Docente, Alumno), autenticación con JWT y
gestión de cursos, niveles y clases.

---

## Tecnologías
- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security
- PostgreSQL
- JWT (HS512)
- Maven

---

## Configuración del entorno

### Base de datos
- PostgreSQL
- Crear una base llamada `Academy`
- Configurar credenciales en `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/Academy
spring.datasource.username=postgres
spring.datasource.password=admin123



Creación del administrador manualmente, ya que solamente es una persona
Se creo una clase exclusivamente para hashear una contraseña, luego se borro
INSERT INTO persona (username, password, nombre, email, DTYPE)
VALUES ('admin', '<HASH>', 'Administrador', 'admin@academy.com', 'ADMIN');


Authenticación basada en Authorization: Bearer <token>

Creacion de nivel mediante pgadmin, la administradora nos dijo que son solamente 6 niveles, totalmente innecesario
crear endpoints para hacerlos, mas practico y rapido.

Borrado logico, totalmente recomendable para estos tipos de proyectos.


ELiminación del admin por el pgadmin, muchos problemas de permisos y roles, creación cuando se inicialice la aplicación.
