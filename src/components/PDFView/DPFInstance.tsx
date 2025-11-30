import React, { useEffect, useState } from 'react'

import { View, StyleSheet, Text } from '@react-pdf/renderer';
import { Page, Document, pdfjs } from 'react-pdf';

const styles: any = StyleSheet.create({})

export default function DPFInstance({ src }: { src: string }) {
  pdfjs.GlobalWorkerOptions.workerSrc =
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState<number>(0);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  useEffect(() => {
    console.log('src Img', src);
  }, [])
  return (
    <Document
      file={src}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Page pageNumber={numPages} />
    </Document>
  )
}
