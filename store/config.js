export const MODELS = ['average', 'POLES', 'REMIND-MAgPIE', 'AIM/CGE', 'IMAGE', 'MESSAGEix-GLOBIOM']
export const FORMULATIONS = ['historic', 'NDC', '2C', '1.5C']

export const DEFAULT_MODEL = 'REMIND-MAgPIE'
export const DEFAULT_REGION = 'World'

export const GROUP_FOSSILS = [
  'Oil and Gas extraction',
  'Coal extraction',
  'Fossil power generation',
  'Hydrogen - Fossil'
]

export const GROUP_NON_FOSSILS = [
  'Nuclear',
  'Bioenergy',
  'Hydrogen - Non-fossil',
  'Solar',
  'Wind',
  'other renewables'
]

export const GROUP_OTHERS = [
  'Transmission and Distribution',
  'Energy Efficiency',
  'CCS',
  'Storage'
]

export const REGIONS = [
  'R5OECD90+EU',
  'R5MAF',
  'R5ASIA',
  'R5LAM',
  'R5REF'
  // 'USA',
  // 'CHN',
  // 'IND'
  //  'EUR',
  //  'JPN',
  //  'RUS',
]

export const GROUP_LABELS = ['Fossil', 'Non-Fossil', 'Other']

export const VARIABLES = [...GROUP_FOSSILS, ...GROUP_NON_FOSSILS, ...GROUP_OTHERS]

export const REGION_MAPPING_SHORT = {
  'R5OECD90+EU': 'OECD and EU',
  'R5ASIA': 'Asia',
  'R5LAM': 'Latin America',
  'R5MAF': 'Middle East and Africa',
  'R5REF': 'Reform economies'
}

export const REGION_MAPPING_LONG = {
  'R5OECD90+EU': 'Central Asia, China, India, Indonesia, Pakistan, South Asia, South Korea, Southeast Asia, Taiwan',
  'R5ASIA': 'Brazil, Central America and Caribbean, Mexico, South America_Northern, South America_Southern, Argentina, Colombia',
  'R5LAM': 'Africa Eastern, Africa Northern, Africa Southern, Africa Western, Middle East, South Africa',
  'R5MAF': 'USA, Australia, NZ, Canada, EU-15, Europe Non EU, European Free Trade Association, Japan',
  'R5REF': 'EU-12, Europe Eastern, Russia'
}

export const SCENARIO_MAPPING_SHORT = {
  '2C': '2°',
  '1.5C': '1.5°'
}
