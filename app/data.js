// Japan in Numbers: the figures behind the site.
//
// Every number here is a headline figure from the body that publishes it,
// with that body's name and the year the figure belongs to. Nothing is
// fetched from anywhere at run time; this file is the whole dataset.

export const SITE = {
  name: 'Japan in Numbers',
  tagline: 'The statistics of Japan, in one place.',
  country: 'Japan',
  updated: 'November 2026',
  note: 'All figures are shown with the source that published them and the year they describe.',
};

export const SECTIONS = [
  { id: 'overview', title: 'Overview', blurb: 'The headline numbers, at a glance.' },
  { id: 'population', title: 'Population', blurb: 'How many people live in Japan, how old they are, and where the total is heading.' },
  { id: 'economy', title: 'Economy', blurb: 'Output, prices, trade and the public purse.' },
  { id: 'labour', title: 'Labour', blurb: 'Who works, for how long, and for what pay.' },
  { id: 'health', title: 'Health', blurb: 'How long people live, and the system that looks after them.' },
  { id: 'education', title: 'Education', blurb: 'Schooling, skills and what Japan spends on learning.' },
  { id: 'environment', title: 'Environment & Energy', blurb: 'Emissions, power and the land itself.' },
  { id: 'regions', title: 'Regions', blurb: 'The 47 prefectures, compared side by side.' },
];

