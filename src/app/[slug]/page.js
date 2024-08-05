// app/[slug]/page.js
import React from 'react';
import { fetchLayout } from '@/lib/hook';
import DynamicComponent from '@/components/DynamicComponents';
import { notFound } from 'next/navigation';

const data = async (slug) => {

  const datas = await fetchLayout(slug);

  return datas;
};

export async function generateMetadata({ params }) {
  const { slug } = params;
  const SEO = await data("/"+slug);

  return {
    title: SEO.seo.title || null,
    description: SEO.seo.description || null,
    keywords: SEO.seo.keywords,
    robots: {
      index: !SEO.seo.noindex,
      follow: !SEO.seo.nofollow,
      googleBot: {
        index: !SEO.seo.noindex,
        follow: !SEO.seo.nofollow,
      },
    },
  }
}

export default async function SlugPage({ params }) {
  const { slug } = params;
  const pageData = await data("/"+slug);

  if (!pageData) {
    notFound(); // Redirect to 404 page
    return null;
  }

  const isLayout = pageData.type === 'layout';
  const isCollection = pageData.type === 'collection';
  const isSingleton = pageData.type === 'singleton';

  if (!isLayout && !isCollection && !isSingleton) {
    notFound(); // Redirect to 404 page
    return null;
  }

  return (
    <DynamicComponent 
      layout={isLayout ? pageData : null} 
      collection={isCollection ? pageData : null}
      singleton={isSingleton ? pageData : null} 
    />
  );
}
