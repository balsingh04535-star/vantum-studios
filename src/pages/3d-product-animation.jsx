import { servicesData } from '../data/servicesData';
import ServiceDetailPage from '../views/ServiceDetailPage';

export default function ThreeDPage(props) {
  return <ServiceDetailPage {...props} serviceKey="3d-product-animation" />;
}

export async function getStaticProps() {
  const service = servicesData['3d-product-animation'];
  return {
    props: { service: JSON.parse(JSON.stringify(service)) },
  };
}
