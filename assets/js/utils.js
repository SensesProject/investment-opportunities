import { get } from 'lodash'
import { format } from 'd3-format'
import { SCENARIO_MAPPING_SHORT, REGION_MAPPING_LONG, SCENARIO_MAPPING_LONG, REGION_MAPPING_SHORT } from '~/store/config'

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

const fn = format(',.3r')
const fp = format('.0%')

export const createTooltip = function (type, region, variable, value, reference, change, isPositive, scenario, model) {
  const longScenario = getLongScenario(scenario)
  const shortRegion = getShortRegion(region)
  const labelValue = value !== 0 ? fn(value) : 0
  const labelReference = reference !== 0 ? fn(reference) : 0
  const labelDiff = fn(Math.abs(value - reference))
  const labelChange = `(${fp(change)})`
  const object = variable ? ` in ${variable}` : ''

  const content = []

  switch (type) {
    case 'region':
      content.push(`<header><strong>${variable}</strong><strong>${shortRegion}</strong><span>${labelValue}&#8239;bn US$/yr</span></header>`)
      break;
    case 'variable':
    case 'change':
      content.push(`<header><strong>${variable}</strong><strong>${longScenario}</strong><span>${labelValue}&#8239;bn US$/yr</span></header>`)
      break;
    default:
      content.push(`<header><strong>${scenario}</strong><span>${labelValue}&#8239;bn US$/yr</span></header>`)
  }

  const verb = scenario === 'NDC' ? 'pledged to' : 'should'
  const adjective = isPositive ? 'more' : 'less'
  const target = scenario === 'NDC' ? 's' : ' target'

  if (scenario === 'historic') {
    const subject = region === 'World' ? 'We are' : `${shortRegion} is`
    content.push(`<p>${subject} currently investing ${labelReference} billion US dollar every year${object}.</p>`)
  } else {
    const subject = region === 'World' ? 'We' : shortRegion
    const pronoun = region === 'World' ? 'we' : 'they'
    content.push(`<p>${subject} ${verb} invest ${labelValue} billion US dollar every year ${object} to be aligned with the ${longScenario}${target}.</p>`)

    if (reference !== 0) {
      content.push(`<p>That is ${labelDiff} ${labelChange} ${adjective} than the ${labelReference}&#8239;bn US$/yr, that ${pronoun} are currently investing.</p>`)
    } else {
      content.push(`<p>${subject} ${region === 'World' ? 'are' : 'is'} currently not investing anything in this.</p>`)
    }
  }

  switch (type) {
    case 'region':
      content.push(`<footer><span>Scenario: ${longScenario}</span><span>Model: ${model}</span></footer>`)
      break;
    default:
      content.push(`<footer><span>Region: ${shortRegion}</span><span>Model: ${model}</span></footer>`)
  }

  return {
    content: content.join(''),
    offset: 5
  }
}