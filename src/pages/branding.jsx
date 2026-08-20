import { servicesData } from '../data/servicesData';
import ServiceDetailPage from '../views/ServiceDetailPage';

export default function BrandingPage(props) {
  return <ServiceDetailPage {...props} serviceKey="branding" />;
}

export async function getStaticProps() {
  const service = servicesData['branding'];
  return {
    props: { service: JSON.parse(JSON.stringify(service)) },
  };
}
