import { get } from 'lodash'

export const getColor = function (key) {
  const colors = {
    'Energy Efficiency': '#aaa',
    'CCS': '#feeda1',
    'Electricity - T&D and Storage': '#fdbf6f',
    'Extraction and Conversion - Nuclear': '#e9f6a1',
    'Extraction and Conversion - Bioenergy': '#b7e075',
    'Electricity - Non-bio Renewables': '#229c53',
    'Electricity - Fossil Fuels w/o CCS': '#da372a',
    'Extraction and Conversion - Fossil Fuels': '#a50026'
  }
  return get(colors, key, '#000')
}

export const calcBar = function (x, zero, y, width) {
  return `M${x} ${zero} L${x} ${y} L${x + width} ${y} L ${x + width} ${zero} Z`
}
