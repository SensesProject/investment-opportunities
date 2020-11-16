export const MODELS = ['average', 'POLES', 'REMIND-MAgPIE', 'AIM/CGE', 'IMAGE', 'MESSAGEix-GLOBIOM']
export const FORMULATIONS = ['historic', 'NDC', '2C', '1.5C']

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
  'USA',
  'R5MAF',
  'R5ASIA',
  'R5LAM',
  'R5REF',
  'CHN',
  'IND'
  //  'EUR',
  //  'JPN',
  //  'RUS',
]

export const GROUP_LABELS = ['Fossil', 'Non-Fossil', 'Other']

export const VARIABLES = [...GROUP_FOSSILS, ...GROUP_NON_FOSSILS, ...GROUP_OTHERS]
