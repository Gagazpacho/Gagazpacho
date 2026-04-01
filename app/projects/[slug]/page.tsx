import { use } from "react";
import { notFound } from "next/navigation";
import { projects } from "../../data/projects";
import ProjectClient from "./ProjectClient"; // Importamos el componente que creamos arriba

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default function ProjectPage({ params }: Props) {
  const { slug } = use(params);
  const project = projects[slug as keyof typeof projects];

  if (!project) return notFound();

  // Lógica de proyectos relacionados (se queda en el servidor, que es más rápido)
  const orderedSlugs = Object.keys(projects);
  const GROUP_SIZE = 6;
  const currentIndex = orderedSlugs.indexOf(slug);
  const currentGroupStart = Math.floor(currentIndex / GROUP_SIZE) * GROUP_SIZE;
  const nextGroupStart = (currentGroupStart + GROUP_SIZE) % orderedSlugs.length;
  const nextGroupSlugs = Array.from({ length: GROUP_SIZE }, (_, i) => {
    return orderedSlugs[(nextGroupStart + i) % orderedSlugs.length];
  });

  const relatedProjects = nextGroupSlugs.map((groupSlug) => {
    const item = projects[groupSlug as keyof typeof projects];
    return {
      src: item.mainImage,
      alt: item.title,
      slug: item.slug,
    };
  });

  return (
    <>
      {/* Pasamos los datos al componente Cliente */}
      <ProjectClient project={project} relatedProjects={relatedProjects} />

      {/* El Footer se puede quedar aquí tranquilamente */}
      <footer className="footer" style={{ marginTop: 0 }}>
        <div className="footer-inner">
          <nav className="footer-nav">
            <a href="/pages/cookies.html">Cookies</a>
            <a href="/pages/privacy-policy.html">Política de privacidad</a>
            <a href="/pages/legal-warning.html">Aviso legal</a>
            <a href="/pages/terms.html">Términos y condiciones</a>
          </nav>
          <div className="footer-meta">
            <p>Desarrollado por: Mateusz Plizga</p>
            <p>© 2026 GAGAGAZPACHO</p>
            <p>pablozunolg@gmail.com / +34 613 190 883</p>
          </div>
        </div>
      </footer>
    </>
  );
}