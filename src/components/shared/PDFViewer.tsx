import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  if (!isLoaded) {
    return <div className="h-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col bg-gray-100" ref={containerRef}>
      <div className="flex items-center justify-between p-2 border-b bg-white">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm">
            Page {pageNumber} of {numPages || '--'}
          </span>
          <button
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || prev))}
            disabled={pageNumber >= (numPages || 1)}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={3}
            centerOnInit={true}
            wheel={{ step: 0.1 }}
          >
            {({ zoomIn, zoomOut }) => (
              <>
                <button
                  onClick={() => zoomOut()}
                  className="p-1 rounded hover:bg-gray-100"
                  type="button"
                >
                  <ZoomOut size={20} />
                </button>
                <button
                  onClick={() => zoomIn()}
                  className="p-1 rounded hover:bg-gray-100"
                  type="button"
                >
                  <ZoomIn size={20} />
                </button>
              </>
            )}
          </TransformWrapper>
          <button
            onClick={() => setRotation(prev => (prev + 90) % 360)}
            className="p-1 rounded hover:bg-gray-100"
            type="button"
          >
            <RotateCw size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex justify-center p-4"
        >
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={3}
            centerOnInit={true}
            wheel={{ step: 0.1 }}
          >
            <TransformComponent wrapperClass="w-full h-full">
              <Page
                pageNumber={pageNumber}
                rotate={rotation}
                className="shadow-lg"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </TransformComponent>
          </TransformWrapper>
        </Document>
      </div>
    </div>
  );
}