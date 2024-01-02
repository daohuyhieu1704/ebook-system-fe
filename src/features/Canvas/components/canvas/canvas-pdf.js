/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, useCallback } from 'react'
import './canvas-pdf.css'

const CanvasPDF = ({ pdfDoc, page, pageNum, scale }) => {
  const canvasPDFRef = useRef()
  const [orgWidth, setOrgWidth] = useState(null)
  const [orgHeight, setOrgHeight] = useState(null)
  const renderPage = useCallback(async ({ pdfDoc, page, pageNum, scale }) => {
    const ctx = canvasPDFRef.current.getContext('2d')
    const cviewport = page.getViewport({ scale })
    setOrgWidth(cviewport.width)
    setOrgHeight(cviewport.height)

    canvasPDFRef.current.width = cviewport.width
    canvasPDFRef.current.height = cviewport.height

    page.render({
      canvasContext: ctx,
      viewport: cviewport
    })
  }, [])

  useEffect(() => {
    if (page == null) return
    renderPage({ pdfDoc: pdfDoc, page: page, pageNum: pageNum, scale: scale })
  }, [page])

  useEffect(() => {
    if (page == null) return
    const cviewport = page.getViewport({ scale })
    const ctx = canvasPDFRef.current.getContext('2d')
    canvasPDFRef.current.style.width = cviewport.width + 'px'
    canvasPDFRef.current.style.height = cviewport.height + 'px'
    ctx.scale(orgWidth / cviewport.width, orgHeight / cviewport.height)

    setOrgWidth(cviewport.width)
    setOrgHeight(cviewport.height)
  }, [scale])

  return <canvas ref={canvasPDFRef} className='canvas-pdf'></canvas>
}

export default CanvasPDF
