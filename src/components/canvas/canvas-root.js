/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectNumPages,
  selectPdf,
  selectScale,
  setNumPageCurrent
} from '../../redux/AppSlice'
import { selectTypeDraw } from '../control/app-controlSlice'
import CanvasContainer from './canvas-container'
import './canvas-root.css'

const CanvasRoot = () => {
  const pdfDoc = useSelector(selectPdf)
  const scale = useSelector(selectScale)
  const totalPage = useSelector(selectNumPages)
  const dispatch = useDispatch()
  const restore_array = []
  useEffect(() => {
    // setTimeout(() => {
    //   setScale(2);
    // }, 5000);

    document.addEventListener('scroll', function () {
      const maxYOffSet =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      // const pageNumCurrent = Math.floor(
      //   (window.pageYOffset * totalPage) / maxYOffSet
      const pageNumCurrent = Math.ceil(
        ((window.pageYOffset - 145) * totalPage) / maxYOffSet
      )
      dispatch(
        setNumPageCurrent(
          pageNumCurrent !== 0 && !isNaN(pageNumCurrent) ? pageNumCurrent : 1
        )
      )
    })
  }, [dispatch, totalPage])

  function getCanvasContainer(pdfDoc) {
    let canvasContainer = []
    for (var i = 0; i < pdfDoc._pdfInfo.numPages; i++) {
      canvasContainer.push(
        <CanvasContainer
          key={'canvas-container-' + (i + 1)}
          pageNum={i + 1}
          index={-1}
        />
      )
    }
    return (
      <div id='document' className='div-document'>
        {canvasContainer}
      </div>
    )
  }

  return (
    <div className='canvas-container' id='canvasroot'>
      <div className='pdf-draw-container'>{getCanvasContainer(pdfDoc)}</div>
    </div>
  )
}

export default CanvasRoot
