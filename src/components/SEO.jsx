import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name, type, image }) {
  const siteName = 'MyTwin';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'MyTwin - Your comprehensive digital health twin platform for personalized health tracking, coaching, and care programs.';

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description || defaultDescription} />

      {/* Facebook / Open Graph tags */}
      <meta property='og:type' content={type || 'website'} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description || defaultDescription} />
      {/* Uncomment and replace with a real image URL when you have a default social share image */}
      {/* <meta property='og:image' content={image || 'https://mytwin.com/default-og-image.jpg'} /> */}

      {/* Twitter tags */}
      <meta name='twitter:creator' content={name || siteName} />
      <meta name='twitter:card' content={type || 'summary_large_image'} />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description || defaultDescription} />
    </Helmet>
  );
}
