import { get } from 'lodash'

export const getColorFromVariable = function (key) {
  const colors = {
    'Oil and Gas extraction': '#F0A1BA',
    'Coal extraction': '#E67887',
    'Fossil power generation': '#FAA99C',
    'Hydrogen - Fossil': '#FFBD9A',
    'Nuclear': '#B8AEFF',
    'Bioenergy': '#A2E7C0',
    'Hydrogen - Non-fossil': '#B6D68C',
    'Solar': '#FFE7A0',
    'Wind': '#A3D1EA',
    'other renewables': '#DED68E',
    'Transmission and Distribution': '#D8D8E4',
    'Energy Efficiency': '#AC9BD9',
    'CCS': '#BAD2EB',
    'Storage': '#A7DBD1'
  }
  return get(colors, key, '#000')
}

export const calcBar = function (x, zero, y, width) {
  return `M${x} ${zero} L${x} ${y} L${x + width} ${y} L ${x + width} ${zero} Z`
}
