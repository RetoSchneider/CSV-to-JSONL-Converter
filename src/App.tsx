import { useState, useRef, useCallback, useEffect, lazy, Suspense } from 'react';
import './App.css';

const SEO = lazy(() => import('./components/SEO'));
const Logo = lazy(() => import('./components/Logo'));
const ThysonLogo = lazy(() => import('./components/ThysonLogo'));
const BackgroundMusic = lazy(() => import('./components/BackgroundMusic'));
import retroMusic from './assets/cool-retro-darkwavesynthwave-type-beat-shadows-211527.mp3';

type ProcessedData = {
  totalRows: number;
  totalTokens: number;
  jsonlContent: string;
  fileName: string;
  previewRows: Record<string, any>[];
};

function App() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [encoder, setEncoder] = useState<any | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [areDependenciesLoaded, setAreDependenciesLoaded] = useState(false);
  const papaRef = useRef<any>(null);
  const tiktokenRef = useRef<any>(null);
  const cl100kBaseRef = useRef<any>(null);

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        setIsProcessing(true);
        
        const papaModule = await import('papaparse');
        papaRef.current = papaModule.default;
        
        const tiktokenModule = await import('@dqbd/tiktoken');
        const encoderModule = await import('@dqbd/tiktoken/encoders/cl100k_base.json');
        
        tiktokenRef.current = tiktokenModule;
        cl100kBaseRef.current = encoderModule.default;
        
        const tiktoken = new tiktokenModule.Tiktoken(
          encoderModule.default.bpe_ranks,
          encoderModule.default.special_tokens,
          encoderModule.default.pat_str
        );
        
        setEncoder(tiktoken);
        setAreDependenciesLoaded(true);
      } catch (error) {
        console.error('Failed to initialize dependencies:', error);
      } finally {
        setIsProcessing(false);
      }
    };
    
    loadDependencies();
    
    return () => {
      if (encoder) {
        encoder.free();
      }
    };
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const processCSV = useCallback(async (file: File) => {
    if (!encoder || !papaRef.current) return;
    
    setIsProcessing(true);
    
    return new Promise<ProcessedData>((resolve, reject) => {
      papaRef.current.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: any) => {
          try {
            const { data } = results;
            if (!data.length) {
              reject(new Error('CSV file is empty'));
              return;
            }

            let totalTokens = 0;
            const jsonlLines = data.map((row: any) => {
              const jsonStr = JSON.stringify(row);
              const tokens = encoder.encode(jsonStr).length;
              totalTokens += tokens;
              return jsonStr;
            });

            const jsonlContent = jsonlLines.join('\n');
            
            const previewRows = data.slice(0, 5).map((row: any) => row as Record<string, any>);
            
            resolve({
              totalRows: data.length,
              totalTokens,
              jsonlContent,
              fileName: file.name.replace(/\.csv$/i, '.jsonl'),
              previewRows
            });
          } catch (error) {
            reject(error);
          }
        },
        error: (error: any) => {
          reject(error);
        }
      });
    }).finally(() => {
      setIsProcessing(false);
    });
  }, [encoder, papaRef]);

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    
    const file = files[0];
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      alert('Please drop a CSV file');
      return;
    }
    
    try {
      const data = await processCSV(file);
      if (data) setProcessedData(data);
    } catch (error) {
      console.error('Error processing CSV:', error);
      alert(`Error processing CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [processCSV]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    try {
      const data = await processCSV(files[0]);
      if (data) setProcessedData(data);
    } catch (error) {
      console.error('Error processing CSV:', error);
      alert(`Error processing CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [processCSV]);

  const handleDownload = useCallback(() => {
    if (!processedData) return;
    
    const blob = new Blob([processedData.jsonlContent], { type: 'application/jsonl' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = processedData.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [processedData]);

  const handleBuyMeCoffee = () => {
    window.open('https://www.buymeacoffee.com/thyson', '_blank');
  };

  const renderLoadingScreen = () => (
    <div className="retro-container" role="application">
      <div className="loading-overlay">
        <div className="retro-spinner"></div>
        <p>Loading application dependencies...</p>
      </div>
    </div>
  );

  if (!areDependenciesLoaded && !processedData) {
    return renderLoadingScreen();
  }
  
  return (
    <>
      <Suspense fallback={<div>Loading SEO component...</div>}>
        <SEO 
          title="CSV to JSONL Converter | OpenAI-Ready File Formatter with Token Counter"
          description="Convert CSV files to OpenAI-ready JSONL format with instant token counting. 100% in-browser processing with no data storage."
          additionalMetaTags={[
            { name: 'keywords', content: 'CSV to JSONL, OpenAI, JSONL converter, token counter, data preprocessing, AI training data, ChatGPT' },
          ]}
        />
      </Suspense>
      <div className="retro-container" role="application">
      <header className="retro-header" role="banner">
        <div className="logo-container">
          <Suspense fallback={<div className="placeholder-logo"></div>}>
            <Logo size={60} aria-hidden="true" />
          </Suspense>
          <h1 className="app-title">CSV-to-JSONL Converter</h1>
        </div>
        <button
          onClick={handleBuyMeCoffee}
          className="support-btn coffee-btn"
          aria-label="Buy me a coffee if you find this tool useful"
        >
          <span className="support-icon" aria-hidden="true">☕</span>
          <span>Buy me a coffee</span>
        </button>
      </header>

      <main className="retro-main" role="main">
        <div className="retro-tagline">
          <p>Transform your CSV data into OpenAI-ready JSONL format with instant token counting</p>
        </div>

        {!processedData ? (
          <div className="retro-panel upload-panel">
            <div 
              className={`dropzone ${isDragOver ? 'dropzone-active' : ''} ${isProcessing ? 'dropzone-processing' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload CSV file by dragging and dropping here or press to browse files"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden-input" 
                accept=".csv,text/csv" 
                onChange={handleFileSelect} 
              />
              
              {isProcessing ? (
                <div className="processing-indicator">
                  <div className="retro-spinner"></div>
                  <span>Processing your file...</span>
                </div>
              ) : (
                <div className="dropzone-content">
                  <div className="upload-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="dropzone-title">Drag & drop your CSV file here</p>
                  <p className="dropzone-subtitle">or click to browse</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <section className="retro-panel result-panel" aria-labelledby="result-header">
            <header id="result-header" className="result-header">
              <div className="success-badge">
                <span className="success-icon" aria-hidden="true">✓</span>
                <h2>File processed successfully</h2>
              </div>
            </header>
            
            <div className="results-container">
              <div className="stats-section">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-label">Filename</div>
                    <div className="stat-value filename" title={processedData.fileName}>{processedData.fileName}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Total rows</div>
                    <div className="stat-value">{processedData.totalRows.toLocaleString()}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Total tokens</div>
                    <div className="stat-value token-count">{processedData.totalTokens.toLocaleString()}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Est. cost</div>
                    <div className="stat-value">${(processedData.totalTokens / 1000 * 0.0004).toFixed(4)}</div>
                  </div>
                </div>

                <div className="action-buttons">
                  <button
                    onClick={handleDownload}
                    className="retro-btn primary-btn"
                    aria-label="Download converted JSONL file"
                  >
                    <span className="btn-icon" aria-hidden="true">↓</span>
                    <span>Download JSONL</span>
                  </button>
                  <button
                    onClick={() => setProcessedData(null)}
                    className="retro-btn secondary-btn"
                  >
                    <span>Process another file</span>
                  </button>
                </div>
              </div>

              {processedData.previewRows && processedData.previewRows.length > 0 && (
                <div className="preview-section">
                  <h3 id="preview-heading">Sample Row Preview</h3>
                  <div className="table-container" role="region" aria-labelledby="preview-heading" tabIndex={0}>
                    <table className="retro-table" aria-describedby="table-desc">
                      <caption id="table-desc" className="sr-only">Preview of first few rows from the CSV data</caption>
                      <thead>
                        <tr>
                          {processedData.previewRows[0] && 
                            Object.keys(processedData.previewRows[0]).map((header, i) => (
                              <th key={i} scope="col">{header}</th>
                            ))
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {processedData.previewRows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {Object.entries(row).map(([_, value], i) => {
                              const displayValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
                              return (
                                <td 
                                  key={i} 
                                  title={displayValue} 
                                  {... (i === 0 ? { 'aria-label': `Row ${rowIndex + 1}, ${displayValue}` } : {})}
                                >
                                  {displayValue}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <footer className="retro-footer" role="contentinfo">
        <div className="thyson-logo-container">
          <Suspense fallback={<div className="placeholder-logo"></div>}>
            <ThysonLogo size={20} />
          </Suspense>
        </div>
        <div className="footer-content">
          <p>100% Free Tool. <span role="img" aria-label="coffee">☕</span> If this saves you time, <button onClick={handleBuyMeCoffee} className="footer-coffee-link">buy me a coffee</button> to support future updates!</p>
        </div>
      </footer>
    </div>
      <Suspense fallback={<div>Loading audio player...</div>}>
        <BackgroundMusic audioSrc={retroMusic} initialMuted={true} />
      </Suspense>
    </>
  );
}

export default App;
