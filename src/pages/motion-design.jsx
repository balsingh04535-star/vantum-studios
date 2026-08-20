import { servicesData } from '../data/servicesData';
import ServiceDetailPage from '../views/ServiceDetailPage';

export default function MotionDesignPage(props) {
  return <ServiceDetailPage {...props} serviceKey="motion-design" />;
}

export async function getStaticProps() {
  const service = servicesData['motion-design'];
  return {
    props: { service: JSON.parse(JSON.stringify(service)) },
  };
}
