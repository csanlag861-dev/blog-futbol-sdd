# PRD — Blog de fútbol

## 1. Resumen del producto

Crear un blog de fútbol sencillo, en español y adaptable a móviles, tabletas y escritorio. El sitio permitirá a los visitantes leer los artículos más recientes, abrir cada publicación en una página propia y consultar información breve sobre el blog o su autor.

La primera versión se centrará en ofrecer una experiencia de lectura clara y navegación directa, junto con un panel privado para que el editor gestione artículos.

## 2. Objetivos

- Publicar y presentar artículos de fútbol de forma ordenada.
- Permitir al editor crear y actualizar artículos y decidir si están publicados.
- Permitir que los lectores encuentren y abran fácilmente las publicaciones recientes.
- Proporcionar una lectura cómoda en distintos tamaños de pantalla.
- Mantener el contenido inicial de ejemplo fácil de revisar y reemplazar.

### No objetivos

- Crear una plataforma de publicación automatizada o un CMS.
- Permitir que los visitantes creen cuentas, comenten o interactúen con los artículos.
- Incorporar buscador, suscripciones o funciones sociales.

## 3. Usuarios

- **Visitante/lector:** persona interesada en el fútbol que llega al blog para descubrir y leer artículos. Debe poder entender la navegación sin instrucciones y volver fácilmente a la portada.
- **Editor del sitio:** persona responsable de añadir y actualizar los artículos y la presentación del autor.

## 4. Alcance funcional

### 4.1 Inicio

- Mostrar el nombre del blog y una presentación breve.
- Mostrar una lista de artículos recientes.
- Para cada artículo, presentar como mínimo el título y la fecha de publicación, incluye una imagen.
- Hacer que el título o el elemento de cada artículo enlace a su página individual.
- Incluir navegación visible hacia Inicio y Acerca de.

### 4.2 Artículos

- Cada artículo tendrá una página propia y una dirección legible y estable.
- Mostrar título, fecha de publicación y cuerpo del artículo.
- Organizar el texto en párrafos y, cuando sea necesario, subtítulos.
- Permitir incluir una imagen.
- Ofrecer un enlace claro para volver a la portada.
- Si se solicita una dirección de artículo que no existe, mostrar una página de no encontrado comprensible y un enlace para volver al inicio.

### 4.3 Acerca de

- Presentar una descripción breve del blog o de su autor.
- Ser accesible desde la navegación principal y permitir volver a Inicio.

### 4.4 Contenido inicial

- Incluir artículos de ejemplo relacionados con el fútbol.
- Mantener el contenido separado de la presentación visual para que pueda revisarse y sustituirse sin rehacer las páginas.
- No publicar texto de ejemplo pendiente de revisión como si fuera contenido definitivo.

### 4.5 Páginas del sitio

- **Inicio (`/`):** presenta el blog, muestra los artículos recientes y permite acceder a cada publicación y a la página Acerca de.
- **Artículo (`/articulos/[slug]`):** muestra una publicación individual identificada por una dirección legible y estable. Si el artículo no existe, muestra la página de no encontrado.
- **Acerca de (`/acerca-de`):** presenta información breve sobre el blog o su autor y ofrece una forma de volver a Inicio.
- **No encontrado:** página para direcciones de artículos inexistentes, con un mensaje comprensible y un enlace a Inicio.

## 5. Requisitos no funcionales

- **Diseño adaptable:** el contenido y la navegación deben funcionar en móviles, tabletas y escritorio, sin desplazamiento horizontal de la página.
- **Legibilidad:** usar jerarquía visual clara, tipografía cómoda y contraste suficiente.
- **Usabilidad:** navegación sencilla y enlaces identificables, con nombres descriptivos.
- **Idioma:** interfaz y contenido inicial en español.
- **Rendimiento:** priorizar páginas ligeras y carga rápida; evitar dependencias y elementos innecesarios.
- **Accesibilidad básica:** usar HTML semántico, estructura ordenada de encabezados, texto alternativo para imágenes informativas y controles navegables mediante teclado.
- **Metadatos:** cada página debe tener un título descriptivo; los artículos deben reflejar su título en los metadatos de la página.

## 6. Dirección técnica

- Construir el sitio con **Next.js** y **TypeScript**.
- Usar el **App Router** de Next.js para la portada, la página informativa y las rutas individuales de artículos.
- Usar la biblioteca de componentes **shadcn/ui** para construir la interfaz, manteniendo los componentes y estilos consistentes con el proyecto.
- Hacer uso de TailwindCSS para los estilos, ya que si usamos shadcn será obligatorio por si queremos cambiar los componentes de dicha biblioteca.
- Guardar los artículos en SQLite local, incluyendo su estado de publicación, e inicializar la base de datos con los artículos de ejemplo.
- Proteger el panel de administración con una contraseña configurada en una variable de entorno; no se incluyen cuentas ni perfiles de usuario.
- Renderizar las páginas en el servidor siempre que sea apropiado para mantener una experiencia rápida y contenido indexable.
- Mantener la solución sencilla y evitar añadir paquetes innecesarios.

## 7. Criterios de aceptación

1. La portada muestra el nombre y la presentación del blog, así como artículos recientes.
2. Cada artículo visible desde la portada abre su propia página.
3. Las páginas de artículo muestran título, fecha y contenido organizado, y una imagen.
4. La navegación permite llegar a Inicio y Acerca de, y regresar desde las páginas secundarias.
5. Una ruta de artículo inexistente muestra una respuesta de no encontrado con una vía de regreso.
6. El diseño se adapta a móvil, tableta y escritorio, conserva la legibilidad y no requiere desplazamiento horizontal.
7. El editor puede crear y editar artículos desde `/admin`, añadir secciones y guardar los cambios en SQLite.
8. El editor puede marcar cada artículo como publicado o borrador; solo los publicados aparecen en la portada y en sus páginas públicas.
9. El panel solicita la contraseña configurada y rechaza las operaciones de escritura sin una sesión válida.
10. La interfaz se presenta en español y las páginas tienen títulos descriptivos.

## 8. Fuera del alcance de la primera versión

- Registro, perfiles de usuario y permisos por rol.
- Comentarios y moderación.
- Búsqueda o filtrado de artículos.
- Suscripciones, newsletter o notificaciones.
- Publicación automatizada y CMS externo.
- Bases de datos remotas o integración con servicios externos de contenido.

## 9. Supuestos y decisiones pendientes

- El blog comenzará con contenido editorial de ejemplo revisable y reemplazable.
- La frecuencia de publicación, identidad visual definitiva, nombre del blog y autor se definirán al preparar el contenido real.
- El panel usa SQLite local; el entorno de producción debe ofrecer almacenamiento persistente o sustituir SQLite por una base de datos persistente.