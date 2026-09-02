import { projects, getProjectBySlug } from '../../data/projects';
import CaseStudyPage from '../../views/CaseStudyPage';
import CodeVantumCaseStudyPage from '../../views/CodeVantumCaseStudyPage';

export default function WorkSlugPage({ project, onOpenInquiry }) {
  if (project.slug === 'codevantum') {
    return <CodeVantumCaseStudyPage project={project} onOpenInquiry={onOpenInquiry} />;
  }

  return <CaseStudyPage project={project} onOpenInquiry={onOpenInquiry} />;
}

export async function getStaticPaths() {
  const paths = projects.map((p) => ({
    params: { slug: p.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return { notFound: true };
  }
  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
    },
  };
}
