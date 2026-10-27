# Alcance del producto — Blog de fútbol

## Objetivo del alcance

Definir las funcionalidades, el contenido y las restricciones de la primera versión del blog. El MVP debe permitir descubrir y leer artículos de fútbol en español mediante una experiencia clara, adaptable y sencilla de mantener.

## Incluido en la primera versión

### Portada

- Mostrar el nombre del blog y una presentación breve.
- Presentar una lista de artículos recientes.
- Mostrar como mínimo el título y la fecha de publicación de cada artículo y la imagen.
- Enlazar cada artículo a su página individual.
- Ofrecer navegación visible a Inicio y Acerca de.

### Artículos

- Proporcionar una página y una dirección legible y estable para cada artículo.
- Mostrar título, fecha de publicación y cuerpo del artículo.
- Organizar el cuerpo en párrafos y, cuando corresponda, subtítulos.
- Admitir una imagen.
- Incluir una forma clara de volver a la portada.
- Para una dirección inexistente, mostrar una página de no encontrado comprensible con un enlace al inicio.

### Acerca de

- Presentar una descripción breve del blog o de su autor.
- Ser accesible desde la navegación principal y permitir volver a Inicio.

### Contenido editorial

- Incluir artículos iniciales de ejemplo relacionados con el fútbol.
- Mantener los datos separados de la presentación visual para que se puedan revisar y sustituir sin rehacer las páginas.
- No presentar contenido de ejemplo pendiente de revisión como contenido editorial definitivo.
- Permitir al editor crear y editar artículos desde un panel privado en `/admin`.
- Guardar artículos y su estado de publicación en SQLite local.
- Mostrar en el blog únicamente los artículos publicados y conservar los borradores en el panel.
- Permitir organizar el cuerpo del artículo en secciones con subtítulos y párrafos.
- Proteger el panel y sus operaciones de escritura con una contraseña configurada mediante una variable de entorno.
- Proporcionar una API REST mediante Route Handlers del App Router: listar artículos publicados (`GET /api/articulos/`), consultar un artículo publicado por slug (`GET /api/articulos/[slug]/`) y crear borradores autenticados con Bearer token (`POST /api/articulos/`).
- Reutilizar el contrato `Article`, la validación y la base SQLite del proyecto. El token de API se configura como `API_TOKEN` solo en el servidor y es independiente de la sesión del panel. La API pública no expone borradores y el cliente no puede publicar artículos mediante el POST.

### Experiencia y calidad

- Adaptar contenido y navegación a móvil, tableta y escritorio sin desplazamiento horizontal.
- Mantener jerarquía visual clara, tipografía cómoda y contraste suficiente.
- Usar enlaces descriptivos, HTML semántico, encabezados ordenados y controles navegables mediante teclado.
- Proporcionar texto alternativo para imágenes informativas.
- Presentar la interfaz y el contenido inicial en español.
- Asignar títulos descriptivos a las páginas y reflejar el título del artículo en los metadatos de su página.
- Priorizar páginas ligeras y de carga rápida, evitando dependencias y elementos innecesarios.

## Fuera del alcance

- Registro, cuentas, perfiles de usuario y permisos por rol.
- Comentarios, interacción social o moderación.
- Búsqueda o filtrado de artículos.
- Suscripciones, newsletter o notificaciones.
- Publicación automatizada.
- CMS o integración con servicios externos de contenido.
- Despliegue en almacenamiento efímero sin una base de datos persistente.

## Supuestos y decisiones pendientes

- El contenido inicial será editorial de ejemplo, revisable y reemplazable.
- El nombre definitivo, la identidad visual, el autor y la frecuencia de publicación se concretarán al preparar el contenido real.
- El entorno y la estrategia de despliegue se definirán cuando se conozca el destino de publicación.
- El editor del sitio es la única persona administradora; no se necesitan perfiles de usuario.
- El despliegue debe ofrecer almacenamiento persistente para el archivo SQLite.