// One row per published figure. `value` is the display string, `sort` the
// numeric value used by the search index and the CSV download.
export const INDICATORS = [
  // ---- Overview / headline ----
  { id: 'pop-total', section: 'population', label: 'Total population', value: '124.0 million', sort: 124.0, unit: 'people', year: 2024, source: 'Statistics Bureau of Japan', note: 'Estimated population, 1 October 2024.' },
  { id: 'pop-65', section: 'population', label: 'Share aged 65 and over', value: '29.3%', sort: 29.3, unit: '% of population', year: 2024, source: 'Statistics Bureau of Japan', note: 'The highest share of older people of any large country.' },
  { id: 'gdp-nominal', section: 'economy', label: 'Nominal GDP', value: '$4.03 trillion', sort: 4.03, unit: 'US dollars', year: 2024, source: 'International Monetary Fund', note: 'Fourth-largest economy in the world, after the United States, China and Germany.' },
  { id: 'gdp-pc', section: 'economy', label: 'GDP per person', value: '$32,500', sort: 32500, unit: 'US dollars', year: 2024, source: 'International Monetary Fund', note: 'Nominal GDP divided by the 2024 population.' },
  { id: 'life-exp', section: 'health', label: 'Life expectancy at birth', value: '84.0 years', sort: 84.0, unit: 'years', year: 2023, source: 'Ministry of Health, Labour and Welfare', note: '81.1 years for men and 87.1 years for women.' },
  { id: 'unemp', section: 'labour', label: 'Unemployment rate', value: '2.5%', sort: 2.5, unit: '% of labour force', year: 2024, source: 'Statistics Bureau of Japan', note: 'Annual average, seasonally adjusted basis.' },
  { id: 'fertility', section: 'population', label: 'Total fertility rate', value: '1.15 children per woman', sort: 1.15, unit: 'children per woman', year: 2024, source: 'Ministry of Health, Labour and Welfare', note: 'The lowest figure since records began in 1947.' },
  { id: 'cpi', section: 'economy', label: 'Consumer price inflation', value: '2.7%', sort: 2.7, unit: '% year on year', year: 2024, source: 'Statistics Bureau of Japan', note: 'All-items CPI, annual average.' },

  // ---- Population ----
  { id: 'pop-births', section: 'population', label: 'Live births', value: '720,988', sort: 720988, unit: 'births', year: 2024, source: 'Ministry of Health, Labour and Welfare', note: 'Fewer than 730,000 births for the first time on record.' },
  { id: 'pop-deaths', section: 'population', label: 'Deaths', value: '1,618,684', sort: 1618684, unit: 'deaths', year: 2024, source: 'Ministry of Health, Labour and Welfare', note: 'The natural decrease was about 898,000 people in the year.' },
  { id: 'pop-014', section: 'population', label: 'Children aged 0 to 14', value: '14.1 million (11.4%)', sort: 11.4, unit: '% of population', year: 2024, source: 'Statistics Bureau of Japan', note: 'The child population has fallen every year since 1982.' },
  { id: 'pop-1564', section: 'population', label: 'Working-age population, 15 to 64', value: '73.5 million (59.3%)', sort: 59.3, unit: '% of population', year: 2024, source: 'Statistics Bureau of Japan', note: 'Down from 69.8% of the population in 1990.' },
  { id: 'pop-65m', section: 'population', label: 'People aged 65 and over', value: '36.3 million', sort: 36.3, unit: 'people', year: 2024, source: 'Statistics Bureau of Japan', note: 'About one person in three is past retirement age.' },
  { id: 'pop-75', section: 'population', label: 'People aged 75 and over', value: '20.7 million (16.7%)', sort: 16.7, unit: '% of population', year: 2024, source: 'Statistics Bureau of Japan', note: 'More than one in six people is 75 or older.' },
  { id: 'pop-median-age', section: 'population', label: 'Median age', value: '49.9 years', sort: 49.9, unit: 'years', year: 2024, source: 'United Nations, World Population Prospects', note: 'The highest median age of any country.' },
  { id: 'pop-density', section: 'population', label: 'Population density', value: '332 people per km²', sort: 332, unit: 'people per km²', year: 2024, source: 'Statistics Bureau of Japan', note: 'Land area 377,975 km²; most people live on the narrow coastal plains.' },
  { id: 'pop-tokyo-share', section: 'population', label: 'Share living in Greater Tokyo', value: '29.7%', sort: 29.7, unit: '% of population', year: 2024, source: 'Statistics Bureau of Japan', note: 'Tokyo, Kanagawa, Saitama and Chiba prefectures together.' },
  { id: 'pop-marriages', section: 'population', label: 'Marriages', value: '499,999', sort: 499999, unit: 'couples', year: 2024, source: 'Ministry of Health, Labour and Welfare', note: 'Just under half a million couples married in the year.' },

  // ---- Economy ----
  { id: 'gdp-real-growth', section: 'economy', label: 'Real GDP growth', value: '-0.1%', sort: -0.1, unit: '% year on year', year: 2024, source: 'Cabinet Office', note: 'Real GDP shrank slightly in calendar 2024.' },
  { id: 'gdp-debt', section: 'economy', label: 'General government gross debt', value: '236.7% of GDP', sort: 236.7, unit: '% of GDP', year: 2024, source: 'International Monetary Fund', note: 'The highest public-debt ratio in the developed world.' },
  { id: 'eco-exports', section: 'economy', label: 'Exports of goods', value: '¥107.9 trillion', sort: 107.9, unit: 'yen', year: 2024, source: 'Ministry of Finance', note: 'A record high in yen terms, led by cars and machinery.' },
  { id: 'eco-export-us', section: 'economy', label: 'Largest export market: United States', value: '20.0% of exports', sort: 20.0, unit: '% of exports', year: 2024, source: 'Ministry of Finance', note: 'China took 17.6% and South Korea 7.1% in the same year.' },
  { id: 'eco-deficit', section: 'economy', label: 'Trade balance in goods', value: '−¥5.3 trillion', sort: -5.3, unit: 'yen', year: 2024, source: 'Ministry of Finance', note: 'A deficit for the fourth year running, narrowed by the weaker yen.' },
  { id: 'eco-current', section: 'economy', label: 'Current-account surplus', value: '¥29.3 trillion', sort: 29.3, unit: 'yen', year: 2024, source: 'Ministry of Finance', note: 'A record surplus, driven by returns on overseas investment.' },
  { id: 'eco-fx', section: 'economy', label: 'Average yen per US dollar', value: '¥151.5', sort: 151.5, unit: 'yen per dollar', year: 2024, source: 'Bank of Japan', note: 'The yen averaged its weakest level since 1990.' },
  { id: 'eco-policy-rate', section: 'economy', label: 'Bank of Japan policy rate', value: '0.5%', sort: 0.5, unit: '%', year: 2025, source: 'Bank of Japan', note: 'Raised to 0.5% in January 2025, the highest since 2008.' },
  { id: 'eco-tourists', section: 'economy', label: 'Visitors from abroad', value: '36.9 million', sort: 36.9, unit: 'people', year: 2024, source: 'Japan National Tourism Organization', note: 'A record year, passing the pre-pandemic peak of 2019.' },
  { id: 'eco-tourism-spend', section: 'economy', label: 'Spending by visitors from abroad', value: '¥8.1 trillion', sort: 8.1, unit: 'yen', year: 2024, source: 'Japan Tourism Agency', note: 'Also a record, helped by the weak yen.' },

  // ---- Labour ----
  { id: 'lab-employed', section: 'labour', label: 'People in work', value: '67.9 million', sort: 67.9, unit: 'people', year: 2024, source: 'Statistics Bureau of Japan', note: 'Annual average of the Labour Force Survey.' },
  { id: 'lab-lfpr', section: 'labour', label: 'Labour-force participation, age 15 and over', value: '63.1%', sort: 63.1, unit: '% of population 15+', year: 2024, source: 'Statistics Bureau of Japan', note: 'Participation has risen for more than a decade, led by women and older workers.' },
  { id: 'lab-nonregular', section: 'labour', label: 'Non-regular employees', value: '37.0% of employees', sort: 37.0, unit: '% of employees', year: 2024, source: 'Statistics Bureau of Japan', note: 'Part-time, contract and dispatched workers, excluding executives.' },
  { id: 'lab-hours', section: 'labour', label: 'Average hours worked per worker', value: '1,626 hours a year', sort: 1626, unit: 'hours per year', year: 2023, source: 'OECD', note: 'Below the OECD average of about 1,742 hours, and falling slowly.' },
  { id: 'lab-jobs-ratio', section: 'labour', label: 'Job openings per applicant', value: '1.25', sort: 1.25, unit: 'openings per applicant', year: 2024, source: 'Ministry of Health, Labour and Welfare', note: 'Employers advertised about five jobs for every four jobseekers.' },
  { id: 'lab-women-1564', section: 'labour', label: 'Women in work, age 15 to 64', value: '79.5%', sort: 79.5, unit: '% of women 15–64', year: 2024, source: 'Statistics Bureau of Japan', note: 'Up from 66.5% a decade earlier.' },
  { id: 'lab-older', section: 'labour', label: 'People aged 65 and over in work', value: '9.3 million', sort: 9.3, unit: 'people', year: 2024, source: 'Statistics Bureau of Japan', note: 'More than a quarter of people past 65 are still working.' },
  { id: 'lab-minwage', section: 'labour', label: 'National weighted-average minimum wage', value: '¥1,055 per hour', sort: 1055, unit: 'yen per hour', year: 2024, source: 'Ministry of Health, Labour and Welfare', note: 'Raised by ¥51 in October 2024, the largest rise on record.' },

  // ---- Health ----
  { id: 'hea-men', section: 'health', label: 'Life expectancy, men', value: '81.1 years', sort: 81.09, unit: 'years', year: 2023, source: 'Ministry of Health, Labour and Welfare', note: 'From the 2023 abridged life table.' },
  { id: 'hea-women', section: 'health', label: 'Life expectancy, women', value: '87.1 years', sort: 87.14, unit: 'years', year: 2023, source: 'Ministry of Health, Labour and Welfare', note: 'The longest female life expectancy in the world.' },
  { id: 'hea-infant', section: 'health', label: 'Infant mortality', value: '1.8 per 1,000 live births', sort: 1.8, unit: 'deaths per 1,000 births', year: 2023, source: 'Ministry of Health, Labour and Welfare', note: 'Among the lowest rates anywhere.' },
  { id: 'hea-beds', section: 'health', label: 'Hospital beds', value: '12.6 per 1,000 people', sort: 12.6, unit: 'beds per 1,000', year: 2022, source: 'OECD', note: 'The most hospital beds per person in the OECD.' },
  { id: 'hea-doctors', section: 'health', label: 'Practising doctors', value: '2.6 per 1,000 people', sort: 2.6, unit: 'doctors per 1,000', year: 2022, source: 'OECD', note: 'Below the OECD average of 3.7, despite the many beds.' },
  { id: 'hea-spend', section: 'health', label: 'Health spending', value: '11.0% of GDP', sort: 11.0, unit: '% of GDP', year: 2022, source: 'OECD', note: 'Public schemes pay about 84% of the total.' },
  { id: 'hea-obesity', section: 'health', label: 'Adults with obesity', value: '4.3%', sort: 4.3, unit: '% of adults', year: 2022, source: 'OECD', note: 'The lowest obesity rate in the OECD by a wide margin.' },
  { id: 'hea-smoking', section: 'health', label: 'Adults who smoke', value: '16.7%', sort: 16.7, unit: '% of adults', year: 2019, source: 'Ministry of Health, Labour and Welfare', note: 'National Health and Nutrition Survey; 27.1% of men and 7.6% of women.' },

  // ---- Education ----
  { id: 'edu-pisa-math', section: 'education', label: 'PISA maths score, age 15', value: '536 points', sort: 536, unit: 'PISA points', year: 2022, source: 'OECD, PISA 2022', note: 'OECD average 472; Japan ranked among the top five.' },
  { id: 'edu-pisa-read', section: 'education', label: 'PISA reading score, age 15', value: '516 points', sort: 516, unit: 'PISA points', year: 2022, source: 'OECD, PISA 2022', note: 'OECD average 476.' },
  { id: 'edu-pisa-sci', section: 'education', label: 'PISA science score, age 15', value: '547 points', sort: 547, unit: 'PISA points', year: 2022, source: 'OECD, PISA 2022', note: 'OECD average 485.' },
  { id: 'edu-upper-sec', section: 'education', label: 'Enrolment in upper secondary school', value: '98.8%', sort: 98.8, unit: '% of the age group', year: 2023, source: 'Ministry of Education, Culture, Sports, Science and Technology', note: 'Almost every teenager stays on past compulsory schooling.' },
  { id: 'edu-universities', section: 'education', label: 'Universities', value: '810', sort: 810, unit: 'institutions', year: 2024, source: 'Ministry of Education, Culture, Sports, Science and Technology', note: 'Including 86 national, 99 public and 625 private universities.' },
  { id: 'edu-students', section: 'education', label: 'University students', value: '2.95 million', sort: 2.95, unit: 'students', year: 2024, source: 'Ministry of Education, Culture, Sports, Science and Technology', note: 'About 58% of school leavers go on to university or junior college.' },
  { id: 'edu-tertiary', section: 'education', label: 'Adults with a tertiary degree, age 25–64', value: '56%', sort: 56, unit: '% of adults 25–64', year: 2023, source: 'OECD', note: 'Above the OECD average of 41%.' },
  { id: 'edu-rd', section: 'education', label: 'Research and development spending', value: '3.4% of GDP', sort: 3.4, unit: '% of GDP', year: 2022, source: 'OECD', note: 'Business pays for about four-fifths of it.' },
  { id: 'edu-spend', section: 'education', label: 'Public spending on education', value: '3.5% of GDP', sort: 3.5, unit: '% of GDP', year: 2021, source: 'OECD', note: 'Below the OECD average of about 4.9%, with households paying more of the rest.' },
  { id: 'edu-teachers', section: 'education', label: 'Pupils per teacher, primary school', value: '16.2', sort: 16.2, unit: 'pupils per teacher', year: 2022, source: 'OECD', note: 'OECD average 15.0.' },

  // ---- Environment & energy ----
  { id: 'env-ghg', section: 'environment', label: 'Greenhouse-gas emissions', value: '1.02 billion tonnes CO₂e', sort: 1.02, unit: 'billion tonnes CO₂e', year: 2023, source: 'Ministry of the Environment', note: 'Fiscal 2023; the lowest since records began in 1990.' },
  { id: 'env-renew', section: 'environment', label: 'Renewables in electricity', value: '22.9%', sort: 22.9, unit: '% of generation', year: 2023, source: 'Ministry of Economy, Trade and Industry', note: 'Fiscal 2023, including hydro; solar alone supplied about 10%.' },
  { id: 'env-nuclear', section: 'environment', label: 'Nuclear in electricity', value: '8.5%', sort: 8.5, unit: '% of generation', year: 2023, source: 'Ministry of Economy, Trade and Industry', note: 'Fiscal 2023; 12 reactors were back in service.' },
  { id: 'env-coal', section: 'environment', label: 'Coal in electricity', value: '28.9%', sort: 28.9, unit: '% of generation', year: 2023, source: 'Ministry of Economy, Trade and Industry', note: 'Fiscal 2023; still the single largest source of power.' },
  { id: 'env-forest', section: 'environment', label: 'Forest cover', value: '67% of land', sort: 67, unit: '% of land area', year: 2020, source: 'Food and Agriculture Organization of the United Nations', note: 'About 25 million hectares, two-fifths of it planted.' },
  { id: 'env-selfsuff', section: 'environment', label: 'Energy self-sufficiency', value: '12.6%', sort: 12.6, unit: '% of primary energy', year: 2022, source: 'Ministry of Economy, Trade and Industry', note: 'Fiscal 2022; Japan imports almost all of its oil, gas and coal.' },
  { id: 'env-waste', section: 'environment', label: 'Municipal waste per person', value: '890 grams a day', sort: 890, unit: 'grams per person per day', year: 2022, source: 'Ministry of the Environment', note: 'Fiscal 2022; about 40% of it is recycled or composted.' },
  { id: 'env-ev', section: 'environment', label: 'Electric cars on the road', value: 'about 280,000', sort: 280000, unit: 'vehicles', year: 2024, source: 'Ministry of Economy, Trade and Industry', note: 'Battery-electric cars are about 0.3% of all cars in Japan.' },
];

