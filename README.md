# Refactorización con Principios SOLID

## Cómo ejecutar

```
npm install
npm run dev
```

---

## Ramas

- feature/01-srp — Responsabilidad Única (SRP)
- feature/02-ocp — Abierto/Cerrado (OCP)
- feature/03-lsp — Sustitución de Liskov (LSP)
- feature/04-isp — Segregación de Interfaces (ISP)
- feature/05-dip — Inversión de Dependencias (DIP)

---

## 📓 Bitácora de Reflexión

### 1 — Responsabilidad Única (SRP)

**Antes del cambio:**

La clase ProductBloc hacía demasiadas cosas al mismo tiempo. Se encargaba de cargar productos, guardarlos en la base de datos y también enviar correos a los clientes. Esto provocaba que cualquier cambio relacionado con el inventario, la base de datos o las notificaciones obligara a modificar la misma clase.

**Después del cambio:**

Se separaron las responsabilidades creando clases específicas para cada tarea. ProductService quedó encargado del manejo de productos y Mailer únicamente del envío de correos. Por su parte, ProductBloc solamente coordina el proceso utilizando estos servicios.

¿Qué pasaría si mañana decidimos notificar por WhatsApp en lugar de Email? ¿Cuántas clases tendrías que modificar ahora vs. antes?

Si mañana se decide enviar notificaciones por WhatsApp, ya no sería necesario modificar ProductBloc. Bastaría con crear una nueva clase encargada de las notificaciones por WhatsApp e integrarla al sistema. Antes, en cambio, habría que abrir ProductBloc y modificarlo, arriesgando romper la lógica del inventario al mismo tiempo. Esto reduce considerablemente el riesgo de introducir errores.

---

### 2 — Abierto/Cerrado (OCP)

**Antes del cambio:**

Los servicios utilizaban directamente la librería axios para realizar peticiones HTTP. Esto generaba una dependencia fuerte con dicha herramienta y cualquier cambio implicaba modificar varias partes del proyecto.

**Después del cambio:**

Se creó una interfaz llamada IHttpClient y los servicios ahora trabajan con esa abstracción. De esta forma se pueden utilizar diferentes implementaciones, como AxiosAdapter o FetchAdapter, sin alterar la lógica de los servicios.

Si se detecta una vulnerabilidad en axios y debes migrar a fetch en minutos, ¿qué tan rápido lo harías con este diseño?

Con este diseño el cambio sería casi inmediato. Solo habría que reemplazar el adaptador utilizado por FetchAdapter sin tocar el código de ningún servicio. Antes, en cambio, habría que buscar y modificar cada llamada a axios en todo el proyecto, lo que podría tomar horas y generar errores en múltiples archivos.

---

### 3 — Sustitución de Liskov (LSP)

**Antes del cambio:**

El administrador de vehículos utilizaba varios bloques if para identificar cada tipo de vehículo. Cada vez que se agregaba uno nuevo era necesario modificar el código existente para que pudiera reconocerlo.

**Después del cambio:**

Todos los vehículos implementan la interfaz IVehicle, la cual define el método getDetails(). Gracias a esto, el administrador puede trabajar con cualquier vehículo sin importar su tipo específico y sin usar instanceof.

Si la reserva adquiere un "Dron", ¿podría tu manager procesarlo sin añadir nuevos if/else?

Sí. Al implementar IVehicle con su propio getDetails(), el administrador lo procesaría automáticamente sin necesidad de agregar ninguna condición nueva. Esto quedó demostrado directamente en el código, donde el Dron fue agregado al array de la flota y el manager lo manejó sin ninguna modificación.

---

### 4 — Segregación de Interfaces (ISP)

**Antes del cambio:**

La interfaz de aves obligaba a todas las clases a implementar métodos para comer, volar y nadar, incluso cuando algunas aves no podían realizar esas acciones. Como consecuencia, existían métodos que únicamente lanzaban errores durante la ejecución.

**Después del cambio:**

La interfaz original se dividió en interfaces más pequeñas y específicas. Ahora cada ave implementa únicamente las capacidades que realmente posee, como volar, nadar o alimentarse.

¿Cómo evita tu diseño que un "Pingüino" tenga un método fly() que lance errores?

Con este diseño el Pingüino simplemente no tiene el método fly(). Al implementar solo IEatable e ISwimmable, ese método no existe en su tipo. Si alguien intentara llamarlo, el error aparecería en tiempo de compilación, no durante la ejecución. El sistema es correcto por diseño, no por manejo de excepciones.

---

### 5 — Inversión de Dependencias (DIP)

**Antes del cambio:**

PostService creaba directamente una instancia de LocalDatabaseService, por lo que dependía completamente de esa implementación específica. Esto dificultaba los cambios y complicaba la realización de pruebas sin levantar una base de datos real.

**Después del cambio:**

Se creó la interfaz IDatabaseProvider y ahora PostService recibe cualquier implementación que cumpla ese contrato a través del constructor. De esta manera puede trabajar con diferentes fuentes de datos sin necesidad de modificarse.

¿Qué tan fácil es inyectar un "MockDatabase" para pruebas unitarias ahora?

Es muy sencillo. Basta con crear una instancia de MockDatabaseService y pasarla al constructor de PostService. No se necesita configurar ninguna base de datos real ni conexión de red. Las pruebas son rápidas, controladas y predecibles, algo que antes era completamente imposible sin modificar el código fuente del servicio.