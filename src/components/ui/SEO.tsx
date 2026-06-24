import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  const baseTitle = 'Ramesh Kanna | DevOps & Platform Engineering Control Plane';
  const fullTitle = title === baseTitle ? title : `${title} | ${baseTitle}`;

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ramesh Kanna",
    "jobTitle": "DevOps Engineer & Platform Engineer",
    "url": "https://github.com/rameshkanna788",
    "sameAs": [
      "https://www.linkedin.com/in/ramesh-kanna-046142241/",
      "https://github.com/rameshkanna788",
      "https://leetcode.com/rameshkanna726"
    ],
    "description": description,
    "knowsAbout": [
      "DevOps",
      "Platform Engineering",
      "Site Reliability Engineering",
      "Kubernetes",
      "Terraform",
      "Docker",
      "AWS",
      "CI/CD Pipelines",
      "Python Scripting"
    ]
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={window.location.href} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaJson)}
      </script>
    </Helmet>
  );
};

