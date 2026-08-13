import React from 'react';
import ImageExpansionTypography from './ImageExpansionTypography';

export default function FeaturedWork({ onOpenInquiry }) {
  return (
    <section className="section-padding dark-section" id="work" style={{ backgroundColor: '#08080a', color: '#fff', padding: '4rem 2rem 6rem 2rem' }}>
      <ImageExpansionTypography onOpenInquiry={onOpenInquiry} />
    </section>
  );
}
