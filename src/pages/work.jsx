import { projects } from '../data/projects';
import WorkPage from '../views/WorkPage';

export default WorkPage;

export async function getStaticProps() {
  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
    },
  };
}
