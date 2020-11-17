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
  'R5OECD90+EU': 'Includes the OECD 90 and EU member states and candidates: Albania, Australia, Austria, Belgium, Bosnia and Herzegovina, Bulgaria, Canada, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Guam, Hungary, Iceland, Ireland, Italy, Japan, Latvia, Lithuania, Luxembourg, Malta, Montenegro, Netherlands, New Zealand, Norway, Poland, Portugal, Puerto Rico, Romania, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, The former Yugoslav Republic of Macedonia, Turkey, United Kingdom, United States of America',
  'R5ASIA': 'The region includes most Asian countries with the exception of the Middle East, Japan and Former Soviet Union states: Afghanistan, Bangladesh, Bhutan, Brunei Darussalam, Cambodia, China (incl. Hong Kong and Macao, excl. Taiwan) Democratic People’s Republic of Korea, Fiji, French Polynesia, India, Indonesia, Lao People’s Democratic Republic, Malaysia, Maldives, Micronesia (Fed. States of), Mongolia, Myanmar, Nepal, New Caledonia, Pakistan, Papua New Guinea, Philippines, Republic of Korea, Samoa, Singapore, Solomon Islands, Sri Lanka, Taiwan, Thailand, Timor-Leste, Vanuatu, Viet Nam',
  'R5LAM': 'This region includes the countries of Latin America and the Caribbean: Argentina, Aruba, Bahamas, Barbados, Belize, Bolivia (Plurinational State of), Brazil, Chile, Colombia, Costa Rica, Cuba, Dominican Republic, Ecuador, El Salvador, French Guiana, Grenada, Guadeloupe, Guatemala, Guyana, Haiti, Honduras, Jamaica, Martinique, Mexico, Nicaragua, Panama, Paraguay, Peru, Suriname, Trinidad and Tobago, United States Virgin Islands, Uruguay, Venezuela (Bolivarian Republic of)',
  'R5MAF': 'This region includes the countries of the Middle East and Africa: Algeria, Angola, Bahrain, Benin, Botswana, Burkina Faso, Burundi, Cameroon, Cape Verde, Central African Republic, Chad, Comoros, Congo, Côte d`Ivoire, Democratic Republic of the Congo, Djibouti, Egypt, Equatorial Guinea, Eritrea, Ethiopia, Gabon, Gambia, Ghana, Guinea, Guinea-Bissau, Iran (Islamic Republic of), Iraq, Israel, Jordan, Kenya, Kuwait, Lebanon, Lesotho, Liberia, Libyan Arab Jamahiriya, Madagascar, Malawi, Mali, Mauritania, Mauritius, Mayotte, Morocco, Mozambique, Namibia, Niger, Nigeria, Occupied Palestinian Territory, Oman, Qatar, Rwanda, Réunion, Saudi Arabia, Senegal, Sierra Leone, Somalia, South Africa, South Sudan, Sudan, Swaziland, Syrian Arab Republic, Togo, Tunisia, Uganda, United Arab Emirates, United Republic of Tanzania, Western Sahara, Yemen, Zambia, Zimbabwe',
  'R5REF': 'Countries from the Reforming Ecomonies of Eastern Europe and the Former Soviet Union: Armenia, Azerbaijan, Belarus, Georgia, Kazakhstan, Kyrgyzstan, Republic of Moldova, Russian Federation, Tajikistan, Turkmenistan, Ukraine, Uzbekistan'
}

export const SCENARIO_MAPPING_SHORT = {
  '2C': '2°',
  '1.5C': '1.5°'
}
