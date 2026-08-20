import { servicesData } from '../data/servicesData';
import ServiceDetailPage from '../views/ServiceDetailPage';

export default function WebDesignPage(props) {
  return <ServiceDetailPage {...props} serviceKey="web-design" />;
}

export async function getStaticProps() {
  const service = servicesData['web-design'];
  return {
    props: { service: JSON.parse(JSON.stringify(service)) },
  };
}
