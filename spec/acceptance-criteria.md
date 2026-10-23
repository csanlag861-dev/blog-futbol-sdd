# Criterios de aceptación — Blog de fútbol

Estos criterios definen las condiciones observables para dar por aceptada la primera versión del blog. Las comprobaciones se aplican al contenido y a las páginas disponibles para los visitantes.

## Portada

1. Al abrir `/`, el visitante ve el nombre del blog, una breve presentación y una lista de artículos recientes relacionados con el fútbol.
2. Cada artículo de la lista muestra su título, fecha de publicación e imagen, y su enlace abre la página correspondiente en `/articulos/[slug]`.
3. La portada ofrece enlaces visibles y descriptivos a Inicio y Acerca de.

## Artículos

4. Al abrir la dirección de un artículo existente, se muestran su título, fecha de publicación, imagen y cuerpo del artículo.
5. El cuerpo del artículo está organizado en párrafos y, cuando sea necesario, en subtítulos.
6. Cada artículo tiene una dirección legible y estable basada en su slug, y ofrece un enlace claro para volver a Inicio.
7. Si se abre una dirección de artículo inexistente, se muestra una página de no encontrado con un mensaje comprensible y un enlace a Inicio.

## Acerca de y navegación

8. Al abrir `/acerca-de`, se muestra una descripción breve del blog o de su autor y un enlace para volver a Inicio.
9. Desde Inicio, un artículo, Acerca de y la página de no encontrado, los enlaces disponibles llevan a su destino correcto y permiten volver a la portada cuando corresponda.

## Contenido, idioma y metadatos

10. La interfaz y el contenido editorial inicial están en español; el contenido de ejemplo trata sobre fútbol y ha sido revisado antes de presentarse como contenido publicado.
11. El contenido de los artículos puede sustituirse en la fuente local de datos, sin modificar la estructura de las páginas. SQLite puede utilizarse como opción local, pero no es un requisito de aceptación.
12. Cada página tiene un título descriptivo en los metadatos del navegador; el título de una página de artículo coincide con el título de ese artículo.

## Experiencia y accesibilidad

13. En vistas de móvil, tableta y escritorio, el contenido y la navegación siguen siendo legibles y utilizables, sin desplazamiento horizontal de la página.
14. Los artículos y la información del sitio presentan una jerarquía de encabezados ordenada y contenido en HTML semántico.
15. Los enlaces y controles disponibles pueden recorrerse y utilizarse mediante teclado, y muestran un indicador de foco visible.
16. Las imágenes informativas tienen texto alternativo que describe su contenido.
