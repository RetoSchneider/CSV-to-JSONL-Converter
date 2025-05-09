import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  additionalMetaTags?: Array<{ name: string; content: string }>;
  additionalLinkTags?: Array<{ rel: string; href: string }>;
}

const SEO = ({
  title = 'CSV to JSONL Converter | OpenAI-Ready File Formatter with Token Counter',
  description = 'Convert CSV files to OpenAI-ready JSONL format with instant token counting. 100% in-browser processing with no data storage.',
  canonical = 'https://csv2jsonl.ai',
  additionalMetaTags = [],
  additionalLinkTags = [],
}: SEOProps) => {
  useEffect(() => {
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
    
    additionalMetaTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
    
    additionalLinkTags.forEach(tag => {
      let linkTag = document.querySelector(`link[rel="${tag.rel}"]`);
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', tag.rel);
        document.head.appendChild(linkTag);
      }
      linkTag.setAttribute('href', tag.href);
    });
    
    return () => {
    };
  }, [title, description, canonical, additionalMetaTags, additionalLinkTags]);
  
  return null;
};

export default SEO;
