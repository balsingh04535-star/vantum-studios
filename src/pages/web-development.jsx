import { servicesData } from '../data/servicesData';
import ServiceDetailPage from '../views/ServiceDetailPage';

export default function WebDevPage(props) {
  return <ServiceDetailPage {...props} serviceKey="web-development" />;
}

export async function getStaticProps() {
  const service = servicesData['web-development'];
  return {
    props: { service: JSON.parse(JSON.stringify(service)) },
  };
}
