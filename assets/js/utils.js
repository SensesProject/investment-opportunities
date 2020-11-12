import { get } from 'lodash'

export const getColorFromVariable = function (key) {
  const colors = {
    'Coal': '#F0A1BA',
    'Oil and Gas': '#E67887',
    'Fossil Fuels': '#FAA99C',
    'Hydrogen - Fossil': '#FFBD9A',
    'Nuclear': '#FFE7A0',
    'Bioenergy': '#A2E7C0',
    'Hydrogen - Non-fossil': '#A3D1EA',
    'Solar': '#B8AEFF',
    'Wind': '#B6D68C',
    'other renewables': '#DED68E',
    'Transmission and Distribution': '#D8D8E4',
    'Energy Efficiency': '#AC9BD9',
    'CCS': '#BAD2EB'
  }
  return get(colors, key, '#000')
}

export const calcBar = function (x, zero, y, width) {
  return `M${x} ${zero} L${x} ${y} L${x + width} ${y} L ${x + width} ${zero} Z`
}
