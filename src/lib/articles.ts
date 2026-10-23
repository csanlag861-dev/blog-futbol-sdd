export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  excerpt: string;
  lead: string;
  image: string;
  imageAlt: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
};

export const articles: Article[] = [
  {
    slug: "el-futbol-que-no-sale-en-las-estadisticas",
    title: "El fútbol que no sale en las estadísticas",
    category: "Cultura",
    date: "22 de octubre de 2026",
    readingTime: "5 min de lectura",
    excerpt:
      "Hay gestos que no aparecen en el marcador y, sin embargo, explican por qué un equipo funciona.",
    lead:
      "Una cobertura a tiempo, una voz que ordena o el pase sencillo que deja a otra persona en ventaja: el fútbol también se construye con acciones que casi nunca ocupan un titular.",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Balón de fútbol sobre el césped de un campo",
    sections: [
      {
        heading: "El trabajo invisible",
        paragraphs: [
          "Cuando termina un partido, es fácil recordar el gol, la parada decisiva o la jugada que cambió el resultado. Cuesta más señalar a quien cerró un espacio antes de que el rival pudiera aprovecharlo.",
          "Ese esfuerzo no es menor por ser discreto. A menudo, una buena decisión sin balón prepara la acción que sí queda en la memoria.",
        ],
      },
      {
        heading: "Jugar también es hacer jugar",
        paragraphs: [
          "Un pase de seguridad puede parecer poco ambicioso, pero permite que el equipo respire y vuelva a organizarse. La comunicación entre compañeros cumple una función parecida: reduce dudas y convierte once esfuerzos individuales en una idea común.",
          "Las estadísticas ayudan a describir el partido, aunque no siempre alcanzan a contar la confianza, la paciencia y la lectura compartida que sostienen un buen juego.",
        ],
      },
    ],
  },
  {
    slug: "presionar-juntos-para-recuperar-la-pelota",
    title: "Presionar juntos para recuperar la pelota",
    category: "Táctica",
    date: "18 de octubre de 2026",
    readingTime: "6 min de lectura",
    excerpt:
      "La presión no empieza con una carrera: empieza cuando el equipo decide hacia dónde quiere llevar el juego.",
    lead:
      "Perseguir al rival sin coordinación suele abrir espacios. Una presión eficaz, en cambio, combina señales, distancias y decisiones para recuperar el balón con el equipo preparado.",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Vista amplia de un campo de fútbol iluminado",
    sections: [
      {
        heading: "Una señal para empezar",
        paragraphs: [
          "Un control orientado hacia la banda, un pase comprometido o una recepción de espaldas pueden ser la señal para saltar. Si cada jugador interpreta una señal distinta, el rival encuentra una salida con facilidad.",
          "Por eso, los equipos trabajan referencias comunes. El primer jugador condiciona el pase y los demás ocupan las líneas cercanas antes de que aparezca la siguiente opción.",
        ],
      },
      {
        heading: "La distancia también defiende",
        paragraphs: [
          "Presionar no significa correr todos hacia la pelota. Quienes están detrás deben reducir los espacios entre líneas y estar listos para disputar el pase siguiente.",
          "Cuando el bloque se mueve junto, la presión puede terminar en una recuperación o, al menos, en una posesión rival incómoda. El objetivo no es correr más: es llegar en el momento adecuado.",
        ],
      },
    ],
  },
  {
    slug: "el-barrio-como-primera-cantera",
    title: "El barrio como primera cantera",
    category: "Historias",
    date: "12 de octubre de 2026",
    readingTime: "4 min de lectura",
    excerpt:
      "Antes de las instalaciones perfectas, muchas veces hubo una plaza, unas porterías improvisadas y ganas de jugar.",
    lead:
      "En una pista entre edificios o en un parque de tierra se aprende algo más que a controlar el balón: se aprende a compartir el espacio y a inventar el partido con lo que hay.",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Jugadores disputando un partido de fútbol al aire libre",
    sections: [
      {
        heading: "Reglas que nacen jugando",
        paragraphs: [
          "En el fútbol de barrio, las líneas se dibujan con mochilas y los equipos se forman sobre la marcha. Si el balón se va lejos, alguien lo busca; si falta una persona, se ajustan las reglas.",
          "Esa flexibilidad enseña a negociar, a leer el espacio y a seguir jugando incluso cuando el terreno no es perfecto.",
        ],
      },
      {
        heading: "El juego pertenece a todos",
        paragraphs: [
          "Una cancha cercana puede convertirse en punto de encuentro para generaciones distintas. Allí se comparten consejos, rivalidades amistosas y recuerdos que no dependen de ganar.",
          "Las academias aportan formación y recursos, pero el barrio conserva una lección esencial: el fútbol empieza cuando alguien invita a otra persona a jugar.",
        ],
      },
    ],
  },
  {
    slug: "noventa-minutos-y-una-ciudad",
    title: "Noventa minutos y una ciudad",
    category: "Afición",
    date: "5 de octubre de 2026",
    readingTime: "5 min de lectura",
    excerpt:
      "El día de partido transforma las calles: los colores, las conversaciones y el camino al estadio forman parte del ritual.",
    lead:
      "Para muchas personas, el partido empieza mucho antes del silbato inicial. Empieza al encontrarse con los amigos, cruzar la ciudad y reconocer las camisetas que comparten una misma ilusión.",
    image:
      "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Varios balones de fútbol sobre el césped",
    sections: [
      {
        heading: "El camino también es parte del partido",
        paragraphs: [
          "En el transporte público aparecen bufandas, pronósticos y canciones que alguien empieza a tararear. El recorrido reúne a quienes vienen de distintos barrios y convierte el trayecto en una pequeña celebración compartida.",
          "Cada persona lleva sus propias razones para estar allí, pero durante un rato todas caben en la misma conversación.",
        ],
      },
      {
        heading: "Una memoria compartida",
        paragraphs: [
          "Los estadios guardan más que resultados. También guardan el primer partido de alguien, la costumbre heredada de una familia y la emoción de volver a encontrarse temporada tras temporada.",
          "Quizá por eso un partido puede representar tanto para una ciudad: durante noventa minutos, miles de historias distintas miran hacia el mismo lugar.",
        ],
      },
    ],
  },
];