// Population in millions. `kind` is 'actual' or 'projection'.
export const POPULATION_SERIES = [
  { year: 1950, value: 83.2, kind: 'actual' },
  { year: 1960, value: 94.3, kind: 'actual' },
  { year: 1970, value: 103.7, kind: 'actual' },
  { year: 1980, value: 117.1, kind: 'actual' },
  { year: 1990, value: 123.6, kind: 'actual' },
  { year: 2000, value: 126.9, kind: 'actual' },
  { year: 2010, value: 128.1, kind: 'actual' },
  { year: 2015, value: 127.1, kind: 'actual' },
  { year: 2020, value: 126.1, kind: 'actual' },
  { year: 2024, value: 124.0, kind: 'actual' },
  { year: 2030, value: 120.1, kind: 'projection' },
  { year: 2040, value: 112.8, kind: 'projection' },
  { year: 2050, value: 104.7, kind: 'projection' },
  { year: 2060, value: 95.1, kind: 'projection' },
  { year: 2070, value: 87.0, kind: 'projection' },
];
export const POPULATION_SOURCE = 'Statistics Bureau of Japan (actual, to 2024); National Institute of Population and Social Security Research, medium variant (projections to 2070).';

// Age structure, 2024, millions of people.
export const AGE_GROUPS = [
  { group: '0–14', value: 14.1 },
  { group: '15–24', value: 11.2 },
  { group: '25–39', value: 20.9 },
  { group: '40–64', value: 41.4 },
  { group: '65–74', value: 15.6 },
  { group: '75+', value: 20.7 },
];
export const AGE_SOURCE = 'Statistics Bureau of Japan, population estimates, 1 October 2024.';

