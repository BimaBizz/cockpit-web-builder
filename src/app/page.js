// app/[slug]/page.js
import React from 'react';
import { fetchLayout } from '@/lib/hook';
import DynamicComponent from '@/components/DynamicComponents';

const data = await fetchLayout('/');

export const metadata = {
  title: data.seo.title,
  keywords: data.seo.keywords,
  description: data.seo.description,
  robots: {
    index: data.seo.noindex,
    follow: data.seo.nofollow,
    googleBot: {
      index: data.seo.noindex,
      follow: data.seo.nofollow,
    },
  },
};

export default async function SlugPage() {
  const layout = await fetchLayout('/');
  return <DynamicComponent layout={layout} />;
}
