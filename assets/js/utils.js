import { get } from 'lodash'
import { format } from 'd3-format'
import { VARIABLE_MAPPING_CSS, SCENARIO_MAPPING_SHORT, REGION_MAPPING_LONG, SCENARIO_MAPPING_LONG, REGION_MAPPING_SHORT } from '~/store/config'

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

export const shortScenario = function (scenario) {
  return get(SCENARIO_MAPPING_SHORT, scenario, scenario)
}

export const getLongScenario = function (scenario) {
  return get(SCENARIO_MAPPING_LONG, scenario, scenario)
}

export const longRegion = function (region) {
  return get(REGION_MAPPING_LONG, region, region)
}

export const getShortRegion = function (region) {
  return get(REGION_MAPPING_SHORT, region, region)
}

export const getVariableCSS = function (variable) {
  return get(VARIABLE_MAPPING_CSS, variable, variable)
}

const fn = format(',.3r')
const fp = format('.0%')

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

export const createTooltip = function (type, region, variable, value, reference, change, isPositive, scenario, model) {
  const longScenario = getLongScenario(scenario)
  const shortRegion = getShortRegion(region)
  const labelValue = value !== 0 ? fn(value) : 0
  const labelReference = reference !== 0 ? fn(reference) : 0
  const labelDiff = fn(Math.abs(value - reference))
  const labelChange = `(${fp(change)})`
  const object = variable ? ` in ${variable}` : ''
  const classes = `variable variable--${getVariableCSS(variable)}`

  const content = []

  switch (type) {
    case 'region':
      content.push(`<header><strong class="${classes}"><i></i> ${variable}</strong><strong>${shortRegion}</strong><span class="value">${labelValue}&#8239;bn US$/yr</span></header>`)
      break;
    case 'variable':
    case 'change':
      content.push(`<header><strong class="${classes}"><i></i> ${variable}</strong><strong class="scenario">${longScenario}</strong><span class="value">${labelValue}&#8239;bn US$/yr</span></header>`)
      break;
    default:
      content.push(`<header><strong>${longScenario}</strong><span>${labelValue}&#8239;bn US$/yr</span></header>`)
  }

  if (region !== 'World' && variable === 'Energy Efficiency' && scenario !== 'historic') {
    content.push(`<p>Energy efficiency investments listed for the regions (other than ‘World’) are known to be underestimates, as they include only the ‘supply-side offset’ component of the calculation, whereas the ‘World’ energy efficiency investments include both this and the ‘base-year efficiency’ component. The latter is available as an estimate by IEA only at the global level (see Methods of McCollum et al. 2018 for details), hence the varying treatment.</p>`)
  } else {
    const adjective = isPositive ? 'more' : 'less'

    if (scenario === 'historic') {
      const subject = region === 'World' ? 'We are' : `${shortRegion} is`
      content.push(`<p>${subject} currently investing ${labelReference} billion US dollar every year${object}.</p>`)
    } else {
      const subject = region === 'World' ? 'we' : shortRegion
      const pronoun = region === 'World' ? 'we' : 'they'

      if (scenario === 'NDC') {
        content.push(`<p>Given pledged NDCs, ${subject} ${region === 'World' ? 'are' : 'is'} on track to invest ${labelValue} billion US dollar every year ${object}.</p>`)
      } else {
        content.push(`<p>${subject.capitalize()} should invest ${labelValue} billion US dollar every year ${object} to be aligned with the ${longScenario} target.</p>`)
      }

      if (reference !== 0) {
        content.push(`<p>That is ${labelDiff} ${labelChange} ${adjective} than the ${labelReference}&#8239;bn US$/yr, that ${pronoun} are currently investing.</p>`)
      } else {
        content.push(`<p>${subject.capitalize()} ${region === 'World' ? 'are' : 'is'} currently not investing anything in this.</p>`)
      }
    }
  }

  const modelText = scenario === 'historic' ? '' : `<span>Model: ${model}</span>`

  switch (type) {
    case 'region':
      content.push(`<footer><span>Scenario: ${longScenario}</span>${modelText}</footer>`)
      break;
    default:
      content.push(`<footer><span>Region: ${shortRegion}</span>${modelText}</footer>`)
  }

  return {
    content: content.join(''),
    offset: 5
  }
}