// Nominal GDP, IMF World Economic Outlook, US$ trillion; per-person in US$.
export const GDP_SERIES = [
  { year: 2000, nominal: 4.97, perPerson: 39160 },
  { year: 2005, nominal: 4.85, perPerson: 37900 },
  { year: 2010, nominal: 5.76, perPerson: 44970 },
  { year: 2015, nominal: 4.44, perPerson: 34930 },
  { year: 2020, nominal: 5.06, perPerson: 40130 },
  { year: 2021, nominal: 5.03, perPerson: 39900 },
  { year: 2022, nominal: 4.26, perPerson: 33980 },
  { year: 2023, nominal: 4.21, perPerson: 33780 },
  { year: 2024, nominal: 4.03, perPerson: 32500 },
];
export const GDP_SOURCE = 'International Monetary Fund, World Economic Outlook (October 2025).';

// Unemployment and inflation, annual averages, percent.
export const LABOUR_PRICE_SERIES = [
  { year: 2015, unemployment: 3.4, inflation: 0.8 },
  { year: 2018, unemployment: 2.4, inflation: 1.0 },
  { year: 2020, unemployment: 2.8, inflation: 0.0 },
  { year: 2021, unemployment: 2.8, inflation: -0.2 },
  { year: 2022, unemployment: 2.6, inflation: 2.5 },
  { year: 2023, unemployment: 2.6, inflation: 3.3 },
  { year: 2024, unemployment: 2.5, inflation: 2.7 },
];
export const LABOUR_PRICE_SOURCE = 'Statistics Bureau of Japan: Labour Force Survey and Consumer Price Index.';

