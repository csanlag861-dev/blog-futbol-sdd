# Blog de fútbol

Proyecto para definir y construir un blog editorial de fútbol en español, con una experiencia de lectura clara, navegación sencilla y diseño adaptable a móviles, tabletas y escritorio.

> **Estado:** definición del producto y del MVP. Este repositorio contiene actualmente la documentación del proyecto; la aplicación todavía no está implementada.

## Objetivo

Reunir artículos de fútbol en un espacio ligero y fácil de recorrer. La primera versión prioriza el contenido y permite que los lectores descubran publicaciones recientes, lean cada artículo en su propia página y conozcan brevemente el blog o a su autor.

## Alcance del MVP

- **Inicio:** presentación del blog y listado de artículos recientes con título, fecha e imagen.
- **Artículos:** página individual con URL legible, título, fecha, imagen y texto organizado.
- **Acerca de:** información breve sobre el blog o su autor.
- **Navegación clara:** enlaces entre las secciones y opción para volver a Inicio.
- **No encontrado:** respuesta comprensible para artículos inexistentes, con un enlace a la portada.
- **Diseño adaptable y accesible:** lectura cómoda en distintos tamaños de pantalla, HTML semántico, navegación por teclado y texto alternativo en imágenes informativas.
- **Contenido mantenible:** artículos locales separados de la presentación para facilitar su revisión y sustitución.

## Tecnologías previstas

- [Next.js](https://nextjs.org/) con App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

La primera versión está planteada para utilizar datos locales tipados. SQLite podría considerarse como opción local, pero no es un requisito. No se prevén servicios externos de contenido ni una base de datos remota para el MVP.

## Documentación

- [PRD](./PRD.md): requisitos, alcance y dirección técnica.
- [Briefing](./briefing.md): resumen del objetivo y de la experiencia.
- [Visión del producto](./spec/vision.md): público, propuesta de valor y principios.
- [Alcance](./spec/scope.md): funcionalidades incluidas y excluidas.
- [Criterios de aceptación](./spec/acceptance-criteria.md): condiciones para validar el MVP.

## Fuera del alcance inicial

El MVP no contempla cuentas de usuario, comentarios, buscador, suscripciones, publicación automatizada, panel de administración ni CMS.

## Puesta en marcha

La aplicación aún no está implementada, por lo que este repositorio todavía no incluye instrucciones de instalación o ejecución. Esta sección se actualizará cuando se incorpore el código de la aplicación.