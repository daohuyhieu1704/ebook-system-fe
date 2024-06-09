import { Column } from '@ant-design/charts';
import React from 'react'
import { theme } from '../../theme/theme';

type ColumnType = {
  tennganh: string,
  soluong: number
}[]

export default function ColumnChart({ data, color, height = 200, width = 500}: {
  data: ColumnType,
  color: string,
  height: number,
  width?: number,
}) {
  const config: {
    data: ColumnType,
    width: number,
    height: number,
    color?: string,
    autoFit?: boolean,
    xField: string,
    yField: string,
    point: any,
    label: any,
    xAxis: any,
    meta: any,
    scrollbar: {
      type: 'horizontal',
    },
  } = {
    data,
    width: width,
    height: height,
    autoFit: true,
    xField: 'tennganh',
    yField: 'soluong',
    color,
    meta: {
      tennganh: {
        alias: " "
      }
    },
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
      position: 'top',
      autoHide: true,
      autoRotate: true,
    },
    xAxis: {
      label: false,
    },
    scrollbar: {
      type: 'horizontal',
    },
  };
  return (
    <Column {...config} />
  )
}