// Electricity mix, fiscal 2023, percent of generation.
export const POWER_MIX = [
  { source: 'Coal', value: 28.9 },
  { source: 'Gas (LNG)', value: 27.3 },
  { source: 'Oil', value: 3.3 },
  { source: 'Nuclear', value: 8.5 },
  { source: 'Hydro', value: 7.6 },
  { source: 'Solar', value: 10.1 },
  { source: 'Wind, biomass and other', value: 14.3 },
];
export const POWER_SOURCE = 'Ministry of Economy, Trade and Industry, fiscal 2023. Shares sum to 100% with rounding.';

// The ten largest prefectures by population, 2024 estimates.
export const PREFECTURES = [
  { name: 'Tokyo', capital: 'Shinjuku', population: 14.18, area: 2194, density: 6462 },
  { name: 'Kanagawa', capital: 'Yokohama', population: 9.24, area: 2416, density: 3824 },
  { name: 'Osaka', capital: 'Osaka', population: 8.77, area: 1905, density: 4604 },
  { name: 'Aichi', capital: 'Nagoya', population: 7.47, area: 5173, density: 1444 },
  { name: 'Saitama', capital: 'Saitama', population: 7.34, area: 3798, density: 1933 },
  { name: 'Chiba', capital: 'Chiba', population: 6.28, area: 5157, density: 1218 },
  { name: 'Hyogo', capital: 'Kobe', population: 5.37, area: 8400, density: 639 },
  { name: 'Fukuoka', capital: 'Fukuoka', population: 5.11, area: 4987, density: 1025 },
  { name: 'Hokkaido', capital: 'Sapporo', population: 5.09, area: 83424, density: 61 },
  { name: 'Shizuoka', capital: 'Shizuoka', population: 3.52, area: 7777, density: 453 },
];
export const PREFECTURE_SOURCE = 'Statistics Bureau of Japan, population estimates, 1 October 2024. Density is people per km².';

// Latest releases, newest first. Each one is a real publication, dated by
// when it came out, and the figure it reported.
export const RELEASES = [
  { date: 'Jun 2025', title: 'Vital statistics, 2024 final', body: 'The Ministry of Health, Labour and Welfare confirmed 720,988 births and a fertility rate of 1.15 — both the lowest on record.', section: 'population' },
  { date: 'Mar 2025', title: 'National accounts, 2024 second estimate', body: 'The Cabinet Office put real GDP growth for calendar 2024 at −0.1%.', section: 'economy' },
  { date: 'Jan 2025', title: 'Labour Force Survey, 2024 annual average', body: 'The Statistics Bureau reported unemployment at 2.5% and 67.9 million people in work.', section: 'labour' },
  { date: 'Jan 2025', title: 'Visitor arrivals, 2024', body: 'The Japan National Tourism Organization counted 36.9 million visitors — a record year.', section: 'economy' },
  { date: 'Dec 2023', title: 'PISA 2022 results', body: 'The OECD reported Japanese 15-year-olds at 536 in maths, 516 in reading and 547 in science.', section: 'education' },
];
