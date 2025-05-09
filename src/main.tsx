import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSV to JSONL Converter",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "isAccessibleForFree": true,
    "description": "Convert CSV files to OpenAI-ready JSONL format with instant token counting. 100% in-browser processing with no data storage.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "25"
    },
    "featureList": "Drag-and-drop CSV to download an OpenAI-ready JSONL file, Shows total tokens per dataset, Pay-what-you-want pricing, 100% in-browser with no backend storage"
  });
  document.head.appendChild(script);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
