import { get } from 'lodash'

export const getColorFromVariable = function (key) {
  const colors = {
    'Energy Efficiency': '#8c8c94',
    'CCS': '#d7d7e3',
    'Electricity - T&D and Storage': '#aaa',
    'Extraction and Conversion - Nuclear': '#feeda1',
    'Extraction and Conversion - Bioenergy': '#e9f6a1',
    'Hydrogen - Non-fossil': '#e9f6a1',
    'Energy Supply|Electricity|Solar': '#229c53',
    'Energy Supply|Electricity|Wind': '#b7e075',
    'Hydrogen - Fossil': '#da372a',
    'Electricity - Fossil Fuels w/o CCS': '#a50026',
    'other renewables': '#229c53',
    'Coal': '#da372a',
    'Oil and Gas': '#a50026'
  }
  return get(colors, key, '#000')
}

export const calcBar = function (x, zero, y, width) {
  return `M${x} ${zero} L${x} ${y} L${x + width} ${y} L ${x + width} ${zero} Z`
}
