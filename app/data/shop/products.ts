export interface Product {
  slug: string;
  title: string;
  description: string;
  image: string;
  gallery: string[];
  price: number;
  category?: string;
  variants?: { size: string; price: number }[];
}

export const products: Product[] = [
  {
    slug: "SuciaMariposa",
    title: "Sucia Mariposa",
    description: "La belleza se abre camino en los lugares más insospechados.\nCamiseta confeccionada 100% algodón orgánico. 200 g/m², corte unisex. El tejido cuenta con las certificaciones GOTS (Global Organic Textile Standard) y OCS (Organic Content Standard). El producto base está certificado como de comercio justo por la fundación Fair Wear.",
    image: "SHOP/01.SuciaMariposa/IMG_1850.JPG.webp",
    gallery: ["SHOP/01.SuciaMariposa/1.webp","SHOP/01.SuciaMariposa/2.webp", "SHOP/01.SuciaMariposa/3.webp"],
    price: 45.00,
    category: "Clothes",
  },
  {
    slug: "CapPezunas",
    title: "Capitán Pezuñas",
    description: "De pequeño quería ser astronauta. Ahora me conformo con que lo sea mi perrito.\n\nCamiseta confeccionada 100% algodón orgánico. 200 g/m², corte unisex. El tejido cuenta con las certificaciones GOTS (Global Organic Textile Standard) y OCS (Organic Content Standard). El producto base está certificado como de comercio justo por la fundación Fair Wear.",
    image: "SHOP/02.CapPezuñas/IMG_1851.JPG.webp",
    gallery: ["SHOP/02.CapPezuñas/1.webp", "SHOP/02.CapPezuñas/2.webp", "SHOP/02.CapPezuñas/3.webp","SHOP/02.CapPezuñas/4.webp",],
    price: 45.00 ,
    category: "Clothes",
  },
  {
    slug: "Bicicleta",
    title: "Biscicleta",
    description: "Esta era mi bici. Me acompañó en muchas aventuras cuando vivía en Sevilla y en Lisboa. Puede acompañarte a tí también allá dónde vayas. Camiseta confeccionada 100% algodón orgánico. 200 g/m², corte unisex. El tejido cuenta con las certificaciones GOTS (Global Organic Textile Standard) y OCS (Organic Content Standard). El producto base está certificado como de comercio justo por la fundación Fair Wear.",
    image: "SHOP/03.Biscicleta/IMG_1852.JPG.webp",
    gallery: ["SHOP/03.Biscicleta/1.webp","SHOP/03.Biscicleta/2.webp", "SHOP/03.Biscicleta/4.webp"],
    price: 45.00,
    category: "Clothes",
  },
  {
    slug: "Aguas",
    title: "Aguas de Março",
    description: "Esta es una interpretación de la canción Aguas de Março, de Tom Jobim y Elis Regina. Es una canción brasileña que describe la vida misma, a través de una alegre enumeración de elementos que forman parte de ella. Es una pasada, escúchala! :) Camiseta confeccionada 100% algodón orgánico. 200 g/m², corte unisex. El tejido cuenta con las certificaciones GOTS (Global Organic Textile Standard) y OCS (Organic Content Standard). El producto base está certificado como de comercio justo por la fundación Fair Wear.",
    image: "SHOP/04.Aguas/IMG_1853.JPG.webp",
    gallery: ["SHOP/04.Aguas/1.webp", "SHOP/04.Aguas/7.webp", "SHOP/04.Aguas/2.webp", "SHOP/04.Aguas/3.webp","SHOP/04.Aguas/4.webp"],
    price: 45.00,
    category: "Clothes",
  },
  {
    slug: "Fish",
    title: "Fish",
    description: "Esta es un pescao. A veces no hay que darle muchas vueltas. Un pesaco flaquito y psicodélico. Camiseta confeccionada 100% algodón orgánico. 200 g/m², corte unisex. El tejido cuenta con las certificaciones GOTS (Global Organic Textile Standard) y OCS (Organic Content Standard). El producto base está certificado como de comercio justo por la fundación Fair Wear.",
    image: "SHOP/05.Fish/IMG_1854.JPG.webp",
    gallery: ["SHOP/05.Fish/099.webp", "SHOP/05.Fish/2.webp", "SHOP/05.Fish/1.webp"],
    price: 45.00,
    category: "Clothes",
  },
   {
    slug: "DinoSkate",
    title: "Dino Skate",
    description: "Este pequeñajo no se conforma con las limitaciones de su tamaño. Claramente va a romper el skate, pero ve tú y dile algo. Camiseta confeccionada 100% algodón orgánico. 200 g/m², corte unisex. El tejido cuenta con las certificaciones GOTS (Global Organic Textile Standard) y OCS (Organic Content Standard). El producto base está certificado como de comercio justo por la fundación Fair Wear.",
    image: "SHOP/06.Dinoskate/IMG_1855.JPG.webp",
    gallery: ["SHOP/06.Dinoskate/1.webp","SHOP/06.Dinoskate/2.webp", "SHOP/06.Dinoskate/3.webp","SHOP/06.Dinoskate/DINO SKATE 100X70 ou yeah.webp","SHOP/06.Dinoskate/4.webp"],
    price: 45.00,
    category: "Clothes",
  },
   {
    slug: "ManoRoja",
    title: "Mano Roja",
    description: "Esta es mejor que cada uno la interprete como quiera. Que al fin y al cabo, quién más y quién menos, una mano o dos tiene. O no. Camiseta confeccionada 100% algodón orgánico. 200 g/m², corte unisex. El tejido cuenta con las certificaciones GOTS (Global Organic Textile Standard) y OCS (Organic Content Standard). El producto base está certificado como de comercio justo por la fundación Fair Wear.",
    image: "SHOP/07.ManoRoja/IMG_1856.JPG.webp",
    gallery: ["SHOP/07.ManoRoja/2.webp", "SHOP/07.ManoRoja/3.webp","SHOP/07.ManoRoja/1.webp","SHOP/07.ManoRoja/5.webp"],
    price: 45.00,
    category: "Clothes",
  },
   {
    slug: "CorazonSalvaje",
    title: "Corazón Salvaje Bordada",
    description: "El New York Times definió esta sudadera como: -La más wapa ke has visto, Bro.- Un diseño atemporal y un poco hippie. A quién no le va a gustar? Un corazón hecho de plantas del siglo primero? Sudadera bordada bien calentita, suavita y duradera. confeccionada 100% algodón orgánico. 350 g/m², corte unisex. El tejido cuenta con las certificaciones GOTS (Global Organic Textile Standard) y OCS (Organic Content Standard). El producto base está certificado como de comercio justo por la fundación Fair Wear.",
    image: "SHOP/08.CorazonSalvaje/unisex-eco-sweatshirt-french-navy-front-677ebd16633d6.webp",
    gallery: ["SHOP/08.CorazonSalvaje/2.webp", "SHOP/08.CorazonSalvaje/3.webp","SHOP/08.CorazonSalvaje/4.webp","SHOP/08.CorazonSalvaje/unisex-eco-sweatshirt-french-navy-front-677ebd1664291.webp","SHOP/08.CorazonSalvaje/6.webp"],
    price: 79.00,
    category: "Clothes",
  },
  {
    slug: "Titiritero",
    title: "Titiritero",
    description: "Los hilos que nos mueven a todos. ¿Somos realmente dueños de nuestras pasiones?. Sudadera con bastaante guapa, confeccionada 100% algodón orgánico. 350 g/m², corte unisex. El tejido cuenta con las certificaciones GOTS (Global Organic Textile Standard) y OCS (Organic Content Standard). El producto base está certificado como de comercio justo por la fundación Fair Wear.",
    image: "SHOP/09.Titiritero/10. TITIRITERO.webp",
    gallery: ["SHOP/09.Titiritero/2.webp", "SHOP/09.Titiritero/3.webp","SHOP/09.Titiritero/1.webp", "SHOP/09.Titiritero/unisex-essential-eco-hoodie-black-front-677ed80d940aa.webp"],
    price: 79.00,
    category: "Clothes",
  },
  {
    slug: "Yggdrasil",
    title: "Yggdrasil",
    description: "El árbol de la vida. En la mitólogía nórdica, mantiene unidos los 9 mundos que fueron creados por Odín y sus hermanos, que mataron al gigante primigénio Ymir y con sus huesos hiceron montañas, con su sangre ríos y lagos, y con su cráneo la bóveda celeste donde aún vemos pasar sus pensamientos en forma de nubes. Sudadera bastaante guapa, con logo bordado. Confeccionada 100% algodón orgánico. 350 g/m², corte unisex. El tejido cuenta con las certificaciones GOTS (Global Organic Textile Standard) y OCS (Organic Content Standard). El producto base está certificado como de comercio justo por la fundación Fair Wear.",
    image: "SHOP/10.Yggdrasil/11. YDGGRASIL.webp",
    gallery: ["SHOP/10.Yggdrasil/2.webp", "SHOP/10.Yggdrasil/3.webp","SHOP/10.Yggdrasil/4.webp","SHOP/10.Yggdrasil/5.webp","SHOP/10.Yggdrasil/6.webp"],
    price: 50.00,
    category: "Clothes",
  },
  {
    slug: "frioypez",
    title: "Frío Oversize",
    description: "Es mejor sentir frío que no sentir nada. Del frío también se aprende. Camiseta bien guapetona, confeccionada 100% algodón orgánico. 200 g/m², corte Oversize. El tejido cuenta con las certificaciones GOTS (Global Organic Textile Standard) y OCS (Organic Content Standard). El producto base está certificado como de comercio justo por la fundación Fair Wear.",
    image: "SHOP/11.frío y pez/007.webp",
    gallery: ["SHOP/11.frío y pez/2.webp","SHOP/11.frío y pez/4.webp","SHOP/11.frío y pez/5.webp","SHOP/11.frío y pez/6.webp"],
    price: 45.00,
    category: "Clothes",
  },
  {
    slug: "CorazonSalvajeTSHIRT",
    title: "Corazon Salvaje Bordada",
    description: "Diseño atemporal y un poco hippie. A quién no le va a gustar? Un corazón hecho de plantas del siglo primero? Bordadito en tu pecho. Camiseta confeccionada 100% algodón orgánico. 200 g/m², corte unisex. El tejido cuenta con las certificaciones GOTS (Global Organic Textile Standard) y OCS (Organic Content Standard). El producto base está certificado como de comercio justo por la fundación Fair Wear.",
    image: "SHOP/12.CorazonSalvajeTSHIRT/cool.webp",
    gallery: ["SHOP/12.CorazonSalvajeTSHIRT/2.webp","SHOP/12.CorazonSalvajeTSHIRT/3.webp","SHOP/12.CorazonSalvajeTSHIRT/1.webp"],
    price: 45.00,
    category: "Clothes",
  },
  {
    slug: "aguas-de-marco",
    title: "AGUAS DE MARÇO",
    description: "Esta es una interpretación de la canción Aguas de Março, de Tom Jobim y Elis Regina. Es una canción brasileña que describe la vida misma, a través de una alegre enumeración de elementos que forman parte de ella. Es una pasada, escúchala! :) Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/AGUAS DE MARÇO/mod2.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/AGUAS DE MARÇO/chic2.webp",
      "0.SELECCIÓN WEB PRINTS/AGUAS DE MARÇO/floor.jpg",
      "0.SELECCIÓN WEB PRINTS/AGUAS DE MARÇO/6.webp",
      "0.SELECCIÓN WEB PRINTS/AGUAS DE MARÇO/1.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
  {
    slug: "alfama",
    title: "ALFAMA",
    description: "Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/ALFAMA/lecor3.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/ALFAMA/9.webp",
      "0.SELECCIÓN WEB PRINTS/ALFAMA/12.webp",
      "0.SELECCIÓN WEB PRINTS/ALFAMA/casa.webp",
      "0.SELECCIÓN WEB PRINTS/ALFAMA/1.webp",
      "0.SELECCIÓN WEB PRINTS/ALFAMA/7.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
  {
    slug: "capitan-pezunas",
    title: "CAPITÁN PEZUÑAS",
    description: "De pequeño quería ser astronauta. Ahora me conformo con que lo sea mi perrito. Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/CAPITÁN PEZUÑAS/kids2.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/CAPITÁN PEZUÑAS/silla2.webp",
      "0.SELECCIÓN WEB PRINTS/CAPITÁN PEZUÑAS/9.webp",
      "0.SELECCIÓN WEB PRINTS/CAPITÁN PEZUÑAS/frame.webp",
      "0.SELECCIÓN WEB PRINTS/CAPITÁN PEZUÑAS/7.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
  {
    slug: "corazon-salvaje",
    title: "CORAZÓN SALVAJE",
    description: "Un diseño atemporal y un poco hippie. A quién no le va a gustar? Un corazón hecho de plantas del siglo primero? Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/CORAZÓN SALVAJE/bib2.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/CORAZÓN SALVAJE/1.webp",
      "0.SELECCIÓN WEB PRINTS/CORAZÓN SALVAJE/hab2.webp",
      "0.SELECCIÓN WEB PRINTS/CORAZÓN SALVAJE/4.webp",
      "0.SELECCIÓN WEB PRINTS/CORAZÓN SALVAJE/silla2.webp",
      "0.SELECCIÓN WEB PRINTS/CORAZÓN SALVAJE/7.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
  {
    slug: "double-perret",
    title: "DOUBLE PERRET",
    description: "Es un perrete que son dos. Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/DOUBLE PERRET/sala.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/DOUBLE PERRET/1.webp",
      "0.SELECCIÓN WEB PRINTS/DOUBLE PERRET/3.webp",
      "0.SELECCIÓN WEB PRINTS/DOUBLE PERRET/7.webp"
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
  {
    slug: "el-sillon",
    title: "EL SILLÓN",
    description: "Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/EL SILLÓN/silla2.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/EL SILLÓN/lecor.webp",
      "0.SELECCIÓN WEB PRINTS/EL SILLÓN/2.webp",
      "0.SELECCIÓN WEB PRINTS/EL SILLÓN/4.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
  {
    slug: "entrecasas",
    title: "ENTRECASAS",
    description: "Lisboa es todo calle. Todo casa. To bonito. Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/ENTRECASAS/frame.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/ENTRECASAS/silla2.webp",
      "0.SELECCIÓN WEB PRINTS/ENTRECASAS/casa2.webp",
      "0.SELECCIÓN WEB PRINTS/ENTRECASAS/2.webp",
      "0.SELECCIÓN WEB PRINTS/ENTRECASAS/4.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
  {
    slug: "fem",
    title: "FEM",
    description: "Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/FEM/frame.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/FEM/lecor2.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
  {
    slug: "mano-roja",
    title: "MANO ROJA",
    description: "Esta es mejor que cada uno la interprete como quiera. Que, al fin y al cabo, quién más y quién menos una mano o dos tiene. O no. Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/MANO ROJA/4.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/MANO ROJA/hab2.webp",
      "0.SELECCIÓN WEB PRINTS/MANO ROJA/6.webp",
      "0.SELECCIÓN WEB PRINTS/MANO ROJA/1.webp",
      "0.SELECCIÓN WEB PRINTS/MANO ROJA/mesa2.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
   {
    slug: "manojo",
    title: "MANOJO",
    description: "Es un manojo de tetas. Muy primaveral. Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/MANOJO/hab2.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/MANOJO/frame.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
  {
    slug: "midnight-bikez",
    title: "MIDNIGHT BIKEZ",
    description: "A veces, las cosas son a la vez muchas cosas. Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/MIDNIGHT BIKEZ/suelo.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/MIDNIGHT BIKEZ/zoom.webp",
      "0.SELECCIÓN WEB PRINTS/MIDNIGHT BIKEZ/sala.webp",
      "0.SELECCIÓN WEB PRINTS/MIDNIGHT BIKEZ/7.webp",
      "0.SELECCIÓN WEB PRINTS/MIDNIGHT BIKEZ/1.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
  {
    slug: "merida-borracha",
    title: "MÉRIDA BORRACHA",
    description: "Para ir o volver a mi casa, siempre he pasado por este puente. Siempre ha sido el mismo puente pero, a la vez, ha sido muchos puentes diferentes. Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/MÉRIDA BORRACHA/1.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/MÉRIDA BORRACHA/5.webp",
      "0.SELECCIÓN WEB PRINTS/MÉRIDA BORRACHA/sala.webp",
      "0.SELECCIÓN WEB PRINTS/MÉRIDA BORRACHA/8.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
  {
    slug: "sucia-mariposa",
    title: "SUCIA MARIPOSA",
    description: "La belleza se abre camino en los lugares más insospechados. Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/SUCIA MARIPOSA/kids2.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/SUCIA MARIPOSA/frame.webp",
      "0.SELECCIÓN WEB PRINTS/SUCIA MARIPOSA/bib2.webp",
      "0.SELECCIÓN WEB PRINTS/SUCIA MARIPOSA/1.webp",
      "0.SELECCIÓN WEB PRINTS/SUCIA MARIPOSA/3.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
  {
    slug: "tormenta",
    title: "TORMENTA",
    description: "Hygge. Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/TORMENTA/bib4.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/TORMENTA/silla2.webp",
      "0.SELECCIÓN WEB PRINTS/TORMENTA/kids2.webp",
      "0.SELECCIÓN WEB PRINTS/TORMENTA/4.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
   {
    slug: "sweet-nothing",
    title: "SWEET NOTHING",
    description: "Inspirada por la canción de The Veltvet Underground and Nico: Oh!Sweet nuthin'. Impresión de alta resolución en Papel Turner de 300 g/m², texturizado con elevada opacidad y alta resistencia al envejecimiento. Eco-responsable con certificación FSC ™. No incluye marco. Cada lámina está sellada y firmada, el envío se realiza con refuerzo de cartón en el interior o en tubo, según tamaño.",
    image: "0.SELECCIÓN WEB PRINTS/SWEET NOTHING/ca2.webp",
    gallery: [
      "0.SELECCIÓN WEB PRINTS/SWEET NOTHING/suelo.webp",
      "0.SELECCIÓN WEB PRINTS/SWEET NOTHING/swe2.webp",
    ],
    price: 20.00,
    category: "Prints",
    variants: [
      { size: "A4 21x30cm", price: 20.00 },
      { size: "A3 30x40cm", price: 30.00 }
    ],
  },
 
];

