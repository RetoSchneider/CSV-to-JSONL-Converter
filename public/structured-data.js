const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CSV to JSONL Converter",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "isAccessibleForFree": true,
  "url": "https://csv-to-jsonl-converter.vercel.app/",
  "description": "Convert CSV files to OpenAI-ready JSONL format with instant token counting. 100% in-browser processing with no data storage.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "25"
  },
  "featureList": "Drag-and-drop CSV to download an OpenAI-ready JSONL file, Shows total tokens per dataset, Pay-what-you-want pricing, 100% in-browser with no backend storage"
};

document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
});
