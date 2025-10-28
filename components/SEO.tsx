import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  imageUrl?: string;
  type?: string;
  schemaLd?: object | object[];
}

const BASE_URL = 'https://mobixo.com'; // Using a placeholder domain

const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
  let element = document.querySelector(`meta[${attr}='${value}']`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setLinkTag = (rel: string, href: string) => {
    let element = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement;
    if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
    }
    element.setAttribute('href', href);
}

const setSchemaLd = (schema: object | object[] | null) => {
    const scriptId = 'schema-ld-script';
    const oldScript = document.getElementById(scriptId);
    // Remove old schema if it exists
    if (oldScript) {
        oldScript.remove();
    }
    // Don't add a script if schema is not provided
    if (!schema) return;
    
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
}

export const SEO: React.FC<SEOProps> = ({ title, description, imageUrl, type = 'website', schemaLd }) => {
  const location = useLocation();
  const canonicalUrl = `${BASE_URL}/#${location.pathname}`;

  useEffect(() => {
    // Title
    document.title = title;

    // Standard Meta Tags
    setMetaTag('name', 'description', description);
    
    // Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', canonicalUrl);
    if (imageUrl) {
        setMetaTag('property', 'og:image', imageUrl);
    }

    // Twitter Card Tags
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    if (imageUrl) {
        setMetaTag('name', 'twitter:image', imageUrl);
    }

    // Canonical Link
    setLinkTag('canonical', canonicalUrl);
    
    // JSON-LD Schema
    setSchemaLd(schemaLd || null);

  }, [title, description, imageUrl, type, canonicalUrl, schemaLd]);

  return null;
};