# Criterios de aceptación — Blog de fútbol

Estos criterios definen las condiciones observables para dar por aceptada la primera versión del blog. Las comprobaciones se aplican al contenido y a las páginas disponibles para los visitantes.

## Panel de administración

1. Al abrir `/admin`, un visitante sin sesión es dirigido al formulario de acceso.
2. El panel permite iniciar sesión con la contraseña configurada y cerrar la sesión.
3. El editor puede crear un artículo con metadatos, imagen y secciones con párrafos, y editar después sus datos.
4. Cada artículo tiene un estado publicado o borrador; únicamente los publicados se muestran en la portada y en sus páginas públicas.
5. Los cambios se conservan en SQLite al reiniciar la aplicación.
6. Las solicitudes de creación o edición sin sesión válida se rechazan.

## Portada

7. Al abrir `/`, el visitante ve el nombre del blog, una breve presentación y una lista de artículos recientes relacionados con el fútbol.
8. Cada artículo de la lista muestra su título, fecha de publicación e imagen, y su enlace abre la página correspondiente en `/articulos/[slug]`.
9. La portada ofrece enlaces visibles y descriptivos a Inicio y Acerca de.

## Artículos

10. Al abrir la dirección de un artículo publicado, se muestran su título, fecha de publicación, imagen y cuerpo del artículo.
11. El cuerpo del artículo está organizado en párrafos y, cuando sea necesario, en subtítulos.
12. Cada artículo tiene una dirección legible y estable basada en su slug, y ofrece un enlace claro para volver a Inicio.
13. Si se abre la dirección de un borrador o un artículo inexistente, se muestra una página de no encontrado con un mensaje comprensible y un enlace a Inicio.

## Acerca de y navegación

14. Al abrir `/acerca-de`, se muestra una descripción breve del blog o de su autor y un enlace para volver a Inicio.
15. Desde Inicio, un artículo, Acerca de y la página de no encontrado, los enlaces disponibles llevan a su destino correcto y permiten volver a la portada cuando corresponda.

## Contenido, idioma y metadatos

16. La interfaz y el contenido editorial inicial están en español; el contenido de ejemplo trata sobre fútbol y ha sido revisado antes de presentarse como contenido publicado.
17. Cada página tiene un título descriptivo en los metadatos del navegador; el título de una página de artículo coincide con el título de ese artículo.

## Experiencia y accesibilidad

18. En vistas de móvil, tableta y escritorio, el contenido y la navegación siguen siendo legibles y utilizables, sin desplazamiento horizontal de la página.
19. Los artículos y la información del sitio presentan una jerarquía de encabezados ordenada y contenido en HTML semántico.
20. Los enlaces y controles disponibles pueden recorrerse y utilizarse mediante teclado, y muestran un indicador de foco visible.
21. Las imágenes informativas tienen texto alternativo que describe su contenido.
